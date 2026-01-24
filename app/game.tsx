// import { Audio } from "expo-av";
// import * as Haptics from "expo-haptics";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { CRTOverlay } from "../components/game/CRTOverlay";
// import { SanityBar } from "../components/game/SanityBar";
// import { TerminalInput } from "../components/game/TerminalInput";
// import { LogMessage, TerminalLog } from "../components/game/TerminalLog";
// import {
//   forceDoor,
//   getRoomDescription,
//   investigate,
//   move,
// } from "../engine/engine";
// import { initialPlayerState } from "../engine/player";
// import { Direction } from "../engine/rooms";
// const generateId = () => Math.random().toString(36).substr(2, 9);
// const getTimestamp = () => {
//   const now = new Date();
//   return `${now.getHours().toString().padStart(2, "0")}:${now
//     .getMinutes()
//     .toString()
//     .padStart(2, "0")}`;
// };

// export default function GameScreen() {
//   const router = useRouter();

//   const [state, setState] = useState(initialPlayerState);

//   const [logMessages, setLogMessages] = useState<LogMessage[]>([
//     {
//       id: generateId(),
//       text: "SYSTEM ONLINE. NEURAL INTERFACE ESTABLISHED.",
//       type: "system",
//       timestamp: getTimestamp(),
//     },
//     {
//       id: generateId(),
//       text: "[AVISO]: LOS NIVELES DE ESTABILIDAD MENTAL SON NOMINALES (100%).",
//       type: "system",
//       timestamp: getTimestamp(),
//     },
//     {
//       id: generateId(),
//       text: "[ERROR]: PRESENCIA NO AUTORIZADA DETECTADA EN EL SECTOR... BUSCANDO...",
//       type: "error",
//       timestamp: getTimestamp(),
//     },
//     {
//       id: generateId(),
//       text: 'IA: "No deberías haber despertado, Sujeto 00. Pero ya que estás aquí... intenta no ser demasiado predecible."',
//       type: "warning",
//       timestamp: getTimestamp(),
//     },
//     {
//       id: generateId(),
//       text: getRoomDescription(initialPlayerState),
//       type: "narrative",
//       timestamp: getTimestamp(),
//     },
//   ]);

//   const [isGlitchActive, setIsGlitchActive] = useState(false);

//   useEffect(() => {
//     if (state.sanity < 15 && !state.gameOver) {
//       const interval = setInterval(
//         () => {
//           setIsGlitchActive((prev) => !prev);
//         },
//         Math.random() * 200 + 50,
//       );
//       return () => clearInterval(interval);
//     } else {
//       setIsGlitchActive(false);
//     }
//   }, [state.sanity, state.gameOver]);

//   // Handle final redirection
//   useEffect(() => {
//     if (state.gameOver && state.endingType) {
//       // Small delay to let the user read the final message in the terminal
//       setTimeout(() => {
//         router.replace(`/FinalScreen?type=${state.endingType}` as any);
//       }, 3000);
//     }
//   }, [state.gameOver]);

//   useEffect(() => {
//     if (state.sanity <= 0) {
//       setIsGlitchActive(true); // Glitch infinito
//     }
//   }, [state.sanity]);

//   const addLog = (
//     text: string,
//     type: LogMessage["type"] = "narrative",
//     timestamp = getTimestamp(),
//   ) => {
//     setLogMessages((prev) => [
//       ...prev,
//       { id: generateId(), text, type, timestamp },
//     ]);

//     // --- Lógica de Vibración (Haptics) ---
//     if (type === "error") {
//       // Vibración de error (doble pulso fuerte)
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//     } else if (type === "warning") {
//       // Vibración de advertencia
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
//     } else {
//       // Un toque sutil para mensajes normales y narrativa
//       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     }

//     // Lo llamamos sin 'await' para que no bloquee la UI
//     playBeep().catch((err) => console.log("Error de audio:", err));
//   };

//   const playBeep = async () => {
//     const { sound } = await Audio.Sound.createAsync(
//       require("../assets/sounds/beep2.mp3"), // Necesitarás un archivo de sonido corto
//     );
//     await sound.playAsync();
//   };

//   const handleCommandOld = (cmd: string) => {
//     if (state.gameOver) return;

//     addLog(cmd, "player");
//     const lower = cmd.toLowerCase().trim();
//     const args = lower.split(" ");

//     // --- LÓGICA DE LOCURA EXTREMA (Se mantiene igual) ---
//     if (state.sanity <= 0) {
//       const glitched = ["VOID", "ERROR", "0110100", "HELP ME"];
//       addLog(
//         `SISTEMA CRÍTICO: ${glitched[Math.floor(Math.random() * glitched.length)]}`,
//         "error",
//       );
//     }

//     // --- 1. AYUDA ---
//     if (lower === "help" || lower === "ayuda") {
//       addLog(
//         "COMANDOS: NORTH, SOUTH, EAST, WEST, INVESTIGAR, MIRAR, FORZAR [DIR], USAR [ITEM]",
//         "system",
//       );
//       return;
//     }

//     // --- 2. MIRAR (Consolidado) ---
//     if (lower === "look" || lower === "mirar") {
//       // Primero la descripción real
//       addLog(getRoomDescription(state), "narrative");

//       // Intervención de la IA (Solo si hay mucha conciencia/acecho)
//       if (state.entityAwareness > 60) {
//         // Un pequeño retraso para que parezca que la IA "responde" a tu mirada
//         setTimeout(() => {
//           addLog(
//             'IA: "Busca todo lo que quieras. El escenario no va a cambiar por mucho que mires."',
//             "warning",
//           );
//         }, 600);
//       }
//       return;
//     }

//     // --- 3. INVESTIGAR ---
//     if (
//       lower === "investigar" ||
//       lower === "investigate" ||
//       lower === "buscar"
//     ) {
//       setState((prev) => {
//         const newState = investigate(prev);
//         if (newState.lastEvent) {
//           const isThreat =
//             newState.lastEvent.includes("atención") ||
//             newState.lastEvent.includes("ruido");
//           addLog(newState.lastEvent, isThreat ? "warning" : "narrative");
//         }
//         return newState;
//       });
//       return;
//     }

//     // --- 4. FORZAR PUERTA ---
//     if (lower.startsWith("forzar") || lower.startsWith("force")) {
//       const dirInput = args[1] as Direction;
//       if (!["north", "south", "east", "west"].includes(dirInput)) {
//         addLog("SISTEMA: Especifica dirección. Ej: FORZAR NORTH", "error");
//         return;
//       }

//       setState((prev) => {
//         const newState = forceDoor(prev, dirInput);
//         if (newState.currentRoom !== prev.currentRoom) {
//           addLog(getRoomDescription(newState), "narrative");
//           if (newState.lastEvent) addLog(newState.lastEvent, "warning");
//           Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//         } else {
//           addLog(newState.lastEvent || "No hay nada que forzar ahí.", "system");
//         }
//         return newState;
//       });
//       return;
//     }

//     // --- 5. MOVIMIENTO ---
//     if (["north", "south", "east", "west"].includes(lower)) {
//       setState((prev) => {
//         const newState = move(prev, lower as Direction);

//         if (newState.currentRoom !== prev.currentRoom) {
//           // ÉXITO: Mostramos descripción de la nueva sala
//           addLog(getRoomDescription(newState), "narrative");

//           // Eventos de la IA o de la sala (Ej: "Algo sabe a dónde vas")
//           if (newState.lastEvent) {
//             const isWarning =
//               newState.lastEvent.includes("IA") ||
//               newState.lastEvent.includes("sabe");
//             addLog(newState.lastEvent, isWarning ? "warning" : "narrative");
//           }
//         } else {
//           // BLOQUEO: No se movió
//           if (newState.lastEvent?.includes("sellada")) {
//             addLog(newState.lastEvent, "warning");
//             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//           } else {
//             addLog(newState.lastEvent || "No puedes ir por ahí.", "system");
//           }
//         }

//         // GAME OVER
//         if (newState.gameOver) {
//           const finalMsg =
//             newState.endingType === "bad"
//               ? "CRITICAL FAILURE: SUJETO ASIMILADO POR EL NÚCLEO."
//               : "ALERTA: BRECHA DE SEGURIDAD. SUJETO HA ESCAPADO.";
//           addLog(finalMsg, newState.endingType === "bad" ? "error" : "system");
//         }
//         return newState;
//       });
//       return;
//     }

//     // --- 6. USAR ---
//     if (lower.startsWith("usar") || lower.startsWith("use")) {
//       const itemToUse = args[1]; // ej: "sedative" o "sedante"

//       if (!itemToUse) {
//         addLog("SISTEMA: ¿Qué deseas usar? (Ej: USAR SEDANTE)", "error");
//         return;
//       }

//       // Verificamos si el jugador tiene el ítem
//       if (!state.inventory.includes(itemToUse)) {
//         addLog(
//           `No tienes ${itemToUse.toUpperCase()} en tu inventario.`,
//           "system",
//         );
//         return;
//       }

//       if (itemToUse.includes("sedat") || itemToUse.includes("sedan")) {
//         setState((prev) => {
//           // 1. Quitamos el ítem del inventario
//           const newInventory = prev.inventory.filter((i) => i !== itemToUse);

//           // 2. Calculamos la nueva cordura (máximo 100)
//           const restoredSanity = Math.min(100, prev.sanity + 30);

//           // 3. Reducimos la alerta de la IA (le cuesta seguirte bajo sedantes)
//           const reducedAwareness = Math.max(0, prev.entityAwareness - 40);

//           addLog(
//             "Inyectas el sedante. El ruido en tu cabeza cesa momentáneamente. Tu visión se aclara.",
//             "system",
//           );

//           return {
//             ...prev,
//             inventory: newInventory,
//             sanity: restoredSanity,
//             entityAwareness: reducedAwareness,
//             lastEvent:
//               "La presencia de la IA parece desvanecerse en las sombras.",
//           };
//         });
//       } else {
//         addLog(
//           `El sistema no sabe cómo utilizar ${itemToUse.toUpperCase()}.`,
//           "error",
//         );
//       }
//       return;
//     }

//     // COMANDO DESCONOCIDO
//     addLog("ERROR: COMANDO NO RECONOCIDO. ESCRIBE 'HELP'.", "error");
//   };

//   const handleCommand = (cmd: string) => {
//     if (state.gameOver) return;

//     addLog(cmd, "player");
//     const lower = cmd.toLowerCase().trim();
//     const args = lower.split(" ");

//     // --- LÓGICA DE LOCURA EXTREMA (Glitches visuales) ---
//     if (state.sanity <= 20) {
//       const glitched = ["VOID", "ERROR", "0110100", "HELP ME", "TE VEO"];
//       if (Math.random() > 0.7) {
//         addLog(
//           `SISTEMA CRÍTICO: ${glitched[Math.floor(Math.random() * glitched.length)]}`,
//           "error",
//         );
//       }
//     }

//     // --- 1. AYUDA ---
//     if (lower === "help" || lower === "ayuda") {
//       addLog(
//         "COMANDOS: NORTH, SOUTH, EAST, WEST, INVESTIGAR, MIRAR, FORZAR [DIR], USAR [ITEM]",
//         "system",
//       );
//       return;
//     }

//     // --- 2. COMANDO SECRETO: SUDO REVEAL (Consume 15 de cordura) ---
//     if (lower === "sudo reveal") {
//       setState((prev) => {
//         addLog(
//           `[ACCESO NIVEL 0]: IA_LOC: ${prev.entityRoom.toUpperCase()} | AWARENESS: ${prev.entityAwareness}%`,
//           "system",
//         );
//         return { ...prev, sanity: Math.max(0, prev.sanity - 15) };
//       });
//       return;
//     }

//     // --- 3. MIRAR ---
//     if (lower === "look" || lower === "mirar") {
//       addLog(getRoomDescription(state), "narrative");
//       if (state.entityAwareness > 60) {
//         setTimeout(() => {
//           addLog(
//             'IA: "Busca todo lo que quieras. El escenario no va a cambiar por mucho que mires."',
//             "warning",
//           );
//         }, 600);
//       }
//       return;
//     }

//     // --- 4. INVESTIGAR ---
//     if (
//       lower === "investigar" ||
//       lower === "investigate" ||
//       lower === "buscar"
//     ) {
//       setState((prev) => {
//         const newState = investigate(prev);
//         if (newState.lastEvent) {
//           const isWarning =
//             newState.lastEvent.includes("IA") ||
//             newState.lastEvent.includes("ruido") ||
//             newState.lastEvent.includes("atención");
//           addLog(newState.lastEvent, isWarning ? "warning" : "narrative");
//         }
//         return newState;
//       });
//       return;
//     }

//     // --- 5. FORZAR PUERTA ---
//     if (lower.startsWith("forzar") || lower.startsWith("force")) {
//       const dirInput = args[1] as Direction;
//       if (!["north", "south", "east", "west"].includes(dirInput)) {
//         addLog("SISTEMA: Especifica dirección. Ej: FORZAR NORTH", "error");
//         return;
//       }
//       setState((prev) => {
//         const newState = forceDoor(prev, dirInput);
//         if (newState.currentRoom !== prev.currentRoom) {
//           addLog(getRoomDescription(newState), "narrative");
//           if (newState.lastEvent) addLog(newState.lastEvent, "warning");
//         } else {
//           addLog(newState.lastEvent || "No hay nada que forzar ahí.", "system");
//         }
//         return newState;
//       });
//       return;
//     }

//     // --- 6. MOVIMIENTO ---
//     if (["north", "south", "east", "west"].includes(lower)) {
//       setState((prev) => {
//         const newState = move(prev, lower as Direction);

//         if (newState.currentRoom !== prev.currentRoom) {
//           addLog(getRoomDescription(newState), "narrative");
//           if (newState.lastEvent) {
//             const isWarning =
//               newState.lastEvent.includes("IA") ||
//               newState.lastEvent.includes("Sujeto") ||
//               newState.lastEvent.includes("pasos");
//             addLog(newState.lastEvent, isWarning ? "warning" : "narrative");
//           }
//         } else {
//           addLog(newState.lastEvent || "No puedes ir por ahí.", "system");
//         }

//         // MANEJO DE TODOS LOS FINALES
//         if (newState.gameOver) {
//           let finalColor: "system" | "error" | "warning" = "system";

//           if (newState.endingType === "bad") {
//             finalColor = "error";
//           } else if (newState.endingType === "insane") {
//             finalColor = "warning";
//           }

//           // El mensaje de lastEvent ya viene configurado desde move()
//           setTimeout(() => {
//             addLog(
//               "------------------------------------------------",
//               finalColor,
//             );
//             addLog(newState.lastEvent || "FIN DE LA CONEXIÓN", finalColor);
//             addLog(
//               "------------------------------------------------",
//               finalColor,
//             );
//           }, 800);
//         }
//         return newState;
//       });
//       return;
//     }

//     // --- 7. USAR ---
//     if (lower.startsWith("usar") || lower.startsWith("use")) {
//       const itemToUse = args[1];
//       if (!itemToUse) {
//         addLog("SISTEMA: ¿Qué deseas usar? (Ej: USAR SEDANTE)", "error");
//         return;
//       }

//       if (!state.inventory.includes(itemToUse)) {
//         addLog(
//           `No tienes ${itemToUse.toUpperCase()} en tu inventario.`,
//           "system",
//         );
//         return;
//       }

//       if (itemToUse.includes("sedat") || itemToUse.includes("sedan")) {
//         setState((prev) => {
//           const newInventory = prev.inventory.filter((i) => i !== itemToUse);
//           addLog(
//             "Inyectas el sedante. El ruido en tu cabeza cesa momentáneamente. Tu visión se aclara.",
//             "system",
//           );
//           return {
//             ...prev,
//             inventory: newInventory,
//             sanity: Math.min(100, prev.sanity + 30),
//             entityAwareness: Math.max(0, prev.entityAwareness - 40),
//           };
//         });
//       } else {
//         addLog(
//           `El sistema no sabe cómo utilizar ${itemToUse.toUpperCase()}.`,
//           "error",
//         );
//       }
//       return;
//     }

//     addLog("ERROR: COMANDO NO RECONOCIDO. ESCRIBE 'HELP'.", "error");
//   };

//   return (
//     <View style={styles.container}>
//       <CRTOverlay />
//       <SafeAreaView style={styles.safeArea}>
//         <SanityBar sanity={state.sanity} />

//         <View style={styles.terminalContainer}>
//           <TerminalLog messages={logMessages} />
//         </View>

//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           // Aumentamos el offset para que el input no choque con el teclado
//           keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
//           style={{ flex: 1 }}
//         >
//           <TerminalInput onSubmit={handleCommand} editable={!state.gameOver} />
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000500", // Very dark green background
//   },
//   safeArea: {
//     flex: 1,
//     marginHorizontal: 10,
//     marginBottom: 5,
//   },
//   terminalContainer: {
//     flex: 1,
//     borderColor: "#003300",
//     borderWidth: 1,
//     backgroundColor: "rgba(0, 20, 0, 0.5)",
//     marginBottom: 10,
//     paddingBottom: 20,
//   },
// });
import { InventoryHUD } from "@/components/game/inventoryHud";
import { QuickActions } from "@/components/game/quickActions";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react"; // Añadimos useRef
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CRTOverlay } from "../components/game/CRTOverlay";
import { SanityBar } from "../components/game/SanityBar";
import { TerminalInput } from "../components/game/TerminalInput";
import { LogMessage, TerminalLog } from "../components/game/TerminalLog";
import {
  forceDoor,
  getRoomDescription,
  investigate,
  move,
} from "../engine/engine";
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
  const [logMessages, setLogMessages] = useState<LogMessage[]>([]); // Inicializado vacío para llenar en useEffect
  const [isGlitchActive, setIsGlitchActive] = useState(false);

  // REFERENCIA PARA EL SONIDO (Evita fugas de memoria)
  const soundRef = useRef<Audio.Sound | null>(null);

  // 1. Cargar logs iniciales una sola vez
  useEffect(() => {
    setLogMessages([
      {
        id: generateId(),
        text: "SYSTEM ONLINE. NEURAL INTERFACE ESTABLISHED.",
        type: "system",
        timestamp: getTimestamp(),
      },
      {
        id: generateId(),
        text: "[AVISO]: NIVELES DE ESTABILIDAD MENTAL AL 100%.",
        type: "system",
        timestamp: getTimestamp(),
      },
      {
        id: generateId(),
        text: "[ERROR]: PRESENCIA NO AUTORIZADA DETECTADA.",
        type: "error",
        timestamp: getTimestamp(),
      },
      {
        id: generateId(),
        text: 'IA: "No deberías haber despertado, Sujeto 00."',
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
  }, []);

  // 2. Limpieza de Sonido
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // 3. Glitch dinámico por cordura
  useEffect(() => {
    if (state.sanity < 25 && !state.gameOver) {
      const interval = setInterval(
        () => {
          setIsGlitchActive((prev) => !prev);
        },
        Math.random() * 200 + 50,
      );
      return () => clearInterval(interval);
    } else if (state.sanity <= 0) {
      setIsGlitchActive(true);
    } else {
      setIsGlitchActive(false);
    }
  }, [state.sanity, state.gameOver]);

  // 4. Redirección al Final
  useEffect(() => {
    if (state.gameOver && state.endingType) {
      const timer = setTimeout(() => {
        router.replace(`/FinalScreen?type=${state.endingType}` as any);
      }, 4500); // Un poco más de tiempo para asimilar el final
      return () => clearTimeout(timer);
    }
  }, [state.gameOver, state.endingType]);

  const addLog = (text: string, type: LogMessage["type"] = "narrative") => {
    setLogMessages((prev) => [
      ...prev,
      { id: generateId(), text, type, timestamp: getTimestamp() },
    ]);

    if (type === "error")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    else if (type === "warning")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    playBeep();
  };

  const playBeep = async () => {
    try {
      // Si ya hay un sonido cargado, lo reiniciamos
      if (soundRef.current) {
        await soundRef.current.replayAsync();
      } else {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sounds/beep2.mp3"),
        );
        soundRef.current = sound;
        await sound.playAsync();
      }
    } catch (err) {
      console.log("Error de audio:", err);
    }
  };

  const handleCommand = (cmd: string) => {
    if (state.gameOver) return;

    addLog(cmd, "player");
    const lower = cmd.toLowerCase().trim();
    const args = lower.split(" ");

    // --- LÓGICA DE GLITCH EN COMANDOS ---
    if (state.sanity <= 20 && Math.random() > 0.7) {
      const glitched = ["VOID", "ERROR", "0110100", "HELP ME", "TE VEO"];
      addLog(
        `SISTEMA CRÍTICO: ${glitched[Math.floor(Math.random() * glitched.length)]}`,
        "error",
      );
    }

    // --- 1. AYUDA ---
    if (lower === "help" || lower === "ayuda") {
      addLog(
        "COMANDOS: NORTH, SOUTH, EAST, WEST, INVESTIGAR, MIRAR, FORZAR [DIR], USAR [ITEM]",
        "system",
      );
      return;
    }

    // --- 2. SUDO REVEAL ---
    if (lower === "sudo reveal") {
      setState((prev) => {
        const iaLocation = prev.entityRoom
          ? prev.entityRoom.toUpperCase()
          : "DESCONOCIDO";
        addLog(
          `[ACCESO NIVEL 0]: IA_LOC: ${iaLocation} | AWARENESS: ${prev.entityAwareness}%`,
          "system",
        );
        return { ...prev, sanity: Math.max(0, prev.sanity - 15) };
      });
      return;
    }

    // --- 3. MIRAR ---
    if (lower === "look" || lower === "mirar") {
      addLog(getRoomDescription(state), "narrative");
      return;
    }

    // --- 4. INVESTIGAR ---
    if (["investigar", "investigate", "buscar"].includes(lower)) {
      setState((prev) => {
        const newState = investigate(prev);
        if (newState.lastEvent) {
          const isWarning =
            newState.lastEvent.includes("IA") ||
            newState.lastEvent.includes("ruido");
          addLog(newState.lastEvent, isWarning ? "warning" : "narrative");
        }
        return newState;
      });
      return;
    }

    // --- 5. FORZAR ---
    if (lower.startsWith("forzar") || lower.startsWith("force")) {
      const dirInput = args[1] as Direction;
      setState((prev) => {
        const newState = forceDoor(prev, dirInput);
        if (newState.currentRoom !== prev.currentRoom) {
          addLog(getRoomDescription(newState), "narrative");
        }
        addLog(
          newState.lastEvent || "No hay nada que forzar.",
          newState.currentRoom !== prev.currentRoom ? "warning" : "system",
        );
        return newState;
      });
      return;
    }

    // --- 6. MOVIMIENTO ---
    if (["north", "south", "east", "west"].includes(lower)) {
      setState((prev) => {
        const newState = move(prev, lower as Direction);
        if (newState.currentRoom !== prev.currentRoom) {
          addLog(getRoomDescription(newState), "narrative");
          if (newState.lastEvent) addLog(newState.lastEvent, "warning");
        } else {
          addLog(newState.lastEvent || "No puedes ir por ahí.", "system");
        }

        if (newState.gameOver) {
          let finalColor: "system" | "error" | "warning" = "system";
          if (newState.endingType === "bad") finalColor = "error";
          else if (newState.endingType === "insane") finalColor = "warning";

          setTimeout(() => {
            addLog(
              "------------------------------------------------",
              finalColor,
            );
            addLog(newState.lastEvent || "CONEXIÓN PERDIDA", finalColor);
            addLog(
              "------------------------------------------------",
              finalColor,
            );
          }, 800);
        }
        return newState;
      });
      return;
    }

    // --- 7. USAR ---
    if (lower.startsWith("usar") || lower.startsWith("use")) {
      const itemToUse = args[1];
      if (!state.inventory.includes(itemToUse)) {
        addLog(
          `No tienes ${itemToUse?.toUpperCase()} en tu inventario.`,
          "system",
        );
        return;
      }
      if (itemToUse.includes("sedat") || itemToUse.includes("sedan")) {
        setState((prev) => {
          addLog("Inyectas el sedante. Tu visión se aclara.", "system");
          return {
            ...prev,
            inventory: prev.inventory.filter((i) => i !== itemToUse),
            sanity: Math.min(100, prev.sanity + 30),
            entityAwareness: Math.max(0, prev.entityAwareness - 40),
          };
        });
        return;
      }
    }

    addLog("ERROR: COMANDO NO RECONOCIDO.", "error");
  };

  return (
    <View style={styles.container}>
      <CRTOverlay isGlitchActive={isGlitchActive} />
      <SafeAreaView style={styles.safeArea}>
        <SanityBar sanity={state.sanity} />
        <InventoryHUD items={state.inventory} />
        <View style={styles.terminalContainer}>
          <TerminalLog messages={logMessages} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          {/* Las acciones rápidas justo encima del input */}
          <QuickActions onAction={handleCommand} disabled={state.gameOver} />

          <TerminalInput onSubmit={handleCommand} editable={!state.gameOver} />
        </KeyboardAvoidingView>
      </SafeAreaView>
      {/* <SafeAreaView style={styles.safeArea}>
        <SanityBar sanity={state.sanity} />
        <View style={styles.terminalContainer}>
          <TerminalLog messages={logMessages} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
          style={{ flex: 1 }}
        >
          <QuickActions onAction={handleCommand} disabled={state.gameOver} />
          <TerminalInput onSubmit={handleCommand} editable={!state.gameOver} />
        </KeyboardAvoidingView>
      </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000500" },
  safeArea: { flex: 1, marginHorizontal: 10, marginBottom: 5 },
  terminalContainer: {
    flex: 1,
    borderColor: "#003300",
    borderWidth: 1,
    backgroundColor: "rgba(0, 20, 0, 0.5)",
    marginBottom: 10,
    paddingBottom: 20,
  },
});
