import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadLanguage } from "@/locales/I18nContext";

const STORAGE_KEY = "UNLOCKED_ENDINGS";

export type EndingType =
  | "good"
  | "bad"
  | "insane"
  | "captured"
  | "transcend"
  | "escape"
  | "secret_log";

export const EndingDetails: Record<
  EndingType,
  { title: string; color: string; icon: string }
> = {
  good: { title: "achievements.good", color: "#00ff88", icon: "[OK]" },
  bad: { title: "achievements.bad", color: "#ff0033", icon: "X_X" },
  insane: { title: "achievements.insane", color: "#ffcc00", icon: "{~?~}" },
  captured: { title: "achievements.captured", color: "#cc00ff", icon: "( o )" },
  transcend: { title: "achievements.transcend", color: "#00ddff", icon: "< . >" },
  escape: { title: "achievements.escape", color: "#ff9900", icon: ">>" },
  secret_log: { title: "achievements.secret_log", color: "#ffffff", icon: "👁️" },
};

export async function getEndingTitle(ending: EndingType): Promise<string> {
  const lang = await loadLanguage();
  const es = require("@/locales/es.json");
  const en = require("@/locales/en.json");
  const translations = lang === "en" ? en : es;
  return translations.achievements[ending] ?? EndingDetails[ending].title;
}

export async function unlockEnding(ending: EndingType) {
  try {
    const current = await getUnlockedEndings();
    if (!current.includes(ending)) {
      const updated = [...current, ending];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      console.log(`[LOGRO]: Desbloqueado final ${ending}`);
    }
  } catch (e) {
    console.error("Error guardando final:", e);
  }
}

export async function getUnlockedEndings(): Promise<EndingType[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Error leyendo finales:", e);
    return [];
  }
}

export async function resetEndings() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
