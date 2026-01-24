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
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // --- NUEVA FUNCIÓN PARA ESTILAR PALABRAS CLAVE ---
  const renderStyledText = (text: string, baseStyle: any) => {
    // Expresión regular para encontrar direcciones (insensible a mayúsculas/minúsculas)
    const directionRegex = /\b(north|south|east|west|norte|sur|este|oeste)\b/gi;

    // Dividimos el texto en partes
    const parts = text.split(directionRegex);

    return (
      <Text style={baseStyle}>
        {parts.map((part, index) => {
          // Si la parte coincide con una dirección, la envolvemos en un estilo resaltado
          if (directionRegex.test(part)) {
            return (
              <Text key={index} style={styles.highlightedDirection}>
                {part.toUpperCase()}
              </Text>
            );
          }
          return part;
        })}
      </Text>
    );
  };

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
          <View style={{ flex: 1 }}>
            {renderStyledText(`${getPrefix(msg.type)}${msg.text}`, [
              styles.text,
              getStyle(msg.type),
            ])}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... (tus estilos existentes)
  container: { flex: 1, backgroundColor: "transparent" },
  content: { paddingVertical: 10, paddingTop: 40, paddingBottom: 20 },
  messageRow: { flexDirection: "row", marginBottom: 8, paddingHorizontal: 5 },
  timestamp: { color: "#445544", fontFamily: "monospace", fontSize: 12 },
  text: { fontFamily: "monospace", fontSize: 14, lineHeight: 20 },

  // --- ESTILOS DE COLORES ---
  system: { color: "#88aa88" },
  player: { color: "#00ff00", fontWeight: "bold" },
  narrative: { color: "#ccffcc" },
  warning: { color: "#ffcc00" },
  error: { color: "#ff3333" },

  // --- ESTILO PARA RESALTAR DIRECCIONES ---
  highlightedDirection: {
    color: "#ffffff", // Blanco puro para que brille sobre el verde
    fontWeight: "bold",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5, // Efecto de brillo (glow)
  },
});
