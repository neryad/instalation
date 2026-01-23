import { PlayerState } from "./player";

export function distortText(text: string, sanity: number): string {
  // Capa 1: Cordura Normal (Sin cambios)
  if (sanity > 60) return text;

  // Capa 2: Cordura Media (Distorsión Visual)
  // Reemplaza letras por números (leet speak) para simular esfuerzo visual.
  if (sanity > 35) {
    return text
      .replace(/e/g, "3")
      .replace(/a/g, "4")
      .replace(/o/g, "0")
      .replace(/i/g, "1");
  }

  // Capa 3: Cordura Baja (Fragmentación Cognitiva)
  // El texto se rompe con elipsis, simulando lagunas mentales.
  if (sanity > 15) {
    const words = text.split(" ");
    const glitched = words
      .map((w) => (Math.random() > 0.8 ? "..." : w))
      .join(" ");
    return `${glitched}. Sientes que las sombras se alargan hacia ti.`;
  }

  // Capa 4: Cordura Crítica (Mentiras Activas)
  // La IA inyecta mensajes falsos mezclados con la realidad.

  // En sanity.ts, dentro de la fase de Cordura Crítica
  if (sanity <= 15) {
    const stutter = text
      .split(" ")
      .map((word) =>
        word.length > 3 && Math.random() > 0.8
          ? `${word[0]}-${word[0]}-${word}`
          : word,
      )
      .join(" ");
    return `[SISTEMA INSTABLE]: ${stutter}... ¿Escuchas eso? *Click... Click...*`;
  }
  const lies = [
    "La IA te susurra que la salida está detrás de ti.",
    "No confíes en lo que ves.",
    "¿Seguro que esta habitación es real?",
    "Escuchas tu propio nombre desde el pasillo.",
  ];
  const randomLie = lies[Math.floor(Math.random() * lies.length)];

  // Retornamos la mitad del texto original (para mantener algo de pista)
  // seguido de una mentira de la IA.
  return `[ERROR DE PERCEPCIÓN]: ${text.substring(0, text.length / 2)}... ${randomLie}`;
}

export function applySanity(state: PlayerState, amount: number): PlayerState {
  return {
    ...state,
    sanity: Math.max(0, Math.min(100, state.sanity + amount)),
  };
}
