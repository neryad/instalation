// import { InventoryHUD } from "@/components/game/inventoryHud";
// import { QuickActions } from "@/components/game/quickActions";
// import { Audio } from "expo-av";
// import * as Haptics from "expo-haptics";
// import { useRouter } from "expo-router";
// import { useEffect, useRef, useState } from "react"; // Añadimos useRef
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

// let soundObject: Audio.Sound | null = null;

// export default function GameScreen() {
//   const router = useRouter();
//   const [state, setState] = useState(initialPlayerState);
//   const [logMessages, setLogMessages] = useState<LogMessage[]>([]); // Inicializado vacío para llenar en useEffect
//   const [isGlitchActive, setIsGlitchActive] = useState(false);

//   // REFERENCIA PARA EL SONIDO (Evita fugas de memoria)
//   const soundRef = useRef<Audio.Sound | null>(null);

//   useEffect(() => {
//     async function setupAudio() {
//       try {
//         // 1. Configurar el modo de audio
//         await Audio.setAudioModeAsync({
//           playsInSilentModeIOS: true,
//           staysActiveInBackground: false,
//         });

//         // 2. Cargar y reproducir
//         const { sound } = await Audio.Sound.createAsync(
//           require("../assets/sounds/Recursive_Error_State.mp3"), // Asegúrate de que la ruta sea correcta
//           { isLooping: true, volume: 0.4 }, // Volumen bajo para que no canse
//         );

//         soundObject = sound;
//         await soundObject.playAsync();
//       } catch (error) {
//         console.log("Error cargando audio:", error);
//       }
//     }

//     setupAudio();

//     // Limpieza al salir del juego
//     return () => {
//       if (soundObject) {
//         soundObject.stopAsync();
//         soundObject.unloadAsync();
//       }
//     };
//   }, []);

//   // 1. Cargar logs iniciales una sola vez
//   useEffect(() => {
//     setLogMessages([
//       {
//         id: generateId(),
//         text: "SYSTEM ONLINE. NEURAL INTERFACE ESTABLISHED.",
//         type: "system",
//         timestamp: getTimestamp(),
//       },
//       {
//         id: generateId(),
//         text: "[AVISO]: NIVELES DE ESTABILIDAD MENTAL AL 100%.",
//         type: "system",
//         timestamp: getTimestamp(),
//       },
//       {
//         id: generateId(),
//         text: "[ERROR]: PRESENCIA NO AUTORIZADA DETECTADA.",
//         type: "error",
//         timestamp: getTimestamp(),
//       },
//       {
//         id: generateId(),
//         text: 'IA: "No deberías haber despertado, Sujeto 00."',
//         type: "warning",
//         timestamp: getTimestamp(),
//       },
//       {
//         id: generateId(),
//         text: getRoomDescription(initialPlayerState),
//         type: "narrative",
//         timestamp: getTimestamp(),
//       },
//     ]);
//   }, []);

//   // 2. Limpieza de Sonido
//   useEffect(() => {
//     return () => {
//       if (soundRef.current) {
//         soundRef.current.unloadAsync();
//       }
//     };
//   }, []);

//   // 3. Glitch dinámico por cordura
//   useEffect(() => {
//     if (state.sanity < 25 && !state.gameOver) {
//       const interval = setInterval(
//         () => {
//           setIsGlitchActive((prev) => !prev);
//         },
//         Math.random() * 200 + 50,
//       );
//       return () => clearInterval(interval);
//     } else if (state.sanity <= 0) {
//       setIsGlitchActive(true);
//     } else {
//       setIsGlitchActive(false);
//     }
//   }, [state.sanity, state.gameOver]);

//   // 4. Redirección al Final
//   useEffect(() => {
//     if (state.gameOver && state.endingType) {
//       const timer = setTimeout(() => {
//         router.replace(`/FinalScreen?type=${state.endingType}` as any);
//       }, 4500); // Un poco más de tiempo para asimilar el final
//       return () => clearTimeout(timer);
//     }
//   }, [state.gameOver, state.endingType]);

//   const addLog = (text: string, type: LogMessage["type"] = "narrative") => {
//     setLogMessages((prev) => [
//       ...prev,
//       { id: generateId(), text, type, timestamp: getTimestamp() },
//     ]);

//     if (type === "error")
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//     else if (type === "warning")
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
//     else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

//     playBeep();
//   };

//   const playBeep = async () => {
//     try {
//       // Si ya hay un sonido cargado, lo reiniciamos
//       if (soundRef.current) {
//         await soundRef.current.replayAsync();
//       } else {
//         const { sound } = await Audio.Sound.createAsync(
//           require("../assets/sounds/beep2.mp3"),
//         );
//         soundRef.current = sound;
//         await sound.playAsync();
//       }
//     } catch (err) {
//       console.log("Error de audio:", err);
//     }
//   };

//   const handleCommand = (cmd: string) => {
//     if (state.gameOver) return;

//     addLog(cmd, "player");
//     const lower = cmd.toLowerCase().trim();
//     const args = lower.split(" ");

//     // --- LÓGICA DE GLITCH EN COMANDOS ---
//     if (state.sanity <= 20 && Math.random() > 0.7) {
//       const glitched = ["VOID", "ERROR", "0110100", "HELP ME", "TE VEO"];
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

//     // --- 2. SUDO REVEAL ---
//     if (lower === "sudo reveal") {
//       setState((prev) => {
//         const iaLocation = prev.entityRoom
//           ? prev.entityRoom.toUpperCase()
//           : "DESCONOCIDO";
//         addLog(
//           `[ACCESO NIVEL 0]: IA_LOC: ${iaLocation} | AWARENESS: ${prev.entityAwareness}%`,
//           "system",
//         );
//         return { ...prev, sanity: Math.max(0, prev.sanity - 15) };
//       });
//       return;
//     }

//     // --- 3. MIRAR ---
//     if (lower === "look" || lower === "mirar") {
//       addLog(getRoomDescription(state), "narrative");
//       return;
//     }

//     // --- 4. INVESTIGAR ---
//     if (["investigar", "investigate", "buscar"].includes(lower)) {
//       setState((prev) => {
//         const newState = investigate(prev);
//         if (newState.lastEvent) {
//           const isWarning =
//             newState.lastEvent.includes("IA") ||
//             newState.lastEvent.includes("ruido");
//           addLog(newState.lastEvent, isWarning ? "warning" : "narrative");
//         }
//         return newState;
//       });
//       return;
//     }

//     // --- 5. FORZAR ---
//     if (lower.startsWith("forzar") || lower.startsWith("force")) {
//       const dirInput = args[1] as Direction;
//       setState((prev) => {
//         const newState = forceDoor(prev, dirInput);
//         if (newState.currentRoom !== prev.currentRoom) {
//           addLog(getRoomDescription(newState), "narrative");
//         }
//         addLog(
//           newState.lastEvent || "No hay nada que forzar.",
//           newState.currentRoom !== prev.currentRoom ? "warning" : "system",
//         );
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
//           if (newState.lastEvent) addLog(newState.lastEvent, "warning");
//         } else {
//           addLog(newState.lastEvent || "No puedes ir por ahí.", "system");
//         }

//         if (newState.gameOver) {
//           let finalColor: "system" | "error" | "warning" = "system";
//           if (newState.endingType === "bad") finalColor = "error";
//           else if (newState.endingType === "insane") finalColor = "warning";

//           setTimeout(() => {
//             addLog(
//               "------------------------------------------------",
//               finalColor,
//             );
//             addLog(newState.lastEvent || "CONEXIÓN PERDIDA", finalColor);
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
//       if (!state.inventory.includes(itemToUse)) {
//         addLog(
//           `No tienes ${itemToUse?.toUpperCase()} en tu inventario.`,
//           "system",
//         );
//         return;
//       }
//       if (itemToUse.includes("sedat") || itemToUse.includes("sedan")) {
//         setState((prev) => {
//           addLog("Inyectas el sedante. Tu visión se aclara.", "system");
//           return {
//             ...prev,
//             inventory: prev.inventory.filter((i) => i !== itemToUse),
//             sanity: Math.min(100, prev.sanity + 30),
//             entityAwareness: Math.max(0, prev.entityAwareness - 40),
//           };
//         });
//         return;
//       }
//     }

//     addLog("ERROR: COMANDO NO RECONOCIDO.", "error");
//   };

//   return (
//     <View style={styles.container}>
//       <CRTOverlay isGlitchActive={isGlitchActive} />
//       <SafeAreaView style={styles.safeArea}>
//         <SanityBar sanity={state.sanity} />
//         <InventoryHUD items={state.inventory} />
//         <View style={styles.terminalContainer}>
//           <TerminalLog messages={logMessages} />
//         </View>

//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
//         >
//           {/* Las acciones rápidas justo encima del input */}
//           <QuickActions onAction={handleCommand} disabled={state.gameOver} />

//           <TerminalInput onSubmit={handleCommand} editable={!state.gameOver} />
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000500" },
//   safeArea: { flex: 1, marginHorizontal: 10, marginBottom: 5 },
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
import { getSettings } from "@/storage/settings";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CRTOverlay } from "../components/game/CRTOverlay";
import { SanityBar } from "../components/game/SanityBar";
import { LogMessage, TerminalLog } from "../components/game/TerminalLog";
import {
  forceDoor,
  getForceableDirections,
  getRoomDescription,
  investigate,
  move,
} from "../engine/engine";
import { initialPlayerState } from "../engine/player";
import { Direction } from "../engine/rooms";

const generateId = () => Math.random().toString(36).substr(2, 9);
const getTimestamp = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
};

export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [state, setState] = useState(initialPlayerState);
  const [logMessages, setLogMessages] = useState<LogMessage[]>([]);
  const [isGlitchActive, setIsGlitchActive] = useState(false);
  const [settings, setSettings] = useState({ soundEnabled: true });

  const backgroundMusic = useRef<Audio.Sound | null>(null);
  const sfxBeep = useRef<Audio.Sound | null>(null);
  const sfxMove = useRef<Audio.Sound | null>(null);
  const sfxSedative = useRef<Audio.Sound | null>(null);
  const sfxIA = useRef<Audio.Sound | null>(null);
  const sfxForce = useRef<Audio.Sound | null>(null);

  // 1. GESTIÓN DE AUDIO (Ambiente y SFX)
  useEffect(() => {
    async function loadAudio() {
      const s = await getSettings();
      setSettings(s);

      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

        // Música de fondo (Si está activada)
        if (s.soundEnabled) {
          const { sound: music } = await Audio.Sound.createAsync(
            require("../assets/sounds/Recursive_Error_State.mp3"),
            { isLooping: true, volume: 0.3 },
          );
          backgroundMusic.current = music;
          await music.playAsync();
        }

        // Sonido de Beep para la terminal
        const { sound: beep } = await Audio.Sound.createAsync(
          require("../assets/sounds/beep2.mp3"),
        );
        sfxBeep.current = beep;

        // Nuevos SFX
        const { sound: moveSfx } = await Audio.Sound.createAsync(require("../assets/sounds/Heavy_hydraulic_sci.mp3"));
        sfxMove.current = moveSfx;

        const { sound: sedSfx } = await Audio.Sound.createAsync(require("../assets/sounds/Pneumatic_medical_in.mp3"));
        sfxSedative.current = sedSfx;

        const { sound: iaSfx } = await Audio.Sound.createAsync(require("../assets/sounds/Deep_modulated_digit.mp3"));
        sfxIA.current = iaSfx;

        const { sound: forceSfx } = await Audio.Sound.createAsync(require("../assets/sounds/Heavy_metal_door_being_force.mp3"));
        sfxForce.current = forceSfx;

      } catch (e) {
        console.log("Error Audio:", e);
      }
    }
    loadAudio();
    return () => {
      backgroundMusic.current?.unloadAsync();
      sfxBeep.current?.unloadAsync();
      sfxMove.current?.unloadAsync();
      sfxSedative.current?.unloadAsync();
      sfxIA.current?.unloadAsync();
      sfxForce.current?.unloadAsync();
    };
  }, []);

  // 2. INICIO DE PARTIDA
  useEffect(() => {
    addLog("SISTEMA ONLINE. VÍNCULO NEURAL ESTABLECIDO.", "system");
    addLog(getRoomDescription(initialPlayerState), "narrative");
  }, []);

  // 3. EFECTOS DE CORDURA Y FINALES
  useEffect(() => {
    // Glitch visual si la cordura es baja
    if (state.sanity < 25 && !state.gameOver) {
      const interval = setInterval(() => setIsGlitchActive((v) => !v), 150);
      return () => clearInterval(interval);
    }

    // Verificación de muerte/victoria (Ahora gestiona 4 finales)
    if (state.gameOver && state.endingType) {
      router.replace(`/FinalScreen?type=${state.endingType}` as any);
    }
  }, [state.sanity, state.gameOver, state.endingType]);

  // 4. EFECTO DE LATIDO (Haptics)
  useEffect(() => {
    if (state.sanity < 15 && !state.gameOver) {
      const interval = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setTimeout(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }, 100);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [state.sanity, state.gameOver]);

  const addLog = (text: string, type: LogMessage["type"] = "narrative") => {
    setLogMessages((prev) => {
        const next = [...prev, { id: generateId(), text, type, timestamp: getTimestamp() }];
        return next.length > 50 ? next.slice(next.length - 50) : next;
    });

    // Feedback táctico y sonoro
    if (type === "error")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (settings.soundEnabled) {
      sfxBeep.current?.replayAsync().catch(() => {});
    }
  };

  const handleCommand = (cmd: string) => {
    if (state.gameOver) return;
    const lower = cmd.toLowerCase().trim();
    const args = lower.split(" ");
    addLog(cmd, "player");

    // MECÁNICA DE CORRUPCIÓN DE TEXTO
    if (state.sanity <= 20 && Math.random() > 0.8) {
      addLog("SISTEMA: ERROR DE MEMORIA. ARCHIVO CORRUPTO.", "error");
    }

    let newState = { ...state };

    if (["north", "south", "east", "west"].includes(lower)) {
      newState = move(state, lower as Direction);
      if (newState.currentRoom !== state.currentRoom && settings.soundEnabled) {
        sfxMove.current?.replayAsync().catch(() => {});
      }
    } else if (["investigar", "buscar"].includes(lower)) {
      newState = investigate(state);
    } else if (lower.startsWith("forzar")) {
      newState = forceDoor(state, args[1] as Direction);
      if (newState.currentRoom !== state.currentRoom && settings.soundEnabled) {
        sfxForce.current?.replayAsync().catch(() => {});
      }
    } else if (lower === "mirar" || lower === "look") {
      addLog(getRoomDescription(state), "narrative");
      return;
    } else if (lower.startsWith("usar")) {
      if (args[1]?.includes("sedan") && state.inventory.includes("sedative")) {
        newState = {
          ...state,
          inventory: state.inventory.filter((i) => i !== "sedative"),
          sanity: Math.min(100, state.sanity + 30),
          entityAwareness: Math.max(0, state.entityAwareness - 20),
        };
        addLog("Inyectas el sedante. Tu mente se estabiliza.", "system");
        if (settings.soundEnabled) {
          sfxSedative.current?.replayAsync().catch(() => {});
        }
      }
    } else {
      addLog("COMANDO NO RECONOCIDO.", "error");
      return;
    }

    setState(newState);
    if (newState.lastEvent) addLog(newState.lastEvent, "warning");
    if (newState.currentRoom !== state.currentRoom) {
      addLog(getRoomDescription(newState), "narrative");
    }

    // DISPARAR SUSURRO IA (Si awareness > 70)
    if (newState.entityAwareness > 70 && Math.random() > 0.6 && settings.soundEnabled) {
      sfxIA.current?.replayAsync().catch(() => {});
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
        },
      ]}
    >
      <CRTOverlay 
        isGlitchActive={isGlitchActive} 
        dangerLevel={state.entityAwareness / 100}
      />

      {/* HUD Superior */}
      <View style={styles.header}>
        <SanityBar sanity={state.sanity} />
        <InventoryHUD items={state.inventory} />
      </View>

      {/* TERMINAL: Ahora ocupa todo el centro */}
      <View style={styles.terminalContainer}>
        <TerminalLog messages={logMessages} />
      </View>

      {/* ACCIONES: Solo botones, sin input */}
      <View style={styles.controlsContainer}>
        <QuickActions
          onAction={handleCommand}
          disabled={state.gameOver}
          hasSedative={state.inventory.includes("sedative")}
          forceableDirections={getForceableDirections(state)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //container: { flex: 1, backgroundColor: "#000500" },
  safeArea: { flex: 1, marginHorizontal: 10 },
  // terminalContainer: {
  //   flex: 1,
  //   borderColor: "#003300",
  //   borderWidth: 1,
  //   backgroundColor: "rgba(0, 15, 0, 0.3)",
  //   marginVertical: 10,
  // },

  container: {
    flex: 1,
    backgroundColor: "#000500",
    paddingHorizontal: 15, // Un poco de aire a los lados
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    marginBottom: 10,
  },
  // terminalContainer: {
  //   flex: 1,
  //   borderColor: "#003300",
  //   borderWidth: 1,
  //   backgroundColor: "rgba(0, 15, 0, 0.3)",
  //   marginBottom: 10,
  // },
  terminalContainer: {
    flex: 1, // Se expande para llenar el hueco
    borderColor: "#003300",
    borderWidth: 1,
    backgroundColor: "rgba(0, 15, 0, 0.3)",
    marginBottom: 15,
  },
  controlsContainer: {
    paddingBottom: 10,
    // Aquí podrías añadir un fondo sutil para los botones
  },
});
