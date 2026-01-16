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
  if (!room.sanityVariants) return room.baseDescription;

  const variant = room.sanityVariants.find((v) => state.sanity <= v.minSanity);
  return variant ? variant.description : room.baseDescription;
}
