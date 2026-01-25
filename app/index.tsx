import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CRTOverlay } from "../components/game/CRTOverlay";

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [glitch, setGlitch] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(
    "Análisis Sistemático de Integridad Neural",
  );

  const horrorMessages = [
    "S.ISTEMA A.UTÓNOMO N.EURAL I.NTEGRADO T.OTAL Y.IELD",
    "SOLO HAY OSCURIDAD AQUÍ",
    "NO PUEDES DESCONECTARTE",
    "¿ESTÁS SEGURO DE QUE ERES TÚ?",
    "EL NÚCLEO TE NECESITA",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitch(true);
        const randomMessage =
          horrorMessages[Math.floor(Math.random() * horrorMessages.length)];
        setCurrentSubtitle(randomMessage);

        setTimeout(() => {
          setGlitch(false);
          setCurrentSubtitle("Análisis Sistemático de Integridad Neural");
        }, 200);
      },
      4000 + Math.random() * 4000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <CRTOverlay isGlitchActive={glitch} />

      {/* BLOQUE SUPERIOR: TÍTULO Y ESTADO */}
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, glitch && styles.glitchText]}>
            S.A.N.I.T.Y.
          </Text>
          <View
            style={[
              styles.scanlineTitle,
              glitch && { backgroundColor: "rgba(255,0,0,0.4)" },
            ]}
          />
        </View>
        <Text style={styles.version}>v2.0.26_CORE</Text>

        <View style={styles.subtitleContainer}>
          <Text style={[styles.subtitle, glitch && styles.glitchSubtitle]}>
            {currentSubtitle}
          </Text>
        </View>
      </View>

      {/* BLOQUE CENTRAL: ADVERTENCIAS Y ACCIÓN */}
      <View style={styles.centerContent}>
        <View style={styles.warningBox}>
          <View style={styles.warningLine} />
          <Text style={styles.warningText}>
            ESTADO: FALLO DE MEMORIA DETECTADO
          </Text>
          <Text style={styles.warningText}>
            PROCESO DE INTEGRACIÓN PENDIENTE...
          </Text>
          <View style={styles.warningLine} />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            glitch && styles.buttonGlitch,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/intro")}
        >
          <Text style={[styles.buttonText, glitch && { color: "#f00" }]}>
            INICIAR SECUENCIA
          </Text>
        </Pressable>
      </View>

      {/* BLOQUE INFERIOR: MANUAL Y SISTEMA UNIFICADOS */}
      <View style={styles.footerContainer}>
        <View style={styles.manualBox}>
          <Text style={styles.footerHeader}>// MANUAL_DE_OPERACIONES</Text>
          <View style={styles.commandRow}>
            <Text style={styles.cmd}>MOV:</Text>
            <Text style={styles.cmdDesc}>[N, S, E, W]</Text>
          </View>
          <View style={styles.commandRow}>
            <Text style={styles.cmd}>ACT:</Text>
            <Text style={styles.cmdDesc}>[INVESTIGAR, MIRAR, USAR]</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/AboutScreen" as any)}
          style={({ pressed }) => [
            styles.systemBtn,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Text style={styles.systemLink}>[ SISTEMA ]</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  titleWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    textShadowColor: "rgba(0, 255, 0, 0.8)",
    textShadowRadius: 15,
    fontSize: 42,
    fontWeight: "bold",
    color: "#0f0",
    letterSpacing: 8,
    textAlign: "center",
  },
  scanlineTitle: {
    position: "absolute",
    bottom: -5,
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0, 255, 0, 0.3)",
  },
  glitchText: {
    color: "#f00",
    transform: [{ scale: 1.03 }, { translateX: 2 }],
    textShadowColor: "rgba(255, 0, 0, 0.5)",
  },
  version: {
    color: "#050",
    fontSize: 10,
    fontFamily: "monospace",
    marginTop: 10,
    letterSpacing: 2,
  },
  subtitleContainer: {
    height: 50,
    justifyContent: "center",
    marginTop: 20,
  },
  subtitle: {
    color: "#4a4",
    fontSize: 11,
    textAlign: "center",
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  glitchSubtitle: {
    color: "#f00",
    opacity: 0.8,
  },
  centerContent: {
    alignItems: "center",
    width: "100%",
  },
  warningBox: {
    alignItems: "center",
    marginBottom: 40,
  },
  warningLine: {
    height: 1,
    width: 60,
    backgroundColor: "#200",
    marginVertical: 12,
  },
  warningText: {
    color: "#500",
    fontSize: 10,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  button: {
    borderWidth: 1,
    borderColor: "#0f0",
    paddingHorizontal: 40,
    paddingVertical: 18,
    backgroundColor: "transparent",
  },
  buttonGlitch: {
    borderColor: "#f00",
  },
  buttonPressed: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
  buttonText: {
    color: "#0f0",
    fontSize: 16,
    letterSpacing: 4,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  footerContainer: {
    width: "100%",
    marginBottom: 20,
  },
  manualBox: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,255,0,0.1)",
    paddingTop: 15,
    marginBottom: 25,
  },
  footerHeader: {
    color: "#242",
    fontSize: 10,
    fontFamily: "monospace",
    marginBottom: 10,
  },
  commandRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  cmd: {
    color: "#0a0",
    width: 45,
    fontSize: 10,
    fontFamily: "monospace",
  },
  cmdDesc: {
    color: "#464",
    fontSize: 10,
    fontFamily: "monospace",
  },
  systemBtn: {
    alignSelf: "center",
    padding: 10,
  },
  systemLink: {
    color: "#002200",
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: 3,
  },
});
