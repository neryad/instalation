import { rollMentalEvent } from "./events";
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";
import { distortText } from "./sanity";

export function move(state: PlayerState, dir: Direction): PlayerState {
  const room = rooms[state.currentRoom];
  const next = room.connections[dir];

  if (!next) return state;

  const nextRoom = rooms[next];

  // Sala ilusoria
  if (nextRoom.minSanityToExist && state.sanity > nextRoom.minSanityToExist) {
    return state; // No existe para una mente sana
  }

  let newState = { ...state, currentRoom: next };

  const event = rollMentalEvent();

  if (event) {
    newState = {
      ...newState,
      sanity: Math.max(0, Math.min(100, newState.sanity + event.sanityChange)),
      lastEvent: event.text,
    };
  }

  return newState;
}

export function getRoomDescription(state: PlayerState): string {
  const room = rooms[state.currentRoom];
  let description = room.baseDescription;

  if (state.sanity <= 60 && state.sanity > 30) {
    description += " Sientes que algo está mal, pero no sabes qué.";
  } else if (state.sanity <= 30 && state.sanity > 10) {
    description = "Las paredes se deforman. La voz repite tu nombre.";
  } else if (state.sanity <= 10) {
    description =
      "La realidad se fragmenta. Ya no sabes si esta habitación existe.";
  }

  return distortText(description, state.sanity);
}
