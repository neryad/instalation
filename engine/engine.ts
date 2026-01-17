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
  // if (!room.sanityVariants) return room.baseDescription;

  // const variant = room.sanityVariants.find((v) => state.sanity <= v.minSanity);
  // return variant ? variant.description : room.baseDescription;

  if (state.sanity < 40) {
    return (
      room.baseDescription +
      " Las paredes parecen latir como si tuvieran pulso."
    );
  }

  if (state.sanity < 20) {
    return "La habitación ya no se parece a nada reconocible. Estás seguro de que alguien te observa.";
  }

  return room.baseDescription;
}

export function applySanity(state: PlayerState, amount: number): PlayerState {
  return {
    ...state,
    sanity: Math.max(0, Math.min(100, state.sanity + amount)),
  };
}
