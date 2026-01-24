import { CRTOverlay } from "@/components/game/CRTOverlay";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function FinalScreen() {
  // Actualizamos el tipo para incluir 'insane'
  const { type } = useLocalSearchParams<{ type: "good" | "bad" | "insane" }>();
  const router = useRouter();

  // Helper para decidir el contenido según el final
  const getEndingContent = () => {
    switch (type) {
      case "good":
        return {
          title: "ESCAPASTE",
          text: "Saliste del lugar. Pero algo aprendió de ti.\nAhora sabe cómo piensas.",
          button: "VOLVER A LA REALIDAD",
          style: styles.good,
        };
      case "insane":
        return {
          title: "PERDIDO",
          text: "Llegaste al núcleo, pero tu mente se quedó atrás.\nEl código es tu nueva piel.",
          button: "REINICIAR INTERFAZ",
          style: styles.insane,
        };
      case "bad":
      default:
        return {
          title: "TE ENCONTRÓ",
          text: "No corriste. No luchaste.\nSolo seguiste el patrón.\nY eso fue suficiente.",
          button: "ACEPTAR TU DESTINO",
          style: styles.bad,
        };
    }
  };

  const content = getEndingContent();

  return (
    <View style={styles.container}>
      <CRTOverlay />
      <Text style={[styles.title, content.style]}>{content.title}</Text>

      <Text style={styles.text}>{content.text}</Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: "rgba(255,255,255,0.1)" },
        ]}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>{content.button}</Text>
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
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 4,
    textAlign: "center",
  },
  good: {
    color: "#00ff88", // Verde neón
    textShadowColor: "rgba(0, 255, 136, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  bad: {
    color: "#ff0033", // Rojo sangre
    textShadowColor: "rgba(255, 0, 51, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  insane: {
    color: "#ffcc00", // Amarillo/Naranja de advertencia
    textShadowColor: "rgba(255, 204, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  text: {
    color: "#aaa",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 60,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  button: {
    borderWidth: 1,
    borderColor: "#555",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 2,
  },
  buttonText: {
    color: "#fff",
    letterSpacing: 2,
    fontSize: 14,
    fontWeight: "bold",
  },
});
