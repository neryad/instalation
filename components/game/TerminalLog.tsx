import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export interface LogMessage {
  id: string;
  text: string;
  type: "system" | "player" | "narrative" | "warning" | "error";
  timestamp?: string;
}

interface TerminalLogProps {
  messages: LogMessage[];
}

export const TerminalLog = ({ messages }: TerminalLogProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to end when messages change
    // Using a small timeout to ensure layout is done
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const getStyle = (type: LogMessage["type"]) => {
    switch (type) {
      case "system":
        return styles.system;
      case "player":
        return styles.player;
      case "warning":
        return styles.warning;
      case "error":
        return styles.error;
      case "narrative":
      default:
        return styles.narrative;
    }
  };

  const getPrefix = (type: LogMessage["type"]) => {
    switch (type) {
      case "system":
        return "[SYS] ";
      case "player":
        return "> ";
      case "warning":
        return "[WARN] ";
      case "error":
        return "[ERR] ";
      default:
        return "";
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {messages.map((msg) => (
        <View key={msg.id} style={styles.messageRow}>
          {msg.timestamp && (
            <Text style={styles.timestamp}>[{msg.timestamp}] </Text>
          )}
          <Text style={[styles.text, getStyle(msg.type)]}>
            {getPrefix(msg.type)}
            {msg.text}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    paddingVertical: 10,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  timestamp: {
    color: "#445544",
    fontFamily: "monospace",
    fontSize: 12,
  },
  text: {
    flex: 1,
    fontFamily: "monospace",
    fontSize: 14,
    lineHeight: 20,
  },
  system: {
    color: "#88aa88",
  },
  player: {
    color: "#00ff00",
    fontWeight: "bold",
  },
  narrative: {
    color: "#ccffcc",
  },
  warning: {
    color: "#ffcc00",
  },
  error: {
    color: "#ff3333",
  },
});
