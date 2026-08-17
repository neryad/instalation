import React from "react";
import { StyleSheet, View } from "react-native";
import { LogMessage, TerminalLog } from "../game/TerminalLog";

interface LogPanelProps {
  messages: LogMessage[];
  height?: number;
}

export function LogPanel({ messages, height = 130 }: LogPanelProps) {
  return (
    <View style={[styles.container, { height }]}>
      <TerminalLog messages={messages} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#003300",
    borderWidth: 1,
    backgroundColor: "rgba(0, 15, 0, 0.3)",
  },
});