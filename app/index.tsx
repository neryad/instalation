import { useRef, useState } from "react";
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

  const [state, setState] = useState(initialPlayerState);
  const [command, setCommand] = useState("");
  const [log, setLog] = useState<string[]>([
    getRoomDescription(initialPlayerState),
  ]);

  const onSubmit = () => {
    const lower = command.toLowerCase();

    if (["north", "south", "east", "west"].includes(lower)) {
      setState((prev) => {
        const newState = move(prev, lower as any);

        // Si no se pudo mover (alucinación o pared)
        if (newState.currentRoom === prev.currentRoom) {
          setLog((l) => [...l, "No hay nada en esa dirección... o eso crees."]);
          return prev;
        }

        setLog((l) => [
          ...l,
          getRoomDescription(newState),
          ...(newState.lastEvent ? [newState.lastEvent] : []),
        ]);

        return newState;
      });
    }

    setCommand("");
  };

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
          {log.map((line, i) => (
            <Text key={i} style={styles.text}>
              {line}
            </Text>
          ))}
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
