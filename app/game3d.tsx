import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CRTOverlay } from "../components/game/CRTOverlay";
import { SanityBar } from "../components/game/SanityBar";
import { LogMessage } from "../components/game/TerminalLog";
import { ControlPad } from "../components/game3d/ControlPad";
import { DoorPrompt, DoorPromptOption } from "../components/game3d/DoorPrompt";
import { LogPanel } from "../components/game3d/LogPanel";
import { RaycastCanvas } from "../components/game3d/RaycastCanvas";
import {
  forceDoor,
  getRoomDescription,
  investigate,
  move,
  useItem as applyItem,
} from "../engine/engine";
import { initialPlayerState, PlayerState } from "../engine/player";
import { Direction } from "../engine/rooms";
import { forward, opposite, Player3D, spawnPlayer, turn } from "../engine3d/controls";
import { buildScene, DoorCell, RoomScene } from "../engine3d/scene";
import { entitySpriteParams } from "../engine3d/sprite";

const generateId = () => Math.random().toString(36).substr(2, 9);
const DIRECTIONS: Direction[] = ["norte", "sur", "este", "oeste"];

export default function Game3DScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: winW } = useWindowDimensions();

  const [state, setState] = useState<PlayerState>(initialPlayerState);
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [promptVisible, setPromptVisible] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [fading, setFading] = useState(false);

  const scene: RoomScene = useMemo(() => buildScene(state), [state]);
  const [player, setPlayer] = useState<Player3D>(() =>
    spawnPlayer(initialPlayerState.currentRoom, null),
  );

  const canvasH = Math.max(220, Math.round(winW * 0.78));
  const canvasW = Math.round(winW - 20);

  const addLog = useCallback(
    (text: string, type: LogMessage["type"] = "narrative") => {
      setLogs((prev) => [
        ...prev.slice(-49),
        { id: generateId(), text, type },
      ]);
    },
    [],
  );

  useEffect(() => {
    addLog("SISTEMA ONLINE. VÍNCULO NEURAL ESTABLECIDO.", "system");
    addLog(getRoomDescription(initialPlayerState), "narrative");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.gameOver && state.endingType) {
      const t = setTimeout(
        () => router.replace(`/FinalScreen?type=${state.endingType}` as any),
        4500,
      );
      return () => clearTimeout(t);
    }
  }, [state.gameOver, state.endingType, router]);

  useEffect(() => {
    if (state.sanity < 25 && !state.gameOver) {
      const iv = setInterval(() => setGlitch((v) => !v), 150);
      return () => clearInterval(iv);
    }
    setGlitch(false);
  }, [state.sanity, state.gameOver]);

  const spriteParams = useMemo(() => entitySpriteParams(state), [state]);
  const entityDist = spriteParams.visible ? spriteParams.distance : 0;

  const doorOptions: DoorPromptOption[] = useMemo(() => {
    const out: DoorPromptOption[] = [];
    for (const d of DIRECTIONS) {
      const door: DoorCell | undefined = scene.doors[d];
      if (door) {
        out.push({
          key: d,
          direction: d,
          targetRoomId: door.targetRoomId,
          locked: door.locked,
          forceable: door.forceable,
        });
      }
    }
    return out;
  }, [scene]);

  const handleEnterRoom = useCallback(
    (newState: PlayerState, dir: Direction) => {
      setState(newState);
      setPlayer(spawnPlayer(newState.currentRoom, opposite(dir)));
      addLog(getRoomDescription(newState), "narrative");
      setPromptVisible(false);
    },
    [addLog],
  );

  const handleChoose = useCallback(
    (dir: Direction) => {
      const newState = move(state, dir);
      if (newState.currentRoom !== state.currentRoom) {
        setFading(true);
        setTimeout(() => {
          handleEnterRoom(newState, dir);
          if (newState.lastEvent) addLog(newState.lastEvent, "warning");
          setFading(false);
        }, 200);
      } else {
        setPromptVisible(false);
        if (newState.lastEvent) addLog(newState.lastEvent, "system");
      }
    },
    [state, addLog, handleEnterRoom],
  );

  const handleForce = useCallback(
    (dir: Direction) => {
      const newState = forceDoor(state, dir);
      if (newState.currentRoom !== state.currentRoom) {
        handleEnterRoom(newState, dir);
      } else {
        setPromptVisible(false);
      }
      if (newState.lastEvent) {
        addLog(newState.lastEvent, "warning");
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    },
    [state, addLog, handleEnterRoom],
  );

  const handleForward = useCallback(() => {
    const res = forward(player, scene);
    if (res.kind === "move") {
      setPlayer(res.player);
    } else if (res.kind === "door") {
      setPromptVisible(true);
    } else {
      addLog("No puedes ir por ahí.", "system");
    }
  }, [player, scene, addLog]);

  const handleTurn = useCallback((left: boolean) => {
    setPlayer((p) => turn(p, left));
  }, []);

  const handleInvestigate = useCallback(() => {
    const newState = investigate(state);
    setState(newState);
    if (newState.lastEvent) addLog(newState.lastEvent, "narrative");
  }, [state, addLog]);

  const handleLook = useCallback(() => {
    addLog(getRoomDescription(state), "narrative");
  }, [state, addLog]);

  const handleUseSedative = useCallback(() => {
    if (!state.inventory.includes("sedative")) {
      addLog("No tienes sedante.", "system");
      return;
    }
    const newState = applyItem(state, "sedative");
    setState(newState);
    if (newState.lastEvent) addLog(newState.lastEvent, "system");
  }, [state, addLog]);

  return (
    <View style={styles.root}>
      <CRTOverlay
        isGlitchActive={glitch || fading}
        dangerLevel={state.entityAwareness / 100}
        sanity={state.sanity}
      />
      <View
        style={[
          styles.container,
          {
            paddingTop: Math.max(insets.top, 12),
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >
        <View style={styles.header}>
          <SanityBar sanity={state.sanity} />
        </View>

        <View style={[styles.canvasBox, { height: canvasH }]}>
          <RaycastCanvas
            grid={scene.grid}
            player={player}
            entityDist={entityDist}
            sanity={state.sanity}
            width={canvasW}
            height={canvasH}
          />
        </View>

        <LogPanel messages={logs} />

        <ControlPad
          onForward={handleForward}
          onTurn={handleTurn}
          onInvestigate={handleInvestigate}
          onLook={handleLook}
          onUseSedative={handleUseSedative}
          hasSedative={state.inventory.includes("sedative")}
          disabled={state.gameOver || fading}
        />
      </View>

      <DoorPrompt
        visible={promptVisible && !fading}
        doors={doorOptions}
        onChoose={handleChoose}
        onForce={handleForce}
        onClose={() => setPromptVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  container: {
    flex: 1,
    backgroundColor: "#000500",
    paddingHorizontal: 10,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  header: { marginBottom: 8 },
  canvasBox: {
    borderWidth: 1,
    borderColor: "#003300",
    backgroundColor: "#000",
    overflow: "hidden",
  },
});