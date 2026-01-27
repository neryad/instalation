import { CRTOverlay } from "@/components/game/CRTOverlay";
import { resetEndings } from "@/storage/achievements";
import { GameSettings, getSettings, saveSettings } from "@/storage/settings";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
      ]}
    >
      <CRTOverlay />

      <Text style={styles.header}>[ CONFIGURACIÓN_DEL_SISTEMA ]</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DIMENSIÓN VISUAL</Text>
        <SettingToggle 
            label="FILTRO CRT" 
            active={settings.crtEnabled} 
            onPress={() => toggleSetting('crtEnabled')} 
        />
        <SettingToggle 
            label="EFECTO GLITCH" 
            active={settings.glitchEnabled} 
            onPress={() => toggleSetting('glitchEnabled')} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DIMENSIÓN AUDITIVA</Text>
        <SettingToggle 
            label="SONIDO E INTERFAZ" 
            active={settings.soundEnabled} 
            onPress={() => toggleSetting('soundEnabled')} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NÚCLEO DE DATOS</Text>
        <Pressable 
            style={[styles.resetBtn]} 
            onPress={handleResetData}
        >
            <Text style={styles.resetText}>BORRAR REGISTROS DE ARCHIVO</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.backText}>VOLVER AL MENÚ</Text>
        </Pressable>
      </View>
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
    backgroundColor: "#000500",
    paddingHorizontal: 25,
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
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
});
