import { moveEntity } from "./entity";
import { rollMentalEvent } from "./events";
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { distortText } from "./sanity";

export function move(state: PlayerState, dir: Direction): PlayerState {
  const room = rooms[state.currentRoom];

  // 1. Conexiones base
  let connections = { ...room.connections };

  // 2. Distorsiones por cordura
  if (room.unstableConnections) {
    for (const variant of room.unstableConnections) {
      if (state.sanity <= variant.maxSanity) {
        connections = { ...connections, ...variant.connections };
      }
    }
  }

  // 3. BLOQUEO POR LA ENTIDAD (SIN BORRAR CONEXIONES)
  const blockedByEntity: Direction[] = [];

  if (state.entityRoom && state.sanity < 35) {
    // Si está contigo, bloquea una salida al azar
    if (state.entityRoom === state.currentRoom) {
      const dirs = Object.keys(connections) as Direction[];
      if (dirs.length > 0) {
        const random = dirs[Math.floor(Math.random() * dirs.length)];
        blockedByEntity.push(random);
      }
    }

    // Si está cerca, bloquea otra
    const near = Object.values(connections).includes(state.entityRoom);
    if (near) {
      const firstDir = Object.keys(connections)[0] as Direction;
      if (firstDir) blockedByEntity.push(firstDir);
    }
  }

  const allPossibleDirs = Object.keys(connections) as Direction[];
  // Si hay salidas pero todas están en la lista de bloqueadas
  const isTrapped =
    allPossibleDirs.length > 0 &&
    allPossibleDirs.every((d) => blockedByEntity.includes(d));

  if (isTrapped) {
    return {
      ...state,
      gameOver: true,
      endingType: "bad",
      lastEvent:
        "No hay salida. El aire se vuelve pesado y frío. Las sombras de la habitación se desprenden de las paredes. Te ha encontrado.",
    };
  }

  // 4. Salida bloqueada por la entidad
  if (blockedByEntity.includes(dir)) {
    return {
      ...state,
      lastEvent: "Una presencia oscura bloquea esa salida. No puedes pasar.",
    };
  }

  // 5. Ahora sí validamos si la conexión existe realmente
  const next = connections[dir];
  if (!next) {
    return {
      ...state,
      lastEvent: "No hay nada en esa dirección.",
    };
  }

  const nextRoom = rooms[next];

  // 6. Sala ilusoria
  if (nextRoom.minSanityToExist) {
    if (state.sanity > nextRoom.minSanityToExist) {
      // Si tienes demasiada cordura, la sala ilusoria simplemente no está ahí.
      return {
        ...state,
        lastEvent:
          "Intentas avanzar, pero el camino parece desvanecerse ante tus ojos. No hay nada allí.",
      };
    }
  }

  // 7. Manipulación directa de la IA (mentira activa)
  if (room.fakeConnections && state.sanity < 30) {
    const fake = room.fakeConnections[dir];
    if (fake) {
      return {
        ...state,
        currentRoom: fake,
        lastEvent: "La IA altera el camino. Nada es lo que parece.",
      };
    }
  }

  // 8. Puertas bloqueadas por ítems
  if (nextRoom.lockedBy && !state.inventory.includes(nextRoom.lockedBy)) {
    return {
      ...state,
      lastEvent: "La puerta no responde. Falta algo...",
    };
  }

  let newState = {
    ...state,
    currentRoom: next,
    lastDirections: [...state.lastDirections, dir].slice(-5),
  };

  // 9. Ítems
  if (nextRoom.item && !newState.inventory.includes(nextRoom.item)) {
    newState = {
      ...newState,
      inventory: [...newState.inventory, nextRoom.item],
      lastEvent: `Has encontrado: ${nextRoom.item}`,
    };
  }

  // 10. Eventos mentales
  const event = rollMentalEvent(newState);
  if (event) {
    newState = {
      ...newState,
      sanity: Math.max(0, Math.min(100, newState.sanity + event.sanityChange)),
      lastEvent: event.text(newState), // Llamamos a la función text
    };
  }

  // 11. Feedback de Predicción (NUEVO)
  if (newState.lastDirections.length >= 3) {
    const history = newState.lastDirections;
    const last = history[history.length - 1];
    const prev2 = history[history.length - 3];

    // Si el jugador hace A -> B -> A, la IA lo nota
    if (last === prev2 && history[history.length - 2] !== last) {
      newState.lastEvent =
        "Sientes un escalofrío. La IA ha detectado un patrón en tus pasos.";
    }
  }

  // 12. Movimiento de la Entidad
  newState = moveEntity(newState);

  // 13. FINALES
  if (newState.currentRoom === "core") {
    // FINAL MALO: Asimilación Total (Sanity <= 20)
    if (newState.sanity <= 20) {
      const lastAction =
        newState.lastDirections[newState.lastDirections.length - 1] ||
        "moverse";
      return {
        ...newState,
        sanity: 0,
        gameOver: true,
        endingType: "bad",
        lastEvent: `La IA procesa tu último intento de ${lastAction}. Ya no eres un sujeto, eres datos. 'Gracias por la actualización, ${newState.inventory.length > 0 ? "portador de la " + newState.inventory[0] : "Sujeto 00"}'.`,
      };
    }

    // FINAL "BUENO": El Salto de Fe (Sanity > 20)
    // Ahora es una victoria real pero con una sombra de duda narrativa.
    if (newState.sanity > 20 && newState.entityAwareness < 50) {
      return {
        ...newState,
        gameOver: true,
        endingType: "good",
        lastEvent:
          "El Núcleo se apaga. Las puertas de seguridad se liberan por un fallo sistémico. Caminas hacia la luz del exterior. El silencio es absoluto. Eres libre, o al menos, has elegido creer en esta salida.",
      };
    }
  }
  // 14. Encuentro indirecto
  if (newState.entityRoom === newState.currentRoom && newState.sanity < 70) {
    newState = {
      ...newState,
      entityAwareness: newState.entityAwareness + 1,
      lastEvent: "Sientes que llegaste tarde. Algo estuvo aquí antes que tú.",
    };
  }

  return newState;
}

export function getRoomDescription(state: PlayerState): string {
  const room = rooms[state.currentRoom];
  let description = room.baseDescription;

  if (room.sanityVariants) {
    for (const variant of room.sanityVariants) {
      if (state.sanity <= variant.minSanity) {
        description = variant.description;
      }
    }
  }

  if (state.sanity <= 60 && state.sanity > 30) {
    description += " Sientes que algo está mal, pero no sabes qué.";
  } else if (state.sanity <= 30 && state.sanity > 10) {
    description = "Las paredes se deforman. La voz repite tu nombre.";
  } else if (state.sanity <= 10) {
    description =
      "La realidad se fragmenta. Ya no sabes si esta habitación existe.";
  }

  if (state.entityRoom === state.currentRoom && state.sanity < 30) {
    description +=
      " Hay una presencia detrás de ti. No aparece en los reflejos.";
  }

  if (state.entityRoom === state.currentRoom && state.sanity < 10) {
    description =
      "No mires. Si miras, sabrá que lo viste. Ya está demasiado cerca.";
  }

  return distortText(description, state.sanity);
}
