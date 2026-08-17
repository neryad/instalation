import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Direction } from "../../engine/rooms";

export interface DoorPromptOption {
  key: string;
  direction: Direction;
  targetRoomId: string;
  locked: boolean;
  forceable: boolean;
}

interface DoorPromptProps {
  visible: boolean;
  doors: DoorPromptOption[];
  onChoose: (dir: Direction) => void;
  onForce: (dir: Direction) => void;
  onClose: () => void;
}

export interface ClassifiedDoors {
  open: DoorPromptOption[];
  locked: DoorPromptOption[];
  forceable: DoorPromptOption[];
}

export function classifyDoors(doors: DoorPromptOption[]): ClassifiedDoors {
  const open: DoorPromptOption[] = [];
  const locked: DoorPromptOption[] = [];
  const forceable: DoorPromptOption[] = [];
  for (const d of doors) {
    if (!d.locked) open.push(d);
    else locked.push(d);
    if (d.forceable) forceable.push(d);
  }
  return { open, locked, forceable };
}

export function DoorPrompt({
  visible,
  doors,
  onChoose,
  onForce,
  onClose,
}: DoorPromptProps) {
  const { open, locked, forceable } = classifyDoors(doors);
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.panel}>
          <Text style={styles.title}>SALIDAS DISPONIBLES</Text>
          {open.length === 0 && <Text style={styles.empty}>No hay salidas libres.</Text>}
          {open.map((d) => (
            <Pressable
              key={d.key}
              onPress={() => onChoose(d.direction)}
              style={({ pressed }) => [styles.option, pressed && styles.pressed]}
            >
              <Text style={styles.optionText}>
                {d.direction.toUpperCase()} → {d.targetRoomId.replace(/_/g, " ")}
              </Text>
            </Pressable>
          ))}
          {locked.map((d) => (
            <View key={d.key} style={styles.lockedRow}>
              <Text style={styles.lockedText}>
                {d.direction.toUpperCase()} → BLOQUEADA
              </Text>
              {forceable.some((f) => f.key === d.key) && (
                <Pressable
                  onPress={() => onForce(d.direction)}
                  style={({ pressed }) => [styles.forceButton, pressed && styles.pressed]}
                >
                  <Text style={styles.forceText}>FORZAR</Text>
                </Pressable>
              )}
            </View>
          ))}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>CERRAR</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    padding: 24,
  },
  panel: {
    borderWidth: 1,
    borderColor: "#00ff00",
    backgroundColor: "rgba(0, 12, 0, 0.95)",
    padding: 18,
  },
  title: {
    color: "#0f0",
    fontFamily: "monospace",
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 12,
  },
  option: {
    borderWidth: 1,
    borderColor: "#005500",
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  optionText: { color: "#ccffcc", fontFamily: "monospace" },
  lockedRow: {
    borderWidth: 1,
    borderColor: "#440000",
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lockedText: { color: "#884444", fontFamily: "monospace" },
  forceButton: {
    borderWidth: 1,
    borderColor: "#ff0000",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  forceText: { color: "#ff4444", fontFamily: "monospace", fontSize: 12 },
  empty: { color: "#446644", fontFamily: "monospace", marginBottom: 8 },
  closeButton: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#004400",
    paddingTop: 10,
    alignItems: "center",
  },
  closeText: { color: "#00aa00", fontFamily: "monospace" },
  pressed: { backgroundColor: "#003300" },
});