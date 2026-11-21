import { CRTOverlay } from "@/components/game/CRTOverlay";
import { useI18n } from "@/locales/I18nContext";
import { resetEndings } from "@/storage/achievements";
import { GameSettings, getSettings, saveSettings } from "@/storage/settings";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GridBackground } from "../components/game/GridBackground";

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, lang, setLang } = useI18n();
  const [settings, setSettings] = useState<GameSettings | null>(null);

  useEffect(() => {
    async function load() {
      const s = await getSettings();
      setSettings(s);
    }
    load();
  }, []);

  const toggleSetting = async (key: keyof GameSettings) => {
    if (!settings) return;
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const adjustVolume = async (delta: number) => {
    if (!settings) return;
    const newVolume = Math.max(0, Math.min(1, settings.volume + delta));
    const newSettings = { ...settings, volume: parseFloat(newVolume.toFixed(1)) };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const renderVolumeBar = (vol: number) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round(vol * totalBlocks);
    return "[" + "█".repeat(filledBlocks) + "▒".repeat(totalBlocks - filledBlocks) + "]";
  };

  const handleResetData = () => {
    const confirmMessage = "¿Deseas borrar todos los logros y el progreso? Esta acción no se puede deshacer.";
    
    if (Platform.OS === 'web') {
        if (window.confirm(confirmMessage)) {
            performReset();
        }
    } else {
        Alert.alert(
            "RESETEO DE DATOS",
            confirmMessage,
            [
                { text: "CANCELAR", style: "cancel" },
                { text: "BORRAR TODO", style: "destructive", onPress: performReset }
            ]
        );
    }
  };

  const performReset = async () => {
    await resetEndings();
    alert("Datos borrados correctamente.");
  };

  if (!settings) return null;

  return (
    <View style={styles.container}>
      <GridBackground />
      <CRTOverlay />
      
      <ScrollView 
        contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }
        ]}
        showsVerticalScrollIndicator={false}
      >
          <Text style={styles.header}>{t("settings.title")}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("settings.visual")}</Text>
            <SettingToggle 
                label={t("settings.crt")} 
                active={settings.crtEnabled} 
                onPress={() => toggleSetting('crtEnabled')} 
            />
            <SettingToggle 
                label={t("settings.glitch")} 
                active={settings.glitchEnabled} 
                onPress={() => toggleSetting('glitchEnabled')} 
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("settings.audio")}</Text>
            <SettingToggle 
                label={t("settings.sound")} 
                active={settings.soundEnabled} 
                onPress={() => toggleSetting('soundEnabled')} 
            />
            
            <View style={styles.volumeContainer}>
                <Text style={styles.toggleLabel}>{t("settings.volume")}</Text>
                <View style={styles.volumeSliderLayout}>
                    <Pressable onPress={() => adjustVolume(-0.1)} style={styles.volumeStepBtn}>
                        <Text style={styles.volumeStepText}>-</Text>
                    </Pressable>
                    <View style={styles.volumeBar}>
                        <Text style={styles.volumeBarText}>
                            {renderVolumeBar(settings.volume)}
                        </Text>
                    </View>
                    <Pressable onPress={() => adjustVolume(0.1)} style={styles.volumeStepBtn}>
                        <Text style={styles.volumeStepText}>+</Text>
                    </Pressable>
                </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("settings.data")}</Text>
            <Pressable 
                style={[styles.resetBtn]} 
                onPress={handleResetData}
            >
                <Text style={styles.resetText}>{t("settings.reset")}</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("settings.legal")}</Text>
            <Pressable 
                style={styles.legalBtn} 
                // @ts-ignore
                onPress={() => router.push("/legal/privacy")}
            >
                <Text style={styles.legalText}>{t("settings.privacy")}</Text>
            </Pressable>
            <Pressable 
                style={styles.legalBtn} 
                // @ts-ignore
                onPress={() => router.push("/legal/terms")}
            >
                <Text style={styles.legalText}>{t("settings.terms")}</Text>
            </Pressable>
            <Pressable 
                style={styles.legalBtn} 
                // @ts-ignore
                onPress={() => router.push("/legal/license")}
            >
                <Text style={styles.legalText}>{t("settings.license")}</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("settings.language")}</Text>
            <View style={styles.langRow}>
              <Pressable
                style={[styles.langBtn, lang === "es" && styles.langBtnActive]}
                onPress={() => setLang("es")}
              >
                <Text style={[styles.langBtnText, lang === "es" && styles.langBtnTextActive]}>
                  {t("settings.lang_es")}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.langBtn, lang === "en" && styles.langBtnActive]}
                onPress={() => setLang("en")}
              >
                <Text style={[styles.langBtnText, lang === "en" && styles.langBtnTextActive]}>
                  {t("settings.lang_en")}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.footer}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.backText}>{t("settings.back")}</Text>
            </Pressable>
          </View>
      </ScrollView>
    </View>
  );
}

function SettingToggle({ label, active, onPress }: any) {
    return (
        <Pressable style={styles.toggleRow} onPress={onPress}>
            <Text style={styles.toggleLabel}>{label}</Text>
            <View style={[styles.toggleBox, active && styles.toggleBoxActive]}>
                <Text style={[styles.toggleStatus, active ? styles.statusActive : styles.statusInactive]}>
                    {active ? "ON" : "OFF"}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 25,
  },
  header: {
    color: "#0f0",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    letterSpacing: 2,
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    color: "#005500",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#003300",
    paddingBottom: 5,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleLabel: {
    color: '#0a0',
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 14,
  },
  toggleBox: {
    borderWidth: 1,
    borderColor: '#004400',
    paddingHorizontal: 15,
    paddingVertical: 5,
    minWidth: 60,
    alignItems: 'center',
  },
  toggleBoxActive: {
    borderColor: '#0f0',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  toggleStatus: {
    fontWeight: 'bold',
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 12,
  },
  statusActive: {
    color: '#0f0',
  },
  statusInactive: {
    color: '#004400',
  },
  volumeContainer: {
    marginTop: 10,
  },
  volumeSliderLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  volumeStepBtn: {
    borderWidth: 1,
    borderColor: '#0f0',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
  },
  volumeStepText: {
    color: '#0f0',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  volumeBar: {
    flex: 1,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  volumeBarText: {
    color: '#0f0',
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    letterSpacing: -1,
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#300',
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(50, 0, 0, 0.1)',
  },
  resetText: {
    color: '#600',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  legalBtn: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#004400",
  },
  legalText: {
    color: "#0a0",
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    letterSpacing: 1,
  },
  footer: {
    marginTop: 'auto',
    alignItems: "center",
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#0f0",
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "rgba(0, 50, 0, 0.3)",
  },
  backText: {
    color: "#0f0",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  langRow: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
  },
  langBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#004400",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "rgba(0, 20, 0, 0.3)",
  },
  langBtnActive: {
    borderColor: "#0f0",
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
  langBtnText: {
    color: "#005500",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  langBtnTextActive: {
    color: "#0f0",
  },
});
