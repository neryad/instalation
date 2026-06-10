import { EndingDetails, EndingType } from "@/storage/achievements";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface AchievementToastProps {
  endingType: EndingType | null;
  onComplete?: () => void;
}

export const AchievementToast = ({ endingType, onComplete }: AchievementToastProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    if (!endingType) return;

    opacity.setValue(0);
    translateY.setValue(-30);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
      Animated.delay(2500),
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -30, duration: 300, useNativeDriver: true }),
      ]),
    ]).start(() => onComplete?.());
  }, [endingType]);

  if (!endingType) return null;

  const details = EndingDetails[endingType];

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <Text style={styles.icon}>{details.icon}</Text>
      <Text style={[styles.label, { color: details.color }]}>LOGRO: {details.title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 10, 0, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 0, 0.3)",
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 9999,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  label: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
    flex: 1,
  },
});
