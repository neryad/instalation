import { PlayerState } from "./player";

export function distortText(text: string, sanity: number): string {
  if (sanity > 60) return text;

  if (sanity > 35) {
    return text.replace(/e/g, "3").replace(/a/g, "4"); //
  }

  if (sanity > 15) {
    const glitchedText = text
      .split(" ")
      .map((w) => (Math.random() > 0.8 ? "???" : w))
      .join(" ");
    return `${glitchedText}. Sientes que las paredes se cierran.`;
  }

  return `${text}... pero jurarías que viste una sombra correr hacia el norte. No confíes en tus ojos.`;
}

export function applySanity(state: PlayerState, amount: number): PlayerState {
  return {
    ...state,
    sanity: Math.max(0, Math.min(100, state.sanity + amount)),
  };
}
