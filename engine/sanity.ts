import { PlayerState } from "./player";

export function distortText(text: string, sanity: number): string {
  if (sanity > 60) return text;

  if (sanity > 35) {
    return text.replace(/e/g, "3").replace(/a/g, "4");
  }

  if (sanity > 15) {
    return text
      .split(" ")
      .map((w) => (Math.random() > 0.7 ? "..." : w))
      .join(" ");
  }

  return "No estás seguro de que esto sea real.";
}

export function applySanity(state: PlayerState, amount: number): PlayerState {
  return {
    ...state,
    sanity: Math.max(0, Math.min(100, state.sanity + amount)),
  };
}
