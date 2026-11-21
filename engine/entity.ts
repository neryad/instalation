import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { tSync } from "./i18n";

/**
 * Balance de IA por fases:
 * Fase 1 (0-30 awareness): La IA apenas se mueve. +2 por movimiento. Exploración libre.
 * Fase 2 (30-60 awareness): La IA empieza a seguir. +5 por movimiento. Gaslighting ocasional.
 * Fase 3 (60-85 awareness): La IA es agresiva. +10 por movimiento. Emboscadas frecuentes.
 * Fase 4 (85-100 awareness): Persecución activa. El jugador necesita usar sedante o llegar al core.
 */
export function moveEntity(state: PlayerState, lang: "es" | "en" = "es"): PlayerState {
  let awareness = state.entityAwareness;
  const predicted = predictNextDirection(state.lastDirections);

  // FASE 1 (0-30): Exploración libre, IA apenas activa
  if (awareness < 30) {
    // Incremento pasivo mínimo
    return { ...state, entityAwareness: Math.min(100, awareness + 2) };
  }

  // FASE 2 (30-60): IA empieza a seguir, gaslighting ocasional
  if (awareness < 60) {
    // Gaslighting leve (20% de probabilidad)
    if (predicted && state.sanity < 50 && Math.random() > 0.8) {
      return {
        ...state,
        entityAwareness: Math.min(100, awareness + 8),
        lastEvent: tSync(lang, "entity.gaslight", { dir: predicted.toUpperCase() }),
      };
    }
    // Incremento pasivo moderado
    return { ...state, entityAwareness: Math.min(100, awareness + 5) };
  }

  // FASE 3 (60-85): IA agresiva, emboscadas frecuentes
  if (awareness < 85) {
    // Gaslighting frecuente (50% de probabilidad)
    if (predicted && state.sanity < 50 && Math.random() > 0.5) {
      return {
        ...state,
        entityAwareness: Math.min(100, awareness + 15),
        lastEvent: tSync(lang, "entity.gaslight", { dir: predicted.toUpperCase() }),
      };
    }
    // Emboscada (30% de probabilidad)
    if (predicted && state.sanity < 45 && Math.random() > 0.7) {
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
    // Confrontación si está en la misma sala
    if (state.entityRoom === state.currentRoom) {
      return {
        ...state,
        entityAwareness: Math.min(100, awareness + 20),
        lastEvent: tSync(lang, "entity.confrontation"),
      };
    }
    // Acecho silencioso con cordura alta
    if (state.sanity > 65) {
      return {
        ...state,
        entityRoom: undefined,
        entityAwareness: Math.max(0, awareness - 5),
      };
    }
    // Incremento pasivo alto
    return { ...state, entityAwareness: Math.min(100, awareness + 10) };
  }

  // FASE 4 (85-100): Persecución activa, peligro extremo
  {
    // Persecución activa con cordura crítica
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
    // Confrontación forzada
    if (state.entityRoom === state.currentRoom) {
      return {
        ...state,
        entityAwareness: Math.min(100, awareness + 20),
        lastEvent: tSync(lang, "entity.confrontation"),
      };
    }
    // La IA se acerca agresivamente
    if (Math.random() > 0.4) {
      const directions: Direction[] = ["norte", "sur", "este", "oeste"];
      const room = rooms[state.currentRoom];
      for (const dir of directions) {
        const target = room.connections[dir];
        if (target) {
          return {
            ...state,
            entityRoom: target,
            entityAwareness: Math.min(100, awareness + 15),
            lastEvent: tSync(lang, "entity.ambush"),
          };
        }
      }
    }
    // Incremento pasivo máximo
    return { ...state, entityAwareness: Math.min(100, awareness + 15) };
  }
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
