import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CRTOverlay } from "../components/game/CRTOverlay";
import { SanityBar } from "../components/game/SanityBar";
import { TerminalInput } from "../components/game/TerminalInput";
import { LogMessage, TerminalLog } from "../components/game/TerminalLog";
import { getRoomDescription, investigate, move } from "../engine/engine";
import { initialPlayerState } from "../engine/player";
import { Direction } from "../engine/rooms";
const generateId = () => Math.random().toString(36).substr(2, 9);
const getTimestamp = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

export default function GameScreen() {
  const router = useRouter();

  const [state, setState] = useState(initialPlayerState);

  const [logMessages, setLogMessages] = useState<LogMessage[]>([
    // {
    //   id: generateId(),
    //   text: "SYSTEM ONLINE. NEURAL INTERFACE CONNECTED.",
    //   type: "system",
    //   timestamp: getTimestamp(),
    // },
    // {
    //   id: generateId(),
    //   text: getRoomDescription(initialPlayerState),
    //   type: "narrative",
    //   timestamp: getTimestamp(),
    // },
    {
      id: generateId(),
      text: "SYSTEM ONLINE. NEURAL INTERFACE ESTABLISHED.",
      type: "system",
      timestamp: getTimestamp(),
    },
    {
      id: generateId(),
      text: "[AVISO]: LOS NIVELES DE ESTABILIDAD MENTAL SON NOMINALES (100%).",
      type: "system",
      timestamp: getTimestamp(),
    },
    {
      id: generateId(),
      text: "[ERROR]: PRESENCIA NO AUTORIZADA DETECTADA EN EL SECTOR... BUSCANDO...",
      type: "error",
      timestamp: getTimestamp(),
    },
    {
      id: generateId(),
      text: 'IA: "No deberías haber despertado, Sujeto 00. Pero ya que estás aquí... intenta no ser demasiado predecible."',
      type: "warning",
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
        Math.random() * 200 + 50,
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

  useEffect(() => {
    if (state.sanity <= 0) {
      setIsGlitchActive(true); // Glitch infinito
    }
  }, [state.sanity]);

  const addLog = (
    text: string,
    type: LogMessage["type"] = "narrative",
    timestamp = getTimestamp(),
  ) => {
    setLogMessages((prev) => [
      ...prev,
      { id: generateId(), text, type, timestamp },
    ]);

    // --- Lógica de Vibración (Haptics) ---
    if (type === "error") {
      // Vibración de error (doble pulso fuerte)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else if (type === "warning") {
      // Vibración de advertencia
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else {
      // Un toque sutil para mensajes normales y narrativa
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Lo llamamos sin 'await' para que no bloquee la UI
    playBeep().catch((err) => console.log("Error de audio:", err));
  };

  const playBeep = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/beep2.mp3"), // Necesitarás un archivo de sonido corto
    );
    await sound.playAsync();
  };

  const handleCommand = (cmd: string) => {
    if (state.gameOver) return;

    addLog(cmd, "player");
    const lower = cmd.toLowerCase().trim();

    if (state.sanity === 0) {
      const glitchedCommands = ["NORTH", "ERROR", "VOID", "HELP ME", "0110100"];
      const randomCmd =
        glitchedCommands[Math.floor(Math.random() * glitchedCommands.length)];
      addLog(`SISTEMA CRÍTICO: Ejecutando... ${randomCmd}`, "error");
      // La IA lo mueve a una sala aleatoria en lugar de a donde él quería
    }

    // --- 1. COMANDO AYUDA ---
    if (lower === "help" || lower === "ayuda") {
      addLog(
        "COMANDOS: NORTH, SOUTH, EAST, WEST, INVESTIGAR, MIRAR, HELP",
        "system",
      );
      return;
    }

    // --- 2. COMANDO MIRAR (LOOK) ---
    if (lower === "look" || lower === "mirar") {
      // Refrescamos la descripción (esto activará los "ecos" y "zumbidos" de la IA)
      addLog(getRoomDescription(state), "narrative");
      return;
    }

    // --- 3. COMANDO INVESTIGAR ---
    if (
      lower === "investigar" ||
      lower === "investigate" ||
      lower === "buscar"
    ) {
      setState((prev) => {
        const newState = investigate(prev);

        if (newState.lastEvent) {
          // Si el evento menciona ruido o a la IA, usamos tipo 'warning'
          const isThreat =
            newState.lastEvent.includes("ruido") ||
            newState.lastEvent.includes("atención");
          addLog(newState.lastEvent, isThreat ? "warning" : "narrative");
        }
        return newState;
      });
      return;
    }

    // --- 4. MOVIMIENTO ---
    if (["north", "south", "east", "west"].includes(lower)) {
      setState((prev) => {
        const newState = move(prev, lower as Direction);

        // Descripción de la nueva sala (ya viene distorsionada por el engine)
        addLog(getRoomDescription(newState), "narrative");

        // Eventos especiales (Dejà-vu, IA cerca, bloqueos)
        if (newState.lastEvent) {
          const isWarning =
            newState.lastEvent.includes("IA") ||
            newState.lastEvent.includes("sabe") ||
            newState.lastEvent.includes("presencia");
          addLog(newState.lastEvent, isWarning ? "warning" : "narrative");
        }

        // Game Over dinámico
        if (newState.gameOver) {
          if (newState.endingType === "bad") {
            addLog(
              "CRITICAL FAILURE: SUJETO ASIMILADO POR EL NÚCLEO.",
              "error",
            );
          } else {
            addLog(
              "ALERTA: BRECHA DE SEGURIDAD. SUJETO HA ESCAPADO.",
              "system",
            );
          }
        }

        return newState;
      });
      return;
    }

    // Si el comando no existe
    addLog("ERROR: COMANDO DESCONOCIDO. ESCRIBE 'HELP'.", "error");
  };

  // const handleCommand = (cmd: string) => {
  //   if (state.gameOver) return;

  //   // Log user input
  //   addLog(cmd, "player");

  //   const lower = cmd.toLowerCase();

  //   // Movement
  //   if (["north", "south", "east", "west"].includes(lower)) {
  //     setState((prev) => {
  //       const newState = move(prev, lower as Direction);

  //       // Room description
  //       addLog(getRoomDescription(newState), "narrative");

  //       // Events
  //       if (newState.lastEvent) {
  //           // Check if event is critical/warning
  //           const isWarning = newState.lastEvent.includes("IA") || newState.lastEvent.includes("presencia");
  //           addLog(newState.lastEvent, isWarning ? "warning" : "narrative");
  //       }

  //       // Game Over messages
  //       if (newState.gameOver) {
  //           const finalMsg = newState.endingType === "bad"
  //           ? "CRITICAL FAILURE. SUBJECT INTEGRATION COMPLETE."
  //           : "CONNECTION LOST. SUBJECT HAS LEFT THE PERIMETER.";
  //           addLog(finalMsg, newState.endingType === "bad" ? "error" : "system");
  //       }

  //       return newState;
  //     });
  //     return;
  //   }

  //   // Interactive commands (look, help, etc) could go here
  //   if (lower === "help") {
  //       addLog("AVAILABLE COMMANDS: NORTH, SOUTH, EAST, WEST, HELP", "system");
  //       return;
  //   }

  //   addLog("COMMAND NOT RECOGNIZED", "error");
  // };

  return (
    <View style={styles.container}>
      <CRTOverlay />
      <SafeAreaView style={styles.safeArea}>
        <SanityBar sanity={state.sanity} />

        <View style={styles.terminalContainer}>
          <TerminalLog messages={logMessages} />
        </View>

        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
          
        > */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // Aumentamos el offset para que el input no choque con el teclado
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
          style={{ flex: 1 }}
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
    paddingBottom: 20,
  },
});
