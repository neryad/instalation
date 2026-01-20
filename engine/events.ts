// import { PlayerState } from "./player";
// import { applySanity } from "./sanity";

// export interface MentalEvent {
//   id: string;
//   text: string;
//   sanityChange: number;
//   probability: number; // 0 a 1
// }

// export function aiWhisper(state: PlayerState) {
//   return {
//     text: 'La IA susurra: "No mires atrás... ya es demasiado tarde."',
//     newState: applySanity(state, -15),
//   };
// }

// export const mentalEvents: MentalEvent[] = [
//   {
//     id: "whisper",
//     text: "Escuchas un susurro detrás de ti, pero estás solo.",
//     sanityChange: -5,
//     probability: 0.3,
//   },
//   {
//     id: "shadow",
//     text: "Una sombra cruza el pasillo, aunque no hay nada que proyecte sombra.",
//     sanityChange: -8,
//     probability: 0.2,
//   },
//   {
//     id: "memory",
//     text: "Recuerdas una habitación que nunca visitaste.",
//     sanityChange: -4,
//     probability: 0.4,
//   },
// ];
// export function rollMentalEvent(): MentalEvent | null {
//   for (const e of mentalEvents) {
//     if (Math.random() < e.probability) return e;
//   }
//   return null;
// }
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
];

export function rollMentalEvent(state: PlayerState): MentalEvent | null {
  // Ordenamos para que los eventos más raros/graves se evalúen primero
  for (const e of mentalEvents) {
    if (Math.random() < e.probability(state)) return e;
  }
  return null;
}
