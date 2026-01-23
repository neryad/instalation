import { PlayerState } from "./player";
import { rooms } from "./rooms";

export interface MentalEvent {
  id: string;
  text: (state: PlayerState) => string; // Ahora es una función para ser dinámico
  sanityChange: number;
  probability: (state: PlayerState) => number; // Probabilidad variable
}

export const mentalEvents: MentalEvent[] = [
  {
    id: "whisper_echo",
    text: (state) =>
      `Escuchas un eco de tus propios pasos hacia el ${state.lastDirections[state.lastDirections.length - 1] || "vacío"}.`,
    sanityChange: -5,
    probability: (state) => (state.sanity < 50 ? 0.4 : 0.1),
  },
  {
    id: "ai_direct_threat",
    text: (state) =>
      `La IA proyecta tu nombre en las paredes: "No puedes escapar de ti mismo, ${state.inventory.length > 0 ? "aunque lleves esa " + state.inventory[0] : "sujeto 00"}"`,
    sanityChange: -10,
    probability: (state) => (state.sanity < 30 ? 0.3 : 0.05),
  },
  {
    id: "room_memory",
    text: (state) => {
      const room = rooms[state.currentRoom];
      return `Las paredes de ${room.id} parecen recordarte algo que aún no ha sucedido.`;
    },
    sanityChange: -4,
    probability: (state) => 0.2,
  },
  // En events.ts añade este nuevo evento:
  {
    id: "item_hallucination",
    text: (state) => {
      const item = state.inventory[0];
      return `Miras la ${item} en tu mano. Por un segundo, parece un ojo abierto parpadeando hacia ti.`;
    },
    sanityChange: -7,
    probability: (state) =>
      state.inventory.length > 0 && state.sanity < 30 ? 0.5 : 0,
  },

  {
    id: "item_corruption",
    text: (state) => {
      const item = state.inventory[0] || "tus manos";
      return `Miras fijamente la ${item}. Por un instante, parece estar hecha de píxeles que se desvanecen.`;
    },
    sanityChange: -5,
    probability: (state) =>
      state.sanity < 25 && state.inventory.length > 0 ? 0.4 : 0,
  },
];

export function rollMentalEvent(state: PlayerState): MentalEvent | null {
  // Ordenamos para que los eventos más raros/graves se evalúen primero
  for (const e of mentalEvents) {
    if (Math.random() < e.probability(state)) return e;
  }
  return null;
}
