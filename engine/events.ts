import { PlayerState } from "./player";
import { applySanity } from "./sanity";

export interface MentalEvent {
  id: string;
  text: string;
  sanityChange: number;
  probability: number; // 0 a 1
}

export function aiWhisper(state: PlayerState) {
  return {
    text: 'La IA susurra: "No mires atrás... ya es demasiado tarde."',
    newState: applySanity(state, -15),
  };
}

export const mentalEvents: MentalEvent[] = [
  {
    id: "whisper",
    text: "Escuchas un susurro detrás de ti, pero estás solo.",
    sanityChange: -5,
    probability: 0.3,
  },
  {
    id: "shadow",
    text: "Una sombra cruza el pasillo, aunque no hay nada que proyecte sombra.",
    sanityChange: -8,
    probability: 0.2,
  },
  {
    id: "memory",
    text: "Recuerdas una habitación que nunca visitaste.",
    sanityChange: -4,
    probability: 0.4,
  },
];
export function rollMentalEvent(): MentalEvent | null {
  for (const e of mentalEvents) {
    if (Math.random() < e.probability) return e;
  }
  return null;
}
