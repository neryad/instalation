import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CRTOverlay } from "../components/game/CRTOverlay";
import { SanityBar } from "../components/game/SanityBar";
import { TerminalInput } from "../components/game/TerminalInput";
import { LogMessage, TerminalLog } from "../components/game/TerminalLog";
import { getRoomDescription, move } from "../engine/engine";
import { initialPlayerState } from "../engine/player";
import { Direction } from "../engine/rooms";

const generateId = () => Math.random().toString(36).substr(2, 9);
const getTimestamp = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

export default function GameScreen() {
  const router = useRouter();

  const [state, setState] = useState(initialPlayerState);

  const [logMessages, setLogMessages] = useState<LogMessage[]>([
    {
      id: generateId(),
      text: "SYSTEM ONLINE. NEURAL INTERFACE CONNECTED.",
      type: "system",
      timestamp: getTimestamp(),
    },
    {
      id: generateId(),
      text: getRoomDescription(initialPlayerState),
      type: "narrative",
      timestamp: getTimestamp(),
    },
  ]);

  const [isGlitchActive, setIsGlitchActive] = useState(false);

  useEffect(() => {
    if (state.sanity < 15 && !state.gameOver) {
      const interval = setInterval(
        () => {
          setIsGlitchActive((prev) => !prev);
        },
        Math.random() * 200 + 50
      );
      return () => clearInterval(interval);
    } else {
      setIsGlitchActive(false);
    }
  }, [state.sanity, state.gameOver]);

  // Handle final redirection
  useEffect(() => {
    if (state.gameOver && state.endingType) {
      // Small delay to let the user read the final message in the terminal
      setTimeout(() => {
        router.replace(`/FinalScreen?type=${state.endingType}` as any);
      }, 3000);
    }
  }, [state.gameOver]);

  const addLog = (
    text: string,
    type: LogMessage["type"] = "narrative",
    timestamp = getTimestamp()
  ) => {
    setLogMessages((prev) => [
      ...prev,
      { id: generateId(), text, type, timestamp },
    ]);
  };

  const handleCommand = (cmd: string) => {
    if (state.gameOver) return;

    // Log user input
    addLog(cmd, "player");

    const lower = cmd.toLowerCase();
    
    // Movement
    if (["north", "south", "east", "west"].includes(lower)) {
      setState((prev) => {
        const newState = move(prev, lower as Direction);

        // Room description
        addLog(getRoomDescription(newState), "narrative");

        // Events
        if (newState.lastEvent) {
            // Check if event is critical/warning
            const isWarning = newState.lastEvent.includes("IA") || newState.lastEvent.includes("presencia");
            addLog(newState.lastEvent, isWarning ? "warning" : "narrative");
        }

        // Game Over messages
        if (newState.gameOver) {
            const finalMsg = newState.endingType === "bad"
            ? "CRITICAL FAILURE. SUBJECT INTEGRATION COMPLETE."
            : "CONNECTION LOST. SUBJECT HAS LEFT THE PERIMETER.";
            addLog(finalMsg, newState.endingType === "bad" ? "error" : "system");
        }

        return newState;
      });
      return;
    }

    // Interactive commands (look, help, etc) could go here
    if (lower === "help") {
        addLog("AVAILABLE COMMANDS: NORTH, SOUTH, EAST, WEST, HELP", "system");
        return;
    }

    addLog("COMMAND NOT RECOGNIZED", "error");
  };

  return (
    <View style={styles.container}>
      <CRTOverlay />
      <SafeAreaView style={styles.safeArea}>
        <SanityBar sanity={state.sanity} />
        
        <View style={styles.terminalContainer}>
            <TerminalLog messages={logMessages} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          <TerminalInput onSubmit={handleCommand} editable={!state.gameOver} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000500", // Very dark green background
  },
  safeArea: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  terminalContainer: {
    flex: 1,
    borderColor: "#003300",
    borderWidth: 1,
    backgroundColor: "rgba(0, 20, 0, 0.5)",
    marginBottom: 10,
  }
});
