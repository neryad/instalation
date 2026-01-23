// entity.ts
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";

// ESTA ES LA FUNCIÓN QUE EXPORTAS
export function moveEntity(state: PlayerState): PlayerState {
  let awareness = state.entityAwareness;

  // 1. LLAMADA CRÍTICA A LA PREDICCIÓN
  const predicted = predictNextDirection(state.lastDirections);

  // 2. Lógica de "Acecho Silencioso"
  if (state.sanity > 60) {
    return { ...state, entityAwareness: Math.max(0, awareness - 2) };
  }

  // 3. SI HAY PREDICCIÓN: La IA hace la emboscada
  if (predicted && state.sanity < 45) {
    const target = rooms[state.currentRoom].connections[predicted];
    if (target) {
      return {
        ...state,
        entityRoom: target, // Se mueve a donde tú vas a ir
        entityAwareness: awareness + 15,
        lastEvent:
          "Un zumbido eléctrico recorre el aire. Algo sabe a dónde vas.",
      };
    }
  }

  // 4. Persecución normal (Baja cordura)
  if (state.sanity < 30) {
    return {
      ...state,
      entityRoom: state.currentRoom,
      entityAwareness: awareness + 10,
    };
  }

  return { ...state, entityAwareness: awareness + 5 };
}

// LA FUNCIÓN DE APOYO (Interna)
function predictNextDirection(history: Direction[]): Direction | null {
  if (history.length < 3) return null;

  const last = history[history.length - 1];
  const prev = history[history.length - 2];
  const antePrev = history[history.length - 3];

  // Patrón Ida y Vuelta (A-B-A)
  if (last === antePrev && last !== prev) return prev;

  // Patrón Repetitivo (A-A-A)
  if (last === prev && prev === antePrev) return last;

  return null;
}
