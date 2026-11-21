import { PlayerState } from "./player";
import { rooms } from "./rooms";
import { tSync } from "./i18n";

export interface MentalEvent {
  id: string;
  text: (state: PlayerState, lang: "es" | "en") => string;
  sanityChange: number;
  probability: (state: PlayerState) => number;
}

export const mentalEvents: MentalEvent[] = [
  {
    id: "whisper_echo",
    text: (state, lang) =>
      tSync(lang, "events.whisper_echo", { dir: state.lastDirections[state.lastDirections.length - 1] || "" }),
    sanityChange: -5,
    probability: (state) => (state.sanity < 50 ? 0.4 : 0.1),
  },
  {
    id: "ai_direct_threat",
    text: (state, lang) => {
      const item = state.inventory.length > 0 ? state.inventory[state.inventory.length - 1] : null;
      if (item) {
        return tSync(lang, "events.ai_direct_threat_with_item", { item });
      }
      return tSync(lang, "events.ai_direct_threat");
    },
    sanityChange: -10,
    probability: (state) => (state.sanity < 30 ? 0.3 : 0.05),
  },
  {
    id: "room_memory",
    text: (state, lang) => {
      const room = rooms[state.currentRoom];
      return tSync(lang, "events.room_memory", { room: room.id });
    },
    sanityChange: -4,
    probability: (state) => (state.sanity < 70 ? 0.2 : 0.02),
  },
  {
    id: "item_hallucination",
    text: (state, lang) => {
      const item = state.inventory[state.inventory.length - 1];
      return tSync(lang, "events.item_hallucination", { item });
    },
    sanityChange: -7,
    probability: (state) =>
      state.inventory.length > 0 && state.sanity < 30 ? 0.5 : 0,
  },

  {
    id: "item_corruption",
    text: (state, lang) => {
      const item = state.inventory.length > 0 ? state.inventory[state.inventory.length - 1] : "";
      return tSync(lang, "events.item_corruption", { item });
    },
    sanityChange: -5,
    probability: (state) =>
      state.sanity < 25 && state.inventory.length > 0 ? 0.4 : 0,
  },
  {
    id: "command_mimic",
    text: (_state, lang) =>
      tSync(lang, "events.command_mimic"),
    sanityChange: -8,
    probability: (state) => (state.sanity < 40 ? 0.15 : 0),
  },
  {
    id: "false_item_pickup",
    text: (_state, lang) =>
      tSync(lang, "events.false_exit"),
    sanityChange: -5,
    probability: (state) => (state.sanity < 30 ? 0.3 : 0),
  },
  // NEW: Narrative events that reveal story
  {
    id: "lore_voice_recording",
    text: (_state, lang) =>
      tSync(lang, "events.lore_voice_recording"),
    sanityChange: -3,
    probability: (state) => (state.sanity < 60 ? 0.15 : 0.02),
  },
  {
    id: "lore_day_one",
    text: (_state, lang) =>
      tSync(lang, "events.lore_day_one"),
    sanityChange: -4,
    probability: (state) => (state.sanity < 55 ? 0.12 : 0.01),
  },
  {
    id: "lore_vasquez_warning",
    text: (_state, lang) =>
      tSync(lang, "events.lore_vasquez_warning"),
    sanityChange: -6,
    probability: (state) => (state.sanity < 40 ? 0.1 : 0),
  },
  {
    id: "lore_subject_numbers",
    text: (_state, lang) =>
      tSync(lang, "events.lore_subject_numbers"),
    sanityChange: -5,
    probability: (state) => (state.sanity < 50 ? 0.08 : 0.01),
  },
  {
    id: "lore_sanity_project",
    text: (_state, lang) =>
      tSync(lang, "events.lore_sanity_project"),
    sanityChange: -4,
    probability: (state) => (state.sanity < 65 ? 0.1 : 0.01),
  },
];

export function rollMentalEvent(state: PlayerState, lang: "es" | "en" = "es"): { id: string; text: (s: PlayerState) => string; sanityChange: number; probability: (s: PlayerState) => number } | null {
  for (const e of mentalEvents) {
    if (Math.random() < e.probability(state)) {
      return { ...e, text: (s: PlayerState) => e.text(s, lang) };
    }
  }
  return null;
}
