import { PlayerState } from "./player";

export function moveEntity(state: PlayerState): PlayerState {
  if (state.sanity > 40) return state;

  let awareness = state.entityAwareness + 10;
  const predicted = predictNextDirection(state.lastDirections);

  // Te espera
  if (predicted && state.sanity < 25) {
    const room = rooms[state.currentRoom];
    const target = room.connections[predicted];

    if (target) {
      return {
        ...state,
        entityRoom: target,
        entityAwareness: awareness,
        lastEvent: "Algo se adelantó a ti. Te estaba esperando.",
      };
    }
  }

  // Te sigue normalmente
  if (state.entityRoom && state.sanity < 30) {
    return {
      ...state,
      entityRoom: state.currentRoom,
      entityAwareness: awareness,
      lastEvent: "Escuchas pasos que imitan los tuyos.",
    };
  }

  return {
    ...state,
    entityAwareness: awareness,
  };
}

import { Direction, rooms } from "./rooms";

function predictNextDirection(history: Direction[]): Direction | null {
  if (history.length < 3) return null;

  const last = history[history.length - 1];
  const prev = history[history.length - 2];
  const prev2 = history[history.length - 3];

  // Patrón simple: A-B-A
  if (prev2 === last && prev !== last) {
    return prev; // es probable que vuelvas al medio
  }

  return null;
}
