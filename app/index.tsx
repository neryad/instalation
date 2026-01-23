import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CRTOverlay } from "../components/game/CRTOverlay";

export default function Home() {
  const router = useRouter();
  const [glitch, setGlitch] = useState(false);

  // Lista de mensajes que la IA inyecta durante el glitch
  const horrorMessages = [
    "TE ESTOY OBSERVANDO",
    "ESTA NO ES TU CASA",
    "EL NÚCLEO SABE TU NOMBRE",
    "NO CONFÍES EN TUS OJOS",
    "YA ESTÁS DENTRO",
  ];

  // Estado para el mensaje actual
  const [currentSubtitle, setCurrentSubtitle] = useState(
    '"No todas las puertas llevan a un lugar real."',
  );

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitch(true);

        // Durante el glitch, cambiamos el texto a algo aterrador
        const randomMessage =
          horrorMessages[Math.floor(Math.random() * horrorMessages.length)];
        setCurrentSubtitle(randomMessage);

        setTimeout(() => {
          setGlitch(false);
          // Al terminar el glitch, vuelve a la normalidad
          setCurrentSubtitle('"No todas las puertas llevan a un lugar real."');
        }, 150);
      },
      2500 + Math.random() * 4000,
    ); // Intervalo irregular para mayor tensión

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <CRTOverlay />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.protocol, glitch && styles.glitchText]}>
            PROTOCOL:
          </Text>
          <Text style={[styles.title, glitch && styles.glitchText]}>
            AWAKENING
          </Text>
          <View style={styles.line} />
        </View>

        {/* El subtítulo ahora cambia dinámicamente */}
        <Text
          style={[
            styles.subtitle,
            glitch && { color: "#f00", fontWeight: "bold" }, // Se pone rojo en el glitch
          ]}
        >
          {currentSubtitle}
        </Text>

        <View style={styles.warningBox}>
          <Text style={styles.warning}>WARNING: NEURAL INTERFACE REQUIRED</Text>
          <Text style={styles.warning}>UNAUTHORIZED ACCESS WILL BE LOGGED</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
          onPress={() => router.replace("/game")}
        >
          <Text style={styles.buttonText}>ESTABLISH CONNECTION</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerHeader}>— PROTOCOLOS DE COMANDO —</Text>
          <View style={styles.commandGrid}>
            <Text style={styles.footerText}>
              [NORTH/SOUTH/EAST/WEST] : MOVERSE
            </Text>
            <Text style={styles.footerText}>[INVESTIGAR] : BUSCAR OBJETOS</Text>
            <Text style={styles.footerText}>[MIRAR] : ANALIZAR ENTORNO</Text>
          </View>
          <Text style={[styles.footerText, styles.blink, { marginTop: 15 }]}>
            SUBJECT STATUS: PENDING INTEGRATION
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000800",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    zIndex: 10,
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  protocol: {
    color: "#0f0",
    fontSize: 24,
    letterSpacing: 4,
    fontFamily: "monospace",
    marginBottom: 10,
  },
  title: {
    color: "#0f0",
    fontSize: 48,
    letterSpacing: 8,
    fontWeight: "bold",
    fontFamily: "monospace",
    textShadowColor: "rgba(0, 255, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  glitchText: {
    transform: [{ translateX: -2 }],
    textShadowColor: "#f00",
    textShadowOffset: { width: 2, height: 0 },
    textShadowRadius: 0,
  },
  line: {
    height: 1,
    width: 200,
    backgroundColor: "#0f0",
    opacity: 0.5,
    marginTop: 20,
  },
  subtitle: {
    color: "#686",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 60,
    textAlign: "center",
    fontFamily: "monospace",
  },
  warningBox: {
    marginBottom: 40,
    alignItems: "center",
  },
  warning: {
    color: "#ff3333",
    fontSize: 10,
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  button: {
    borderWidth: 2,
    borderColor: "#0f0",
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: "rgba(0, 20, 0, 0.5)",
  },
  buttonPressed: {
    backgroundColor: "rgba(0, 50, 0, 0.8)",
  },
  buttonText: {
    color: "#0f0",
    fontSize: 20,
    letterSpacing: 4,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "rgba(0, 40, 0, 0.2)", // Un fondo sutil para la guía
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 0, 0.1)",
  },
  footerHeader: {
    color: "#0f0",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 2,
  },
  commandGrid: {
    alignItems: "flex-start", // Alinea los comandos a la izquierda
  },
  footerText: {
    color: "#4a4", // Un verde más oscuro para que no distraiga del botón principal
    fontSize: 10,
    fontFamily: "monospace",
    lineHeight: 16,
  },
  blink: {
    opacity: 0.8,
    color: "#0f0",
  },
});
