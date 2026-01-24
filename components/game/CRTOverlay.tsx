import React from "react";
import { StyleSheet, View } from "react-native";

// 1. Definimos la interfaz para que TS no se queje en GameScreen
interface CRTOverlayProps {
  isGlitchActive?: boolean;
}

export const CRTOverlay: React.FC<CRTOverlayProps> = ({ isGlitchActive }) => {
  return (
    <View
      style={[
        styles.container,
        isGlitchActive && styles.glitchContainer, // Cambia el fondo si hay glitch
      ]}
      pointerEvents="none"
    >
      <View style={[styles.scanlines, isGlitchActive && styles.glitchLines]} />
      <View style={styles.vignette} />
      <View style={styles.tint} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  glitchContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.05)", // Tinte rojo muy sutil en error crítico
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 255, 0, 0.03)",
  },
  scanlines: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    opacity: 0.5,
  },
  glitchLines: {
    backgroundColor: "rgba(0, 255, 0, 0.3)", // Líneas más marcadas en el glitch
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: "rgba(0, 255, 0, 0.1)",
  },
});
