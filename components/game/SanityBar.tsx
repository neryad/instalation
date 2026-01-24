import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface SanityBarProps {
  sanity: number;
}

export const SanityBar = ({ sanity }: SanityBarProps) => {
  const percentage = Math.max(0, Math.min(100, sanity));
  const shakeAnim = useRef(new Animated.Value(0)).current;
  let color = "#00ff00"; // Stable
  let status = "STABLE";

  if (percentage <= 60) {
    color = "#ccff00";
    status = "UNSTABLE";
  }
  if (percentage <= 30) {
    color = "#ff3300";
    status = "CRITICAL";
  }

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

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.label}>SANITY_LEVEL</Text>
          <Text style={[styles.status, { color }]}>[{status}]</Text>
        </View>

        <View style={styles.barContainer}>
          <View
            style={[
              styles.fill,
              { width: `${percentage}%`, backgroundColor: color },
            ]}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.value}>{Math.round(sanity)}%</Text>
          <Text style={styles.max}>100%</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    color: "#00ff00",
    fontSize: 12,
    fontFamily: "monospace",
  },
  status: {
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  barContainer: {
    height: 12,
    backgroundColor: "#001a00",
    borderColor: "#004400",
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
  },
  fill: {
    height: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  value: {
    color: "#666",
    fontSize: 10,
    fontFamily: "monospace",
  },
  max: {
    color: "#444",
    fontSize: 10,
    fontFamily: "monospace",
  },
});
