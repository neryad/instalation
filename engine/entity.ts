import { PlayerState } from "./player";

export function moveEntity(state: PlayerState): PlayerState {
  let awareness = state.entityAwareness + 10;
  const predicted = predictNextDirection(state.lastDirections);

  // 1. Lógica de "Acecho Silencioso" (Cordura Alta > 60)
  if (state.sanity > 60) {
    return {
      ...state,
      entityAwareness: Math.max(0, awareness - 2), // Te pierde el rastro si estás calmado
    };
  }

  // 2. Lógica de "Predicción" (La IA se adelanta)
  // Si eres predecible, ella te espera en la siguiente sala.
  if (predicted && state.sanity < 40) {
    const room = rooms[state.currentRoom];
    const target = room.connections[predicted];

    if (target) {
      return {
        ...state,
        entityRoom: target,
        entityAwareness: awareness + 15,
        lastEvent:
          "Un zumbido eléctrico recorre el aire. Algo sabe a dónde vas.",
      };
    }
  }

  // 3. Lógica de "Persecución" (Cordura Baja < 30)
  // La entidad se mueve a tu misma sala.
  if (state.sanity < 30) {
    return {
      ...state,
      entityRoom: state.currentRoom,
      entityAwareness: awareness + 10,
      lastEvent: "Escuchas pasos metálicos que imitan perfectamente tu ritmo.",
    };
  }

  return {
    ...state,
    entityAwareness: awareness + 5,
  };
}

import { Direction, rooms } from "./rooms";

function predictNextDirection(history: Direction[]): Direction | null {
  if (history.length < 3) return null;
  const last = history[history.length - 1];
  const prev = history[history.length - 2];
  const antePrev = history[history.length - 3];

  // Patrón de ida y vuelta (A-B-A)
  if (last === antePrev && last !== prev) return prev;

  // Patrón de repetición (A-A-A)
  if (last === prev && prev === antePrev) return last;

  return null;
}
