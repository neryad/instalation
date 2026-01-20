import { moveEntity } from "./entity";
import { rollMentalEvent } from "./events";
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { distortText } from "./sanity";

export function move(state: PlayerState, dir: Direction): PlayerState {
  const room = rooms[state.currentRoom];

  // 1. Partimos de las conexiones base
  let connections = room.connections;

  // 2. Aplicamos distorsiones por cordura
  if (room.unstableConnections) {
    for (const variant of room.unstableConnections) {
      if (state.sanity <= variant.maxSanity) {
        connections = { ...connections, ...variant.connections };
      }
    }
  }

  // 3. Ahora sí leemos la dirección real
  const next = connections[dir];
  if (!next) return state;

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
