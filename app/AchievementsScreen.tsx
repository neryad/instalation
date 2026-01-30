import { CRTOverlay } from "@/components/game/CRTOverlay";
import {
    EndingDetails,
    EndingType,
    getUnlockedEndings,
    resetEndings,
} from "@/storage/achievements";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ALL_ENDINGS: EndingType[] = [
  "good",
  "bad",
  "insane",
  "captured",
  "transcend",
  "escape",
  "secret_log",
];

export default function AchievementsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [unlocked, setUnlocked] = useState<EndingType[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getUnlockedEndings();
    setUnlocked(data);
  };

  const handleReset = async () => {
    await resetEndings();
    load();
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
      ]}
    >
      <CRTOverlay />

      <Text style={styles.title}>ARCHIVOS DEL SISTEMA</Text>
      <Text style={styles.subtitle}>
        FINALES DESBLOQUEADOS: {unlocked.length} / {ALL_ENDINGS.length}
      </Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {ALL_ENDINGS.map((ending) => {
          const isUnlocked = unlocked.includes(ending);
          const details = EndingDetails[ending];

          return (
            <View
              key={ending}
              style={[
                styles.card,
                isUnlocked ? { borderColor: details.color } : styles.lockedCard,
              ]}
            >
              <Text style={[styles.icon, isUnlocked && { color: details.color }]}>
                {isUnlocked ? details.icon : "[X]"}
              </Text>
              <Text
                style={[
                  styles.cardTitle,
                  isUnlocked ? { color: details.color } : styles.lockedText,
                ]}
              >
                {isUnlocked ? details.title : "???"}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.backText}>VOLVER AL MENÚ</Text>
        </Pressable>

        {/* Opcional: Para debug */}
        {/* <Pressable onPress={handleReset}>
          <Text style={{ color: "#333", fontSize: 10 }}>[RESET]</Text>
        </Pressable> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000500",
    paddingHorizontal: 20,
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  title: {
    color: "#0f0",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 5,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  subtitle: {
    color: "#0a0",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  card: {
    width: "47%",
    aspectRatio: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 20, 0, 0.3)",
    padding: 10,
  },
  lockedCard: {
    borderColor: "#113311",
    borderStyle: "dashed",
  },
  icon: {
    fontSize: 24, // Un poco más pequeño para que quepa el ASCII
    marginBottom: 10,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "bold",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 255, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cardTitle: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  lockedText: {
    color: "#113311",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
    gap: 20,
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
