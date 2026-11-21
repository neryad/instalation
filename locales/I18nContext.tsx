import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

import en from "./en.json";
import es from "./es.json";

const LANG_KEY = "GAME_LANGUAGE";

type Lang = "es" | "en";
type Translations = typeof es;

const translations: Record<Lang, Translations> = { es, en };

interface I18nContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextType>({
  t: (key: string) => key,
  lang: "es",
  setLang: () => {},
});

export function useI18n() {
  return useContext(I18nContext);
}

// Helper: resolve dotted key like "rooms.awakening.base" from nested object
function resolveKey(obj: any, key: string): string {
  const parts = key.split(".");
  let current: any = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return key;
    current = current[part];
  }
  return typeof current === "string" ? current : key;
}

// Helper: replace {param} placeholders
function replaceParams(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (_match, key) => String(params[key] ?? `{${key}}`));
}

export async function loadLanguage(): Promise<Lang> {
  try {
    const stored = await AsyncStorage.getItem(LANG_KEY);
    if (stored === "en" || stored === "es") return stored;
  } catch {}
  return "es";
}

export async function saveLanguage(lang: Lang) {
  try {
    await AsyncStorage.setItem(LANG_KEY, lang);
  } catch {}
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    loadLanguage().then((l) => setLangState(l));
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    saveLanguage(l);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    const text = resolveKey(translations[lang], key);
    return replaceParams(text, params);
  };

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}
