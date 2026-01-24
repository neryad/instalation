// entity.ts
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";

// ESTA ES LA FUNCIÓN QUE EXPORTAS
export function moveEntity(state: PlayerState): PlayerState {
  let awareness = state.entityAwareness;
  const predicted = predictNextDirection(state.lastDirections);

  // 1. PRIORIDAD ALTA: EL GASLIGHTING (Si hay predicción y cordura media/baja)
  // En lugar de aparecer donde estás, la IA te bloquea psicológicamente.
  if (predicted && state.sanity < 50 && Math.random() > 0.5) {
    return {
      ...state,
      // La IA no se mueve físicamente a tu sala, sino que "hackea" tu interfaz
      entityAwareness: awareness + 20,
      lastEvent: `IA: "He analizado tus patrones, Sujeto 00. No hay nada para ti al ${predicted.toUpperCase()}."`,
    };
  }

  // 2. EMBOSCADA: La IA se adelanta a tu siguiente paso (Mecánica de movimiento real)
  if (predicted && state.sanity < 45) {
    const target = rooms[state.currentRoom].connections[predicted];
    if (target) {
      return {
        ...state,
        entityRoom: target, // La IA viaja a la sala a la que vas
        entityAwareness: awareness + 15,
        lastEvent:
          "Un zumbido eléctrico recorre el aire. Algo sabe a dónde vas...",
      };
    }
  }

  // 3. CONFRONTACIÓN: Si la IA ya está en tu sala actual
  if (state.entityRoom === state.currentRoom) {
    return {
      ...state,
      entityAwareness: awareness + 15,
      lastEvent:
        "Las luces parpadean violentamente. Una voz distorsionada susurra desde los altavoces: 'ESTÁS CERCA'.",
    };
  }

  // 4. ACECHO SILENCIOSO: Si el jugador mantiene la calma (Cordura alta)
  if (state.sanity > 65) {
    return {
      ...state,
      entityRoom: "void", // La IA se retira a las sombras
      entityAwareness: Math.max(0, awareness - 5),
    };
  }

  // 5. PERSECUCIÓN ACTIVA (Cordura baja)
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
      entityAwareness: awareness + 10,
      // Elegimos un mensaje al azar para que no se repita siempre el mismo
      lastEvent:
        stalkingMessages[Math.floor(Math.random() * stalkingMessages.length)],
    };
  }

  // 6. INCREMENTO PASIVO (Estado base)
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
