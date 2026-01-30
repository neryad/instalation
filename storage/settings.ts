import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "GAME_SETTINGS";

export interface GameSettings {
  crtEnabled: boolean;
  glitchEnabled: boolean;
  soundEnabled: boolean;
  volume: number;
}

export const defaultSettings: GameSettings = {
  crtEnabled: true,
  glitchEnabled: true,
  soundEnabled: true,
  volume: 0.5,
};

export async function getSettings(): Promise<GameSettings> {
  try {
    const json = await AsyncStorage.getItem(SETTINGS_KEY);
    return json ? { ...defaultSettings, ...JSON.parse(json) } : defaultSettings;
  } catch (e) {
    console.error("Error cargando ajustes:", e);
    return defaultSettings;
  }
}

export async function saveSettings(settings: GameSettings) {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Error guardando ajustes:", e);
  }
}
