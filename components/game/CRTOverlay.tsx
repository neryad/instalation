import React from "react";
import { StyleSheet, View } from "react-native";

export const CRTOverlay = () => {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.scanlines} />
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
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 255, 0, 0.03)",
  },
  scanlines: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    // Simple way to simulate scanlines without an image: repeated linear gradient is hard in pure RN styles without a library.
    // We will rely on a simple alternating opacity or just the color tint for now to keep it performant.
    // A better approach would be an SVG or Image, but we want to avoid assets for this simple port.
    opacity: 0.5,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    // Native doesn't support radial gradients easily without expo-linear-gradient.
    // We'll skip complex vignette for now or add a simple border.
    borderWidth: 2,
    borderColor: "rgba(0, 255, 0, 0.1)",
  },
});
