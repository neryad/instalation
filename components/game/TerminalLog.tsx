import React, { useEffect, useRef, useState } from "react";
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

const TypewriterText = ({ text, style, onRender }: { text: string; style: any; onRender: (t: string, s: any) => any }) => {
  const [displayedText, setDisplayedText] = useState("");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
        setDisplayedText(text);
        return;
    }

    let current = "";
    const chars = text.split("");
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < chars.length) {
        current += chars[i];
        setDisplayedText(current);
        i++;
      } else {
        hasAnimated.current = true;
        clearInterval(interval);
      }
    }, 10); 

    return () => clearInterval(interval);
  }, [text]);

  return onRender(displayedText, style);
};

const BlinkingCursor = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text style={[styles.cursor, { opacity }]}>
      ▉
    </Animated.Text>
  );
};

export const TerminalLog = ({ messages }: TerminalLogProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderStyledText = (text: string, baseStyle: any) => {
    const directionRegex = /\b(north|south|east|west|norte|sur|este|oeste)\b/gi;
    const parts = text.split(directionRegex);

    return (
      <Text style={baseStyle}>
        {parts.map((part, index) => {
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
      case "system": return styles.system;
      case "player": return styles.player;
      case "warning": return styles.warning;
      case "error": return styles.error;
      default: return styles.narrative;
    }
  };

  const getPrefix = (type: LogMessage["type"]) => {
    switch (type) {
      case "system": return "[SYS] ";
      case "player": return "> ";
      case "warning": return "[WARN] ";
      case "error": return "[ERR] ";
      default: return "";
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {messages.map((msg) => (
        <FadeInView key={msg.id}>
          <View style={styles.messageRow}>
            {msg.timestamp && (
              <Text style={styles.timestamp}>[{msg.timestamp}] </Text>
            )}
            <View style={{ flex: 1 }}>
              <TypewriterText 
                text={`${getPrefix(msg.type)}${msg.text}`}
                style={[styles.text, getStyle(msg.type)]}
                onRender={renderStyledText}
              />
            </View>
          </View>
        </FadeInView>
      ))}
      <BlinkingCursor />
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
    textDecorationLine: "underline",
  },
  cursor: {
    color: "#0f0",
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
    textShadowColor: "rgba(0, 255, 0, 0.5)",
    textShadowRadius: 5,
  },
});
