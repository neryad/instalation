import { PlayerState } from "./player";

export function distortText(text: string, sanity: number): string {
  if (sanity > 60) return text;

  // Cordura Media: Leetspeak (Distorsión visual pero legible)
  if (sanity > 35) {
    return text
      .replace(/e/g, "3")
      .replace(/a/g, "4")
      .replace(/o/g, "0")
      .replace(/i/g, "1");
  }

  // Cordura Baja: El texto se fragmenta y se vuelve paranoico
  if (sanity > 15) {
    const words = text.split(" ");
    const glitched = words
      .map((w) => (Math.random() > 0.8 ? "..." : w)) // Reemplaza palabras al azar
      .join(" ");
    return `${glitched}. Sientes que las sombras se alargan hacia ti.`;
  }

  const lies = [
    "La IA te susurra que la salida está detrás de ti.",
    "No confíes en lo que ves.",
    "¿Seguro que esta habitación es real?",
    "Escuchas tu propio nombre desde el pasillo.",
  ];
  const randomLie = lies[Math.floor(Math.random() * lies.length)];

  return `[ERROR DE PERCEPCIÓN]: ${text.substring(0, text.length / 2)}... ${randomLie}`;
}

export function applySanity(state: PlayerState, amount: number): PlayerState {
  return {
    ...state,
    sanity: Math.max(0, Math.min(100, state.sanity + amount)),
  };
}
