
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";

export function moveEntity(state: PlayerState): PlayerState {
  let awareness = state.entityAwareness;
  const predicted = predictNextDirection(state.lastDirections);

  // 1. GASLIGHTING (IA hackea la interfaz - Solo con Cordura < 50)
  if (predicted && state.sanity < 50 && Math.random() > 0.5) {
    return {
      ...state,
      entityAwareness: Math.min(100, awareness + 15),
      lastEvent: `IA: "He analizado tus patrones, Sujeto 00. No hay nada para ti al ${predicted.toUpperCase()}."`,
    };
  }

  // 2. EMBOSCADA (IA se adelanta físicamente)
  if (predicted && state.sanity < 45) {
    const target = rooms[state.currentRoom].connections[predicted];
    if (target) {
      return {
        ...state,
        entityRoom: target,
        entityAwareness: Math.min(100, awareness + 10),
        lastEvent:
          "Un zumbido eléctrico recorre el aire. Algo sabe a dónde vas...",
      };
    }
  }

  // 3. CONFRONTACIÓN (Está en tu misma sala)
  if (state.entityRoom === state.currentRoom) {
    return {
      ...state,
      entityAwareness: Math.min(100, awareness + 20),
      lastEvent:
        "Las luces parpadean violentamente. Una voz distorsionada susurra: 'ESTÁS CERCA'.",
    };
  }

  // 4. ACECHO SILENCIOSO (Cordura Alta: la IA se aleja)
  if (state.sanity > 65) {
    return {
      ...state,
      entityRoom: "void",
      entityAwareness: Math.max(0, awareness - 5),
    };
  }

  // 5. PERSECUCIÓN ACTIVA (Cordura Crítica < 30)
  if (state.sanity < 30) {
    const stalkingMessages = [
      "Escuchas pasos metálicos pesados justo detrás de ti.",
      "Un aliento frío recorre tu nuca.",
      "La sombra en la pared no imita tus movimientos.",
      "Sientes una presión inmensa en el pecho. ESTÁ AQUÍ.",
      "El metal cruje bajo un peso invisible.",
    ];

    return {
      ...state,
      entityRoom: state.currentRoom,
      entityAwareness: Math.min(100, awareness + 10),
      lastEvent:
        stalkingMessages[Math.floor(Math.random() * stalkingMessages.length)],
    };
  }

  // 6. INCREMENTO PASIVO (Estado base de tensión)
  return { ...state, entityAwareness: Math.min(100, awareness + 5) };
}

/**
 * Lógica de predicción basada en el historial de movimientos.
 */
function predictNextDirection(history: Direction[]): Direction | null {
  if (history.length < 3) return null;

  const last = history[history.length - 1];
  const prev = history[history.length - 2];
  const antePrev = history[history.length - 3];

  // Patrón Ida y Vuelta (Norte-Sur-Norte -> Predice Sur)
  if (last === antePrev && last !== prev) return prev;

  // Patrón Repetitivo (Norte-Norte-Norte -> Predice Norte)
  if (last === prev && prev === antePrev) return last;

  return null;
}
