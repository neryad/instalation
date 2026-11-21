import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface SanityBarProps {
  sanity: number;
}

export const SanityBar = ({ sanity }: SanityBarProps) => {
  const percentage = Math.max(0, Math.min(100, sanity));
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  let color = "#00ff00"; // Stable
  let glowColor = "rgba(0, 255, 0, 0.4)";
  let status = "STABLE";

  if (percentage <= 60) {
    color = "#ccff00";
    glowColor = "rgba(204, 255, 0, 0.4)";
    status = "UNSTABLE";
  }
  if (percentage <= 30) {
    color = "#ff3300";
    glowColor = "rgba(255, 51, 0, 0.6)";
    status = "CRITICAL";
  }

  // Shake effect when sanity is critical
  useEffect(() => {
    if (sanity < 30) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 2,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -2,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      shakeAnim.setValue(0);
    }
  }, [sanity]);

  // Pulsing glow animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.7],
  });

  return (
    <Animated.View
      style={[styles.wrapper, { transform: [{ translateX: shakeAnim }] }]}
    >
      {/* Glow layer */}
      <Animated.View
        style={[styles.glow, { opacity: glowOpacity, backgroundColor: glowColor }]}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.label}>SANITY_LEVEL</Text>
          <Text style={[styles.status, { color }]}>[{status}]</Text>
        </View>

        <View style={styles.barContainer}>
          {/* Background grid pattern */}
          <View style={styles.barGrid} />
          {/* Fill with gradient effect */}
          <View
            style={[
              styles.fill,
              { width: `${percentage}%`, backgroundColor: color },
            ]}
          />
          {/* Shine overlay */}
          <View style={styles.shine} />
        </View>
        <View style={styles.footer}>
          <Text style={[styles.value, { color }]}>{Math.round(sanity)}%</Text>
          <Text style={styles.max}>100%</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  glow: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 8,
  },
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    color: "#00ff00",
    fontSize: 11,
    fontFamily: "monospace",
    letterSpacing: 2,
  },
  status: {
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  barContainer: {
    height: 14,
    backgroundColor: "#001100",
    borderColor: "#004400",
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    borderRadius: 2,
  },
  barGrid: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 255, 0, 0.03)",
  },
  fill: {
    height: "100%",
    shadowColor: "#00ff00",
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  value: {
    fontSize: 13,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  max: {
    color: "#444",
    fontSize: 10,
    fontFamily: "monospace",
  },
});
