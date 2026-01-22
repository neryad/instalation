import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface TerminalInputProps {
  onSubmit: (input: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export const TerminalInput = ({
  onSubmit,
  placeholder = "Enter command...",
  editable = true,
}: TerminalInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{">"}</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        placeholder={placeholder}
        placeholderTextColor="#445544"
        editable={editable}
        autoCapitalize="none"
        returnKeyType="send"
        blurOnSubmit={false}
      />
      {/* Blinking cursor simulation could be added here if needed, but TextInput cursor is usually sufficient */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 20, 0, 0.8)",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#00ff00",
  },
  prompt: {
    color: "#00ff00",
    fontSize: 16,
    marginRight: 8,
    fontFamily: "monospace", // Ensure monospace font if available, or fallback
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    color: "#00ff00",
    fontSize: 16,
    fontFamily: "monospace",
  },
});
