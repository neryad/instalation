import { applySanity } from "./engine";
import { PlayerState } from "./player";

export function aiWhisper(state: PlayerState) {
  return {
    text: 'La IA susurra: "No mires atrás... ya es demasiado tarde."',
    newState: applySanity(state, -15),
  };
}
