import { getSettings } from "@/storage/settings";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface CRTOverlayProps {
  isGlitchActive?: boolean;
  dangerLevel?: number;
  sanity?: number;
}

export const CRTOverlay: React.FC<CRTOverlayProps> = ({
  isGlitchActive,
  dangerLevel = 0,
  sanity = 100,
}) => {
  const [settings, setSettings] = useState({ crtEnabled: true, glitchEnabled: true });
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function load() {
      const s = await getSettings();
      setSettings(s);
    }
    load();
  }, []);

  useEffect(() => {
    if (sanity < 30) {
      const speed = sanity < 15 ? 1200 : 400;
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1, duration: speed / 2, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 0, duration: speed / 2, useNativeDriver: true }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    } else {
      pulseAnim.setValue(0);
    }
  }, [sanity]);

  useEffect(() => {
    if (dangerLevel > 0.7) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(borderAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(borderAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    } else {
      borderAnim.setValue(0);
    }
  }, [dangerLevel]);

  const noEffects = !settings.crtEnabled && !isGlitchActive && sanity >= 30 && dangerLevel <= 0.7;
  if (noEffects) return null;

  const sanityDanger = Math.max(0, (30 - sanity) / 30);
  const baseRedOpacity = Math.min(1, sanityDanger * 0.35 + dangerLevel * 0.15);

  return (
    <View
      style={[
        styles.container,
        isGlitchActive && settings.glitchEnabled && styles.glitchContainer,
      ]}
      pointerEvents="none"
    >
      {settings.crtEnabled && (
        <View style={[styles.scanlines, isGlitchActive && settings.glitchEnabled && styles.glitchLines]} />
      )}
      <View style={styles.vignette} />
      {settings.crtEnabled && <View style={styles.tint} />}

      <Animated.View
        style={[
          styles.dangerOverlay,
          {
            opacity: sanity < 30
              ? pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [baseRedOpacity * 0.2, baseRedOpacity],
                })
              : baseRedOpacity * 0.5,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.borderFlash,
          {
            opacity: borderAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.35],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  glitchContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.05)",
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
    backgroundColor: "rgba(0, 255, 0, 0.3)",
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: "rgba(0, 255, 0, 0.1)",
  },
  dangerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ff0000",
  },
  borderFlash: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 6,
    borderColor: "#ff0000",
  },
});
