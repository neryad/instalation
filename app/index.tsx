import { Link, useRouter } from "expo-router";
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
          <Text
            style={[styles.title, glitch && styles.glitchText]}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
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

        <Link href="/game" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              glitch && styles.buttonGlitch,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={[styles.buttonText, glitch && { color: "#f00" }]}>
              INICIAR SECUENCIA
            </Text>
          </Pressable>
        </Link>

        {/* Botón de Archivos / Logros */}
        <Link href="/AchievementsScreen" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { marginTop: 15, borderColor: "#005500" },
              pressed && { backgroundColor: "rgba(0, 50, 0, 0.3)" },
            ]}
          >
            <Text style={[styles.buttonText, { color: "#00aa00", fontSize: 14 }]}>
              ARCHIVOS
            </Text>
          </Pressable>
        </Link>

        {/* Botón de Sistema / About */}
        <Link href="/AboutScreen" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { marginTop: 15, borderColor: "#003300" },
              pressed && { backgroundColor: "rgba(0, 30, 0, 0.3)" },
            ]}
          >
            <Text style={[styles.buttonText, { color: "#005500", fontSize: 12 }]}>
              SISTEMA
            </Text>
          </Pressable>
        </Link>
      </View>

      {/* BLOQUE INFERIOR: ACCESO A MANUAL */}
      <View style={styles.footerContainer}>
        <Link href="/ManualScreen" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.manualButton,
              pressed && { backgroundColor: "rgba(0, 50, 0, 0.2)" },
            ]}
          >
            <Text style={styles.footerHeader}>
              [ ABRIR MANUAL DE OPERACIONES ]
            </Text>
          </Pressable>
        </Link>
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
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
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
    letterSpacing: 4,
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
  manualButton: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,255,0,0.3)",
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  footerHeader: {
    color: "#262",
    fontSize: 12,
    fontFamily: "monospace",
    letterSpacing: 2,
  },
});
