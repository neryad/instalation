import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { tSync } from "./i18n";

export function moveEntity(state: PlayerState, lang: "es" | "en" = "es"): PlayerState {
  let awareness = state.entityAwareness;
  const predicted = predictNextDirection(state.lastDirections);

  // 1. GASLIGHTING (IA hackea la interfaz - Solo con Cordura < 50)
  if (predicted && state.sanity < 50 && Math.random() > 0.5) {
    return {
      ...state,
      entityAwareness: Math.min(100, awareness + 15),
      lastEvent: tSync(lang, "entity.gaslight", { dir: predicted.toUpperCase() }),
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
        lastEvent: tSync(lang, "entity.ambush"),
      };
    }
  }

  // 3. CONFRONTACIÓN (Está en tu misma sala)
  if (state.entityRoom === state.currentRoom) {
    return {
      ...state,
      entityAwareness: Math.min(100, awareness + 20),
      lastEvent: tSync(lang, "entity.confrontation"),
    };
  }

  // 4. ACECHO SILENCIOSO (Cordura Alta: la IA se aleja)
  if (state.sanity > 65) {
    return {
      ...state,
      entityRoom: undefined,
      entityAwareness: Math.max(0, awareness - 5),
    };
  }

  // 5. PERSECUCIÓN ACTIVA (Cordura Crítica < 30)
  if (state.sanity < 30) {
    const stalkingKeys = [
      "entity.stalking_1", "entity.stalking_2", "entity.stalking_3",
      "entity.stalking_4", "entity.stalking_5",
    ];

    return {
      ...state,
      entityRoom: state.currentRoom,
      entityAwareness: Math.min(100, awareness + 10),
      lastEvent: tSync(lang, stalkingKeys[Math.floor(Math.random() * stalkingKeys.length)]),
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

  // Patrón Circular (Norte-Este-Sur -> Predice Oeste)
  const opposites: Record<Direction, Direction> = {
    norte: "sur", sur: "norte", este: "oeste", oeste: "este",
  };
  if (history.length >= 4) {
    const anteAntePrev = history[history.length - 4];
    if (last === opposites[antePrev] && prev === opposites[anteAntePrev]) {
      return opposites[last];
    }
  }

  return null;
}
