import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRoomDescription, move } from "../engine/engine";
import { initialPlayerState } from "../engine/player";

export default function GameScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  const [state, setState] = useState(initialPlayerState);
  const [command, setCommand] = useState("");
  const [log, setLog] = useState<string[]>([
    getRoomDescription(initialPlayerState),
  ]);

  // Dentro de GameScreen.tsx
  const [isGlitchActive, setIsGlitchActive] = useState(false);

  useEffect(() => {
    // Solo activamos el intervalo si la cordura es muy baja
    if (state.sanity < 15 && !state.gameOver) {
      const interval = setInterval(
        () => {
          // Cambia entre estado normal y glitch aleatoriamente
          setIsGlitchActive((prev) => !prev);
        },
        Math.random() * 200 + 50,
      ); // Ritmo irregular y nervioso

      return () => clearInterval(interval);
    } else {
      setIsGlitchActive(false);
    }
  }, [state.sanity, state.gameOver]);

  useEffect(() => {
    if (state.gameOver && state.endingType) {
      router.replace(`/FinalScreen?type=${state.endingType}` as any);
    }
  }, [state.gameOver]);
  const onSubmit = () => {
    if (state.gameOver) return;

    const lower = command.toLowerCase();

    if (["north", "south", "east", "west"].includes(lower)) {
      setState((prev) => {
        const newState = move(prev, lower as any);

        setLog((l) => [
          ...l,
          getRoomDescription(newState),
          ...(newState.lastEvent ? [newState.lastEvent] : []),
          ...(newState.gameOver
            ? [
                newState.endingType === "bad"
                  ? "FIN — LA IA TE POSEE"
                  : "FIN — HAS ESCAPADO (¿O NO?)",
              ]
            : []),
        ]);

        return newState;
      });
    }

    setCommand("");
  };
  const glitchStyle = isGlitchActive
    ? {
        backgroundColor: "#1a0000", // Rojo muy oscuro
        opacity: 0.8,
        paddingLeft: 2, // Desfase visual para simular error
      }
    : {};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        {/* Scroll del log */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          {log.map((line, i) => {
            const isWhisper =
              line.includes("Escuchas") ||
              line.includes("IA") ||
              line.includes("susurra");
            return (
              <Text
                key={i}
                style={[
                  styles.text,
                  isWhisper && {
                    color: "#ff4444",
                    fontStyle: "italic",
                    paddingLeft: 10,
                  },
                ]}
              >
                {isWhisper ? `> ${line}` : line}
              </Text>
            );
          })}
          {/* {log.map((line, i) => (
            <Text key={i} style={styles.text}>
              {line}
            </Text>
          ))} */}
        </ScrollView>

        {/* HUD de cordura */}
        <Text style={styles.sanity}>
          {" "}
          Cordura: {state.sanity} | Items:{" "}
          {state.inventory.join(", ") || "ninguno"}
        </Text>

        {state.lastEvent && <Text>{state.lastEvent}</Text>}

        {/* Input */}
        <TextInput
          editable={!state.gameOver}
          style={styles.input}
          value={command}
          onChangeText={setCommand}
          onSubmitEditing={onSubmit}
          placeholder="Escribe una dirección..."
          placeholderTextColor="#555"
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  text: { color: "#0f0", fontSize: 16, marginBottom: 20 },
  input: { borderBottomWidth: 1, borderBottomColor: "#0f0", color: "#0f0" },
  sanity: {
    color: "#ff0033",
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "bold",
    textAlign: "right",
  },
});
