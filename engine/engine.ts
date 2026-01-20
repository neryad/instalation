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
  if (nextRoom.minSanityToExist && state.sanity > nextRoom.minSanityToExist) {
    return state;
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
  const event = rollMentalEvent();
  if (event) {
    newState = {
      ...newState,
      sanity: Math.max(0, Math.min(100, newState.sanity + event.sanityChange)),
      lastEvent: event.text,
    };
  }

  // 11. Movimiento de la Entidad
  newState = moveEntity(newState);

  // 11. FINALES
  if (newState.currentRoom === "core") {
    // Final malo
    if (newState.sanity <= 20) {
      return {
        ...newState,
        sanity: 0,
        gameOver: true,
        endingType: "bad",
        lastEvent:
          "La IA deja de observar. Ahora escucha. La presencia ya no está detrás de ti. Está dentro. 'Proceso completado. Sujeto integrado.'",
      };
    }

    // Final “bueno” (escape falso)
    if (newState.sanity > 20 && newState.entityAwareness < 50) {
      return {
        ...newState,
        gameOver: true,
        endingType: "good",
        lastEvent:
          "La IA duda. Las luces parpadean. Corres. Sientes aire frío. Estás fuera... pero sigues escuchando pasos detrás de ti.",
      };
    }
  }

  // 12. Encuentro indirecto
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
