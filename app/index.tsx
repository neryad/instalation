import { aiWhisper } from "@/engine/events";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { getRoomDescription, move } from "../engine/engine";
import { initialPlayerState } from "../engine/player";

export default function GameScreen() {
  const [state, setState] = useState(initialPlayerState);
  const [command, setCommand] = useState("");
  const [log, setLog] = useState<string[]>([
    getRoomDescription(initialPlayerState),
  ]);

  const onSubmit = () => {
    const lower = command.toLowerCase();

    if (["north", "south", "east", "west"].includes(lower)) {
      setState((prev) => {
        let newState = move(prev, lower as any);

        // Evento: si entras al pasillo por primera vez
        if (
          newState.currentRoom === "hallway_a" &&
          prev.currentRoom !== "hallway_a"
        ) {
          const event = aiWhisper(newState);
          newState = event.newState;
          setLog((l) => [...l, event.text]);
        }

        setLog((l) => [...l, getRoomDescription(newState)]);
        return newState;
      });
    }

    setCommand("");
  };
  return (
    <SafeAreaView style={styles.container}>
      {log.map((line, i) => (
        <Text key={i} style={styles.text}>
          {line}
        </Text>
      ))}
      <Text style={{ color: "#f00" }}>Cordura: {state.sanity}%</Text>

      <TextInput
        style={styles.input}
        value={command}
        onChangeText={setCommand}
        onSubmitEditing={onSubmit}
        placeholder="Escribe una dirección..."
        placeholderTextColor="#555"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  text: { color: "#0f0", fontSize: 16, marginBottom: 20 },
  input: { borderBottomWidth: 1, borderBottomColor: "#0f0", color: "#0f0" },
});
