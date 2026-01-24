import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface QuickActionsProps {
  onAction: (cmd: string) => void;
  disabled?: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAction,
  disabled,
}) => {
  const actions = [
    { label: "N", cmd: "NORTH" },
    { label: "S", cmd: "SOUTH" },
    { label: "E", cmd: "EAST" },
    { label: "W", cmd: "WEST" },
    { label: "INVESTIGAR", cmd: "INVESTIGAR" },
    { label: "MIRAR", cmd: "LOOK" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, disabled && styles.disabled]}
            onPress={() => !disabled && onAction(action.cmd)}
            activeOpacity={0.7}
          >
            <Text style={styles.text}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 10, 0, 0.8)",
    borderTopWidth: 1,
    borderTopColor: "#003300",
    paddingVertical: 8,
  },
  scroll: {
    paddingHorizontal: 10,
    gap: 10,
  },
  button: {
    backgroundColor: "rgba(0, 40, 0, 0.5)",
    borderWidth: 1,
    borderColor: "#00ff41",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
  },
  disabled: {
    borderColor: "#222",
    opacity: 0.5,
  },
  text: {
    color: "#00ff41",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
});
