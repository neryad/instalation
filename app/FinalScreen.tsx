import { CRTOverlay } from "@/components/game/CRTOverlay";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FinalScreen() {
  const { type } = useLocalSearchParams<{ type: "good" | "bad" }>();
  const router = useRouter();

  const isGood = type === "good";

  return (
    <View style={styles.container}>
      <CRTOverlay />
      <Text style={[styles.title, isGood ? styles.good : styles.bad]}>
        {isGood ? "ESCAPASTE" : "TE ENCONTRÓ"}
      </Text>

      <Text style={styles.text}>
        {isGood
          ? "Saliste del lugar. Pero algo aprendió de ti.\nAhora sabe cómo piensas."
          : "No corriste. No luchaste.\nSolo seguiste el patrón.\nY eso fue suficiente."}
      </Text>

      <Pressable style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.buttonText}>
          {isGood ? "VOLVER A LA REALIDAD" : "ACEPTAR TU DESTINO"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 2,
  },
  good: {
    color: "#00ff88",
  },
  bad: {
    color: "#ff0033",
  },
  text: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    borderWidth: 1,
    borderColor: "#555",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    letterSpacing: 1,
  },
});
