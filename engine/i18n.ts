import { loadLanguage } from "@/locales/I18nContext";
import { PlayerState } from "./player";
import { Direction, rooms } from "./rooms";

const es = require("@/locales/es.json");
const en = require("@/locales/en.json");

export async function getLang(): Promise<"es" | "en"> {
  return loadLanguage();
}

export function tSync(lang: "es" | "en", key: string, params?: Record<string, string | number>): string {
  const translations = lang === "en" ? en : es;
  const parts = key.split(".");
  let current: any = translations;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return key;
    current = current[part];
  }
  let text = typeof current === "string" ? current : key;
  if (params) {
    text = text.replace(/\{(\w+)\}/g, (_m: string, k: string) => String(params[k] ?? `{${k}}`));
  }
  return text;
}

// Map English directions to Spanish
const dirMap: Record<string, Direction> = {
  north: "norte",
  south: "sur",
  east: "este",
  west: "oeste",
  norte: "norte",
  sur: "sur",
  este: "este",
  oeste: "oeste",
};

export function normalizeDirection(input: string): Direction | null {
  return dirMap[input.toLowerCase()] || null;
}

// Map English commands to Spanish
const cmdMap: Record<string, string> = {
  investigate: "investigar",
  look: "mirar",
  search: "buscar",
  force: "forzar",
  use: "usar",
  help: "help",
};

export function normalizeCommand(input: string): string {
  const parts = input.toLowerCase().split(" ");
  const normalized = parts.map((p) => cmdMap[p] || p);
  return normalized.join(" ");
}

export function getRoomDescriptionI18n(state: PlayerState, lang: "es" | "en"): string {
  const room = rooms[state.currentRoom];
  
  // Get description from translations
  let desc = tSync(lang, `rooms.${state.currentRoom}.base`);
  
  // Sanity variants
  if (room.sanityVariants) {
    let best: (typeof room.sanityVariants)[number] | null = null;
    for (const v of room.sanityVariants) {
      if (state.sanity <= v.minSanity && (!best || v.minSanity < best.minSanity)) {
        best = v;
      }
    }
    if (best) {
      // Check if this room has an insane variant in translations
      const insaneKey = `rooms.${state.currentRoom}.insane`;
      const insaneDesc = tSync(lang, insaneKey);
      if (insaneDesc !== insaneKey) {
        desc = insaneDesc;
      }
    }
  }
  
  // AI hints
  if (state.entityAwareness > 70) desc += `\n${tSync(lang, "engine.alert_near")}`;
  else if (state.entityAwareness > 40)
    desc += `\n${tSync(lang, "engine.alert_heavy_gaze")}`;
  
  return desc;
}
