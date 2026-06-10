import { CRTOverlay } from "@/components/game/CRTOverlay";
import { clearSave } from "@/storage/gameState";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GridBackground } from "../components/game/GridBackground";

export default function IntroScreen() {
  const router = useRouter();
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasSkipped, setHasSkipped] = useState(false);

  const handleSkip = async () => {
    if (hasSkipped) return;
    setHasSkipped(true);
    await clearSave();
    router.replace("/game");
  };

  const introText = [
    "> ESTABLECIENDO VÍNCULO NEURAL...",
    "> CARGANDO PROTOCOLO S.A.N.I.T.Y. [v2.0.26]",
    "> UBICACIÓN: INSTALACIÓN SUBTERRÁNEA - SECTOR 7",
    "> ANALIZANDO INTEGRIDAD DEL SUJETO...",
    "> ADVERTENCIA: INTERFERENCIA DETECTADA EN EL NÚCLEO.",
    "> OBJETIVO: RECONEXIÓN TOTAL.",
    "> INICIANDO SESIÓN...",
  ];

  useEffect(() => {
    if (currentIndex < introText.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, introText[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
      }, 250);
      return () => clearTimeout(timeout);
    } else {
      // Esperar un segundo después de la última línea y entrar al juego
      const finalTimeout = setTimeout(async () => {
        await clearSave();
        router.replace("/game");
      }, 500);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentIndex]);

  return (
    <Pressable style={styles.container} onPress={handleSkip}>
      <GridBackground />
      <CRTOverlay />
      <View style={styles.content}>
        {lines.map((line, index) => (
          <Text
            key={index}
            style={[
              styles.text,
              index === lines.length - 1 && styles.latestLine,
              line.includes("ADVERTENCIA") && styles.warningText,
            ]}
          >
            {line}
          </Text>
        ))}
        <Text style={styles.cursor}>_</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 30,
    justifyContent: "center",
  },
  content: {
    width: "100%",
  },
  text: {
    color: "#00aa00",
    fontFamily: "monospace",
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  latestLine: {
    color: "#00ff00",
    fontWeight: "bold",
  },
  warningText: {
    color: "#ff3300",
  },
  cursor: {
    color: "#00ff00",
    fontSize: 18,
    fontWeight: "bold",
  },
});
