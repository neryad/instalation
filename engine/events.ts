import { PlayerState } from "./player";

export function aiWhisper(state: PlayerState): {
  text: string;
  sanityEffect: number;
} {
  return {
    text: 'La voz dice: "Confía en mí... esta es la única salida". Pero su tono suena distorsionado.',
    sanityEffect: -10,
  };
}
