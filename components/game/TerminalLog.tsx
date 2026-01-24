import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";

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

  const FadeInView = (props: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        {props.children}
      </Animated.View>
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {messages.map((msg) => (
        <FadeInView key={msg.id}>
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
        </FadeInView>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  terminalContainer: {
    flex: 1,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 0, 0.2)",
    backgroundColor: "rgba(0, 5, 0, 0.3)",
    // Este es el truco: un borde redondeado muy leve para simular el cristal del monitor
    borderRadius: 15,
    overflow: "hidden",
  },
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
    color: "#00ff00",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 255, 0, 0.8)",
    textShadowRadius: 8,
    textDecorationLine: "underline", // Ayuda a que parezca un "link" táctil
  },
});
