import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface QuickActionsProps {
  onAction: (cmd: string) => void;
  disabled?: boolean;
  hasSedative?: boolean;
  forceableDirections?: string[];
}

export function QuickActions({
  onAction,
  disabled,
  hasSedative,
  forceableDirections = [],
}: QuickActionsProps) {
  return (
    <View style={styles.container}>
      {/* Cruzeta de movimiento */}
      <View style={styles.row}>
        <ActionButton
          label="N"
          cmd="north"
          onPress={onAction}
          disabled={disabled}
        />
      </View>
      <View style={styles.row}>
        <ActionButton
          label="W"
          cmd="west"
          onPress={onAction}
          disabled={disabled}
        />
        <ActionButton
          label="INVESTIGAR"
          cmd="investigar"
          onPress={onAction}
          disabled={disabled}
          isMain
        />
        <ActionButton
          label="E"
          cmd="east"
          onPress={onAction}
          disabled={disabled}
        />
      </View>
      <View style={styles.row}>
        <ActionButton
          label="S"
          cmd="south"
          onPress={onAction}
          disabled={disabled}
        />
      </View>

      {/* Botones de Acción Especiales */}
      <View style={[styles.row, { marginTop: 15 }]}>
        {hasSedative && (
          <ActionButton
            label="USAR SEDANTE"
            cmd="usar sedante"
            onPress={onAction}
            disabled={disabled}
            style={styles.useButton}
          />
        )}
        <ActionButton
          label="MIRAR"
          cmd="mirar"
          onPress={onAction}
          disabled={disabled}
        />
      </View>

      {/* Botones de FORZAR PUERTA (Contextuales) */}
      {forceableDirections.length > 0 && (
        <View style={[styles.row, { marginTop: 10 }]}>
          {forceableDirections.map((dir) => (
            <ActionButton
              key={dir}
              label={`FORZAR ${dir.toUpperCase().charAt(0)}`}
              cmd={`forzar ${dir}`}
              onPress={onAction}
              disabled={disabled}
              style={styles.forceButton}
            />
          ))}
        </View>
      )}
    </View>
  );
}

// Sub-componente para botones limpios
function ActionButton({ label, cmd, onPress, disabled, isMain, style }: any) {
  return (
    <Pressable
      onPress={() => onPress(cmd)}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isMain && styles.mainButton,
        pressed && styles.pressed,
        style,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

// export const QuickActions: React.FC<QuickActionsProps> = ({
//   onAction,
//   disabled,
// }) => {
//   const actions = [
//     { label: "N", cmd: "NORTH" },
//     { label: "S", cmd: "SOUTH" },
//     { label: "E", cmd: "EAST" },
//     { label: "W", cmd: "WEST" },
//     { label: "INVESTIGAR", cmd: "INVESTIGAR" },
//     { label: "MIRAR", cmd: "LOOK" },
//   ];

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scroll}
//       >
//         {actions.map((action, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.button, disabled && styles.disabled]}
//             onPress={() => !disabled && onAction(action.cmd)}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.text}>{action.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  row: { flexDirection: "row", gap: 10, marginBottom: 10 },
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#005500",
    minWidth: 50,
    alignItems: "center",
  },
  mainButton: { borderColor: "#00ff00", minWidth: 120 },
  useButton: { backgroundColor: "#002200", borderColor: "#00ff00" },
  forceButton: { borderColor: "#ff3333", backgroundColor: "#220000" },
  text: { color: "#0f0", fontFamily: "monospace", fontWeight: "bold" },
  pressed: { backgroundColor: "#003300" },
  disabled: { opacity: 0.3 },
});

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "rgba(0, 10, 0, 0.8)",
//     borderTopWidth: 1,
//     borderTopColor: "#003300",
//     paddingVertical: 8,
//   },
//   scroll: {
//     paddingHorizontal: 10,
//     gap: 10,
//   },
//   button: {
//     backgroundColor: "rgba(0, 40, 0, 0.5)",
//     borderWidth: 1,
//     borderColor: "#00ff41",
//     paddingHorizontal: 15,
//     paddingVertical: 6,
//     borderRadius: 4,
//   },
//   disabled: {
//     borderColor: "#222",
//     opacity: 0.5,
//   },
//   text: {
//     color: "#00ff41",
//     fontSize: 12,
//     fontWeight: "bold",
//     fontFamily: "monospace",
//   },
// });
