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

  return `${text.substring(0, text.length / 2)}... ¿Seguro que esto es real?`;
}

