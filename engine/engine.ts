import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";

export function move(state: PlayerState, dir: Direction): PlayerState {
  const room = rooms[state.currentRoom];
  const next = room.connections[dir];

  if (!next) return state;

  return { ...state, currentRoom: next };
}
export function getRoomDescription(state: PlayerState): string {
  const room = rooms[state.currentRoom];

  if (state.sanity > 60) {
    return room.baseDescription;
  }

  if (state.sanity > 30) {
    return (
      room.baseDescription + " Sientes que algo está mal, pero no sabes qué."
    );
  }

  if (state.sanity > 10) {
    return "Las paredes se deforman. La voz repite tu nombre aunque no recuerdas haberlo dicho.";
  }

  return "La realidad se fragmenta. Ya no sabes si esta habitación existe.";
}

export function applySanity(state: PlayerState, amount: number): PlayerState {
  return {
    ...state,
    sanity: Math.max(0, Math.min(100, state.sanity + amount)),
  };
}
