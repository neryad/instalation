import AsyncStorage from "@react-native-async-storage/async-storage";

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
  good: { title: "SISTEMA APAGADO", color: "#00ff88", icon: "[OK]" },
  bad: { title: "ASIMILADO", color: "#ff0033", icon: "X_X" },
  insane: { title: "MENTE FRAGMENTADA", color: "#ffcc00", icon: "{~?~}" },
  captured: { title: "LOCALIZADO", color: "#cc00ff", icon: "( o )" },
  transcend: { title: "TRASCENDENCIA", color: "#00ddff", icon: "< . >" },
  escape: { title: "HUÍDA IMPERFECTA", color: "#ff9900", icon: ">>_" },
  secret_log: { title: "LA VERDAD", color: "#ffffff", icon: "👁️" },
};

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
