import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ControlPadProps {
  onForward: () => void;
  onTurn: (left: boolean) => void;
  onInvestigate: () => void;
  onLook: () => void;
  onUseSedative: () => void;
  hasSedative: boolean;
  disabled?: boolean;
}

export function ControlPad({
  onForward,
  onTurn,
  onInvestigate,
  onLook,
  onUseSedative,
  hasSedative,
  disabled,
}: ControlPadProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button label="INVESTIGAR" onPress={onInvestigate} disabled={disabled} main />
        <Button label="MIRAR" onPress={onLook} disabled={disabled} />
      </View>
      {hasSedative && (
        <View style={styles.row}>
          <Button label="USAR SEDANTE" onPress={onUseSedative} disabled={disabled} use />
        </View>
      )}
      <View style={styles.moveRow}>
        <Button label="◀" onPress={() => onTurn(true)} disabled={disabled} round />
        <Button label="▲" onPress={onForward} disabled={disabled} big />
        <Button label="▶" onPress={() => onTurn(false)} disabled={disabled} round />
      </View>
    </View>
  );
}

function Button({
  label,
  onPress,
  disabled,
  main,
  use,
  big,
  round,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  main?: boolean;
  use?: boolean;
  big?: boolean;
  round?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        main && styles.mainButton,
        use && styles.useButton,
        big && styles.bigButton,
        round && styles.roundButton,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 10, padding: 8 },
  row: { flexDirection: "row", gap: 10 },
  moveRow: { flexDirection: "row", gap: 14, alignItems: "center", marginTop: 4 },
  button: {
    borderWidth: 1,
    borderBottomWidth: 4,
    borderColor: "#004400",
    backgroundColor: "rgba(0, 20, 0, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    minWidth: 78,
    alignItems: "center",
  },
  mainButton: { borderColor: "#008800", borderBottomColor: "#00ff00" },
  useButton: { backgroundColor: "#001a00", borderColor: "#00aa00" },
  bigButton: { minWidth: 70, paddingVertical: 26 },
  roundButton: { minWidth: 62, paddingVertical: 10 },
  text: {
    color: "#0f0",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 1,
  },
  pressed: { borderBottomWidth: 1, marginTop: 3, backgroundColor: "#003300" },
  disabled: { opacity: 0.3 },
});