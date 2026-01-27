import { CRTOverlay } from "@/components/game/CRTOverlay";
import { unlockEnding } from "@/storage/achievements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function FinalScreen() {
  // Actualizamos el tipo para incluir los 6 finales
  const { type } = useLocalSearchParams<{
    type: "good" | "bad" | "insane" | "captured" | "transcend" | "escape";
  }>();
  const router = useRouter();

  // Guardar el logro al cargar la pantalla
  useEffect(() => {
    if (type) {
      unlockEnding(type as any);
    }
  }, [type]);

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
          title: "MENTE FRAGMENTADA",
          text: "Tu conciencia se disuelve en el vacío digital.\nYa no sabes dónde terminas tú y empieza el código.",
          button: "REINICIAR INTERFAZ",
          style: styles.insane,
        };
      case "captured":
        return {
          title: "LOCALIZADO",
          text: "La IA cierra todas las salidas.\nEscuchas pasos metálicos. Está aquí.\nNo hay escapatoria.",
          button: "ACEPTAR TU DESTINO",
          style: styles.captured,
        };
      case "transcend":
        return {
          title: "TRASCENDENCIA",
          text: "Ya no hay 'tú'. Ya no hay 'IA'.\nSolo datos fluyendo en armonía infinita.\n¿Esto es victoria o rendición?",
          button: "EXISTIR",
          style: styles.transcend,
        };
      case "escape":
        return {
          title: "ESCAPASTE",
          text: "Ves la luz del sol. Respiras aire real.\nPero allá abajo, la IA sigue funcionando.\nY ahora sabe cómo piensas.",
          button: "VOLVER AL MUNDO",
          style: styles.escape,
        };
      case "bad":
      default:
        return {
          title: "ASIMILADO",
          text: "Llegaste al núcleo, pero demasiado tarde.\nLa IA te absorbe. Eres parte del sistema ahora.",
          button: "UNIRSE AL SERVIDOR",
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
  captured: {
    color: "#cc00ff", // Púrpura/Violeta (IA tecnológica)
    textShadowColor: "rgba(204, 0, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  transcend: {
    color: "#00ddff", // Cyan/Azul eléctrico (digital)
    textShadowColor: "rgba(0, 221, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  escape: {
    color: "#ff9900", // Naranja (libertad agridulce)
    textShadowColor: "rgba(255, 153, 0, 0.5)",
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
