import { PlayerState } from "./player";

export function moveEntity(state: PlayerState): PlayerState {
  // Con mente sana no existe
  if (state.sanity > 50) return state;

  let awareness = (state.entityAwareness ?? 0) + 10;

  // Primera manifestación
  if (!state.entityRoom && state.sanity < 40) {
    return {
      ...state,
      entityRoom: state.currentRoom,
      entityAwareness: awareness,
      lastEvent: "Sientes que algo está contigo. No sabes qué es.",
    };
  }

  // Te sigue
  if (state.entityRoom && state.sanity < 30) {
    return {
      ...state,
      entityRoom: state.currentRoom,
      entityAwareness: awareness,
      lastEvent: "Algo se mueve cuando tú te mueves. Ya no estás solo.",
    };
  }

  // Presencia directa
  if (state.entityRoom === state.currentRoom && state.sanity < 15) {
    return {
      ...state,
      entityAwareness: awareness,
      lastEvent: "Está justo detrás de ti. No te gires.",
    };
  }

  return {
    ...state,
    entityAwareness: awareness,
  };
}
