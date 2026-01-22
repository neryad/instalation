import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CRTOverlay } from "../components/game/CRTOverlay";

export default function Home() {
  const router = useRouter();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <CRTOverlay />
      
      <View style={styles.content}>
        <View style={styles.header}>
            <Text style={[styles.protocol, glitch && styles.glitchText]}>PROTOCOL:</Text>
            <Text style={[styles.title, glitch && styles.glitchText]}>AWAKENING</Text>
            <View style={styles.line} />
        </View>

        <Text style={styles.subtitle}>
            "No todas las puertas llevan a un lugar real."
        </Text>

        <View style={styles.warningBox}>
            <Text style={styles.warning}>WARNING: NEURAL INTERFACE REQUIRED</Text>
            <Text style={styles.warning}>UNAUTHORIZED ACCESS WILL BE LOGGED</Text>
        </View>

        <Pressable 
            style={({ pressed }) => [
                styles.button, 
                pressed && styles.buttonPressed
            ]} 
            onPress={() => router.push("/game")}
        >
            <Text style={styles.buttonText}>INIT SEQUENCE</Text>
        </Pressable>

        <View style={styles.footer}>
            <Text style={styles.footerText}>FACILITY: [REDACTED] | SECTOR: 7</Text>
            <Text style={[styles.footerText, styles.blink]}>SUBJECT STATUS: PENDING INTEGRATION</Text>
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
    marginTop: 60,
    alignItems: "center",
  },
  footerText: {
    color: "#464",
    fontSize: 10,
    fontFamily: "monospace",
    marginBottom: 5,
  },
  blink: {
    opacity: 0.8,
  }
});
