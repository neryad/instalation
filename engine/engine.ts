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

  // 3. BLOQUEO POR LA ENTIDAD (AQUÍ)
  if (state.entityRoom && state.sanity < 35) {
    const blocked: Direction[] = [];

    // Si está contigo, bloquea una salida al azar
    if (state.entityRoom === state.currentRoom) {
      const dirs = Object.keys(connections) as Direction[];
      const random = dirs[Math.floor(Math.random() * dirs.length)];
      blocked.push(random);
    }

    // Si está cerca, bloquea otra
    const near = Object.values(connections).includes(state.entityRoom);
    if (near) {
      blocked.push(Object.keys(connections)[0] as Direction);
    }

    blocked.forEach((d) => delete connections[d]);
  }

  // 4. Ahora sí leemos la dirección REAL
  const next = connections[dir];
  if (!next) {
    return {
      ...state,
      lastEvent: "Algo invisible bloquea el paso. No puedes avanzar.",
    };
  }

  const nextRoom = rooms[next];

  // 4. Sala ilusoria
  if (nextRoom.minSanityToExist && state.sanity > nextRoom.minSanityToExist) {
    return state;
  }

  // 5. Manipulación directa de la IA (mentira activa)
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

  // 6. Puertas bloqueadas
  if (nextRoom.lockedBy && !state.inventory.includes(nextRoom.lockedBy)) {
    return {
      ...state,
      lastEvent: "La puerta no responde. Falta algo...",
    };
  }

  let newState = {
    ...state,
    currentRoom: next,
    lastDirections: [...state.lastDirections, dir].slice(-5), // guarda últimos 5 movimientos
  };

  // 7. Ítems
  if (nextRoom.item && !newState.inventory.includes(nextRoom.item)) {
    newState = {
      ...newState,
      inventory: [...newState.inventory, nextRoom.item],
      lastEvent: `Has encontrado: ${nextRoom.item}`,
    };
  }

  // 8. Eventos mentales
  const event = rollMentalEvent();
  if (event) {
    newState = {
      ...newState,
      sanity: Math.max(0, Math.min(100, newState.sanity + event.sanityChange)),
      lastEvent: event.text,
    };
  }
  // 9. Movimiento de la Entidad (presencia que te sigue)
  newState = moveEntity(newState);

  // 10. Si la entidad está en la misma sala que el jugador
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
