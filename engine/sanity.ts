import { PlayerState } from "./player";

export function distortText(text: string, sanity: number): string {
  if (sanity > 60) return text;

  if (sanity > 35) {
    return text.replace(/e/g, "3").replace(/a/g, "4").replace(/o/g, "0");
  }

  if (sanity <= 15) {
    const stutter = text
      .split(" ")
      .map((w) =>
        w.length > 3 && Math.random() > 0.8 ? `${w[0]}-${w[0]}-${w}` : w,
      )
      .join(" ");
    return `[SISTEMA INESTABLE]: ${stutter}... *Click... Click...*`;
  }

  // const lies = [
  //   "La IA te susurra que la salida está detrás de ti.",
  //   "No confíes en lo que ves.",
  //   "¿Seguro que esta habitación es real?",
  //   "Escuchas tu propio nombre desde el pasillo.",
  // ];
  // const randomLie = lies[Math.floor(Math.random() * lies.length)];

  // // Retornamos la mitad del texto original (para mantener algo de pista)
  // // seguido de una mentira de la IA.
  // return `[ERROR DE PERCEPCIÓN]: ${text.substring(0, text.length / 2)}... ${randomLie}`;

  return `${text.substring(0, text.length / 2)}... ¿Seguro que esto es real?`;
}

export function applySanity(state: PlayerState, amount: number): PlayerState {
  return {
    ...state,
    sanity: Math.max(0, Math.min(100, state.sanity + amount)),
  };
}
