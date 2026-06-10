import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { ROOM_LABELS, ROOM_POSITIONS } from "../../constants/roomPositions";
import { Direction, rooms } from "../../engine/rooms";

interface MapModalProps {
  visible: boolean;
  onClose: () => void;
  visitedRooms: string[];
  currentRoom: string;
  inventory: string[];
  entityRoom?: string;
  roomHistory: string[];
  collectedItems: string[];
}

export function MapModal({
  visible,
  onClose,
  visitedRooms,
  currentRoom,
  inventory,
  entityRoom,
  roomHistory,
  collectedItems,
}: MapModalProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseRed = useRef(new Animated.Value(1)).current;
  const { width: screenW, height: screenH } = useWindowDimensions();

  useEffect(() => {
    if (visible) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseRed, { toValue: 0.2, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseRed, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }
  }, [visible, pulseRed]);

  useEffect(() => {
    if (visible) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }
  }, [visible, pulseAnim]);

  // --- Compute locked adjacent rooms first ---
  const lockedAdjacent: {
    roomId: string;
    keyNeeded: string;
    connectedVia: string;
  }[] = [];
  const seenLocked = new Set<string>();

  for (const roomId of visitedRooms) {
    const room = rooms[roomId];
    if (!room) continue;
    for (const dir of Object.keys(room.connections) as Direction[]) {
      const targetId = room.connections[dir];
      if (!targetId || visitedRooms.includes(targetId)) continue;
      const targetRoom = rooms[targetId];
      if (targetRoom?.lockedBy && !seenLocked.has(targetId)) {
        seenLocked.add(targetId);
        lockedAdjacent.push({
          roomId: targetId,
          keyNeeded: targetRoom.lockedBy,
          connectedVia: roomId,
        });
      }
    }
  }

  // --- Rooms with items still available ---
  const roomsWithItems = visitedRooms.filter((id) => {
    const room = rooms[id];
    return room?.item && !collectedItems.includes(room.item) && id !== currentRoom;
  });

  // --- Trail (last 4 rooms from history excluding current) ---
  const trailRooms = roomHistory
    .filter((id) => id !== currentRoom)
    .slice(-4);

  // --- IA location ---
  const showIA = entityRoom && visitedRooms.includes(entityRoom);

  // --- Compute bounds including locked rooms ---
  const visitedPositions = visitedRooms
    .map((id) => ROOM_POSITIONS[id])
    .filter(Boolean);

  const lockedPositions = lockedAdjacent
    .map((e) => ROOM_POSITIONS[e.roomId])
    .filter(Boolean);

  const allPositions = [...visitedPositions, ...lockedPositions];
  if (allPositions.length === 0) return null;

  const minX = Math.min(...allPositions.map((p) => p.x));
  const maxX = Math.max(...allPositions.map((p) => p.x));
  const minY = Math.min(...allPositions.map((p) => p.y));
  const maxY = Math.max(...allPositions.map((p) => p.y));

  const gridW = maxX - minX + 1;
  const gridH = maxY - minY + 1;

  const padX = 30;
  const padY = 20;
  const availW = screenW - padX * 2;
  const availH = screenH - 120 - padY * 2;
  const unitByW = Math.floor(availW / gridW);
  const unitByH = Math.floor(availH / gridH);
  const UNIT = Math.min(unitByW, unitByH, 90);
  const NODE_W = Math.min(UNIT * 1.2, 110);

  const toCenter = (x: number, y: number) => ({
    x: (x - minX) * UNIT + UNIT / 2,
    y: (y - minY) * UNIT + UNIT / 2,
  });

  // --- Draw visited connection lines ---
  const connectionLines: {
    from: { x: number; y: number };
    to: { x: number; y: number };
    locked?: boolean;
    hasKey?: boolean;
  }[] = [];
  const drawn = new Set<string>();

  for (const roomId of visitedRooms) {
    const room = rooms[roomId];
    if (!room) continue;
    const fromPos = ROOM_POSITIONS[roomId];
    if (!fromPos) continue;

    for (const dir of Object.keys(room.connections) as Direction[]) {
      const targetId = room.connections[dir];
      if (!targetId) continue;

      // Draw dim line to locked rooms
      if (!visitedRooms.includes(targetId)) {
        const toPos = ROOM_POSITIONS[targetId];
        if (!toPos) continue;
        const isLocked = rooms[targetId]?.lockedBy;
        const hasKey = isLocked ? inventory.includes(rooms[targetId].lockedBy!) : false;
        connectionLines.push({
          from: toCenter(fromPos.x, fromPos.y),
          to: toCenter(toPos.x, toPos.y),
          locked: !!isLocked,
          hasKey,
        });
        continue;
      }

      const key = [roomId, targetId].sort().join(":");
      if (drawn.has(key)) continue;
      drawn.add(key);

      const toPos = ROOM_POSITIONS[targetId];
      if (!toPos) continue;

      connectionLines.push({
        from: toCenter(fromPos.x, fromPos.y),
        to: toCenter(toPos.x, toPos.y),
      });
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>MAPA DE LA INSTALACIÓN</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>[CERRAR]</Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.mapArea,
            { width: gridW * UNIT, height: gridH * UNIT },
          ]}
        >
          {/* Connection lines */}
          {connectionLines.map((line, i) => {
            const dx = line.to.x - line.from.x;
            const dy = line.to.y - line.from.y;

            const lineStyle = line.locked
              ? line.hasKey
                ? styles.lineLockedReady
                : styles.lineLocked
              : null;

            const mkLine = (
              key: string,
              horizontal: boolean,
              left: number,
              top: number,
              size: number,
            ) => (
              <View
                key={key}
                style={[
                  horizontal ? styles.lineH : styles.lineV,
                  lineStyle,
                  horizontal
                    ? { left, top: top - 1, width: size }
                    : { left: left - 1, top, height: size },
                ]}
              />
            );

            if (dx !== 0 && dy !== 0) {
              return (
                <React.Fragment key={i}>
                  {mkLine(`${i}-h`, true, Math.min(line.from.x, line.to.x), line.from.y, Math.abs(dx))}
                  {mkLine(`${i}-v`, false, line.to.x, Math.min(line.from.y, line.to.y), Math.abs(dy))}
                </React.Fragment>
              );
            }

            if (dy === 0) {
              return mkLine(`${i}`, true, Math.min(line.from.x, line.to.x), line.from.y, Math.abs(dx));
            }

            return mkLine(`${i}`, false, line.from.x, Math.min(line.from.y, line.to.y), Math.abs(dy));
          })}

          {/* Room nodes */}
          {visitedRooms.map((roomId) => {
            const pos = ROOM_POSITIONS[roomId];
            if (!pos) return null;
            const isCurrent = roomId === currentRoom;
            const isTrail = trailRooms.includes(roomId);
            const hasItem = roomsWithItems.includes(roomId);
            const label = ROOM_LABELS[roomId] || roomId.toUpperCase();

            return (
              <Animated.View
                key={roomId}
                style={[
                  styles.node,
                  {
                    left: (pos.x - minX) * UNIT + UNIT / 2 - NODE_W / 2,
                    top: (pos.y - minY) * UNIT + UNIT / 2 - 14,
                    width: NODE_W,
                    borderColor: isCurrent
                      ? "#00ff00"
                      : isTrail
                        ? "#006600"
                        : "#004400",
                    opacity: isCurrent
                      ? pulseAnim
                      : isTrail
                        ? 0.5
                        : 0.6,
                  },
                  isCurrent && styles.currentNode,
                  isTrail && styles.trailNode,
                ]}
              >
                <Text
                  style={[
                    styles.nodeText,
                    isCurrent && styles.currentNodeText,
                    isTrail && styles.trailNodeText,
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
                {hasItem && <Text style={styles.itemDot}>◆</Text>}
              </Animated.View>
            );
          })}

          {/* IA indicator */}
          {showIA && entityRoom && (() => {
            const pos = ROOM_POSITIONS[entityRoom];
            if (!pos) return null;
            return (
              <Animated.View
                key="ia-indicator"
                style={[
                  styles.iaNode,
                  {
                    left: (pos.x - minX) * UNIT + UNIT / 2 - 6,
                    top: (pos.y - minY) * UNIT + UNIT / 2 - 22,
                    opacity: pulseRed,
                  },
                ]}
              >
                <Text style={styles.iaText}>IA</Text>
              </Animated.View>
            );
          })()}

          {/* Locked adjacent rooms */}
          {lockedAdjacent.map((entry) => {
            const pos = ROOM_POSITIONS[entry.roomId];
            if (!pos) return null;
            const label = ROOM_LABELS[entry.roomId] || entry.roomId.toUpperCase();
            const hasKey = inventory.includes(entry.keyNeeded);
            const itemName = entry.keyNeeded
              .replace(/_/g, " ")
              .toUpperCase();

            return (
              <View
                key={`locked-${entry.roomId}`}
                style={[
                  styles.lockedNode,
                  {
                    left: (pos.x - minX) * UNIT + UNIT / 2 - NODE_W / 2,
                    top: (pos.y - minY) * UNIT + UNIT / 2 - 27,
                    width: NODE_W,
                    borderColor: hasKey ? "#00aa00" : "#330000",
                  },
                  hasKey && styles.hasKeyNode,
                ]}
              >
                <Text
                  style={[
                    styles.lockedIcon,
                    { color: hasKey ? "#00aa00" : "#660000" },
                  ]}
                >
                  {hasKey ? "🔓" : "🔒"}
                </Text>
                <Text style={styles.lockedLabel}>{label}</Text>
                <Text
                  style={[
                    styles.lockedReq,
                    { color: hasKey ? "#006600" : "#553300" },
                  ]}
                  numberOfLines={1}
                >
                  {hasKey
                    ? `TIENES ${itemName}`
                    : `NECESITA: ${itemName}`}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 5, 0, 0.97)",
    paddingTop: 50,
  },
  mapArea: {
    flex: 1,
    position: "relative",
    alignSelf: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#003300",
  },
  title: {
    color: "#00ff00",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  closeButton: {
    borderWidth: 1,
    borderColor: "#004400",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  closeText: {
    color: "#00aa00",
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  lineH: {
    position: "absolute",
    height: 2,
    backgroundColor: "rgba(0, 100, 0, 0.4)",
  },
  lineV: {
    position: "absolute",
    width: 2,
    backgroundColor: "rgba(0, 100, 0, 0.4)",
  },
  lineLocked: {
    backgroundColor: "rgba(100, 0, 0, 0.25)",
  },
  lineLockedReady: {
    backgroundColor: "rgba(0, 80, 0, 0.4)",
  },
  node: {
    position: "absolute",
    height: 28,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 10, 0, 0.9)",
  },
  currentNode: {
    borderWidth: 2,
    backgroundColor: "rgba(0, 30, 0, 0.9)",
    shadowColor: "#00ff00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  nodeText: {
    color: "#008800",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  currentNodeText: {
    color: "#00ff00",
    fontSize: 11,
  },
  trailNode: {
    borderColor: "#005500",
  },
  trailNodeText: {
    color: "#005500",
  },
  itemDot: {
    position: "absolute",
    right: 4,
    top: 5,
    color: "#ffcc00",
    fontSize: 8,
  },
  iaNode: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
  },
  iaText: {
    color: "#fff",
    fontSize: 6,
    fontWeight: "bold",
  },
  lockedNode: {
    position: "absolute",
    height: 54,
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10, 0, 0, 0.85)",
  },
  hasKeyNode: {
    backgroundColor: "rgba(0, 10, 0, 0.85)",
    borderStyle: "solid",
  },
  lockedIcon: {
    fontSize: 10,
    position: "absolute",
    top: 2,
    right: 4,
  },
  lockedLabel: {
    color: "#440000",
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  lockedReq: {
    fontSize: 8,
    fontFamily: "monospace",
    marginTop: 2,
  },
});
