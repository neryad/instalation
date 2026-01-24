import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CRTOverlay } from "../components/game/CRTOverlay";

export default function Home() {
  const router = useRouter();
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
        }, 180);
      },
      3000 + Math.random() * 5000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <CRTOverlay isGlitchActive={glitch} />

      <View style={styles.content}>
        {/* TÍTULO PRINCIPAL EVOLUCIONADO */}
        <View style={styles.header}>
          <Text style={[styles.title, glitch && styles.glitchText]}>
            S.A.N.I.T.Y.
          </Text>
          <View style={styles.scanlineTitle} />
          <Text style={styles.version}>v2.0.26_CORE</Text>
        </View>

        {/* SUBTÍTULO CON ESTILO DE CARGA */}
        <View style={styles.subtitleContainer}>
          <Text style={[styles.subtitle, glitch && styles.glitchSubtitle]}>
            {currentSubtitle}
          </Text>
        </View>

        {/* CAJA DE ADVERTENCIA MEJORADA */}
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

        {/* BOTÓN DE ACCIÓN */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/intro")} // Suponiendo que llamas al archivo app/intro.tsx
        >
          <Text style={styles.buttonText}>INICIAR SECUENCIA</Text>
        </Pressable>
        {/* GUÍA DE COMANDOS ESTILO TERMINAL */}
        <View style={styles.footer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    width: "100%",
    padding: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    //color: "#0f0",
    // fontSize: 56,
    // fontWeight: "900",
    fontFamily: "monospace",
    // letterSpacing: 12,
    textShadowColor: "rgba(0, 255, 0, 0.8)",
    textShadowRadius: 20,
    fontSize: 40,
    fontWeight: "bold",
    color: "#0f0",
    letterSpacing: 6,
    textAlign: "center",
    width: "100%",
  },
  titleContainer: {
    flex: 2, // Le damos más peso al área del título
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10, // Evita que las letras rocen los bordes
  },
  version: {
    color: "#050",
    fontSize: 10,
    fontFamily: "monospace",
    marginTop: 5,
  },
  glitchText: {
    color: "#f00",
    transform: [{ scale: 1.05 }, { skewX: "5deg" }],
    textShadowColor: "#0f0",
  },
  subtitleContainer: {
    height: 40,
    justifyContent: "center",
    marginBottom: 60,
  },
  subtitle: {
    color: "#4a4",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "monospace",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  glitchSubtitle: {
    color: "#f00",
    fontWeight: "bold",
  },
  warningBox: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  warningLine: {
    height: 1,
    width: 100,
    backgroundColor: "#300",
    marginVertical: 10,
  },
  warningText: {
    color: "#600",
    fontSize: 10,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  button: {
    borderWidth: 1,
    borderColor: "#0f0",
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "transparent",
  },
  buttonPressed: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
  buttonText: {
    color: "#0f0",
    fontSize: 18,
    letterSpacing: 3,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 60,
    width: "100%",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,255,0,0.1)",
  },
  footerHeader: {
    color: "#252",
    fontSize: 10,
    fontFamily: "monospace",
    marginBottom: 10,
  },
  commandRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cmd: {
    color: "#0a0",
    width: 50,
    fontSize: 11,
    fontFamily: "monospace",
  },
  cmdDesc: {
    color: "#464",
    fontSize: 11,
    fontFamily: "monospace",
  },

  // ... (tus otros estilos)

  scanlineTitle: {
    position: "absolute",
    bottom: 5,
    width: "120%", // Un poco más ancho que el título
    height: 2,
    backgroundColor: "rgba(0, 255, 0, 0.2)",
    shadowColor: "#0f0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
