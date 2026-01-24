import { CRTOverlay } from "@/components/game/CRTOverlay";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function IntroScreen() {
  const router = useRouter();
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      }, 600); // Velocidad de aparición de cada línea
      return () => clearTimeout(timeout);
    } else {
      // Esperar un segundo después de la última línea y entrar al juego
      const finalTimeout = setTimeout(() => {
        router.replace("/game");
      }, 1500);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentIndex]);

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
