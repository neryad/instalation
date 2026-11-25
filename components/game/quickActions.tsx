import * as Haptics from "expo-haptics";
import React from "react";
import { useI18n } from "@/locales/I18nContext";
import { getGameActionsLayout } from "@/assets/styles/web-layout";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

interface QuickActionsProps {
  onAction: (cmd: string) => void;
  disabled?: boolean;
  hasSedative?: boolean;
  forceableDirections?: string[];
  onOpenMap?: () => void;
}

export function QuickActions({
  onAction,
  disabled,
  hasSedative,
  forceableDirections = [],
  onOpenMap,
}: QuickActionsProps) {
  const { t, lang } = useI18n();
  const isCompactWeb = getGameActionsLayout(Platform.OS) === "compact";
  return (
    <View style={[styles.container, isCompactWeb && styles.webContainer]}>
      {isCompactWeb ? (
        <View style={styles.webActions}>
          <ActionButton
            label={t("quickactions.investigate")}
            cmd="investigar"
            onPress={onAction}
            disabled={disabled}
            isMain
          />
          <ActionButton
            label={t("quickactions.look")}
            cmd="mirar"
            onPress={onAction}
            disabled={disabled}
          />
          {onOpenMap && (
            <ActionButton
              label={t("quickactions.map")}
              cmd=""
              onPress={onOpenMap}
              disabled={disabled}
              style={styles.mapButton}
            />
          )}
          <ActionButton
            label={t("quickactions.north")}
            cmd="norte"
            onPress={onAction}
            disabled={disabled}
          />
          <ActionButton
            label={lang === "en" ? "W" : t("quickactions.west")}
            cmd="oeste"
            onPress={onAction}
            disabled={disabled}
          />
          <ActionButton
            label={t("quickactions.east")}
            cmd="este"
            onPress={onAction}
            disabled={disabled}
          />
          <ActionButton
            label={t("quickactions.south")}
            cmd="sur"
            onPress={onAction}
            disabled={disabled}
          />
          {hasSedative && (
            <ActionButton
              label={t("quickactions.use_sedative")}
              cmd="usar sedante"
              onPress={onAction}
              disabled={disabled}
              style={styles.useButton}
            />
          )}
          {forceableDirections.map((dir) => (
            <ActionButton
              key={dir}
              label={`${t("quickactions.force")} ${dir.toUpperCase().charAt(0)}`}
              cmd={`forzar ${dir}`}
              onPress={onAction}
              disabled={disabled}
              style={styles.forceButton}
            />
          ))}
        </View>
      ) : (
        <>
          {/* Fila superior: Acciones principales */}
          <View style={styles.row}>
            <ActionButton
              label={t("quickactions.investigate")}
              cmd="investigar"
              onPress={onAction}
              disabled={disabled}
              isMain
            />
            <ActionButton
              label={t("quickactions.look")}
              cmd="mirar"
              onPress={onAction}
              disabled={disabled}
            />
            {onOpenMap && (
              <ActionButton
                label={t("quickactions.map")}
                cmd=""
                onPress={onOpenMap}
                disabled={disabled}
                style={styles.mapButton}
              />
            )}
          </View>

          {/* Cruzeta de movimiento */}
          <View style={styles.row}>
            <View style={{ width: 55 }} />
            <ActionButton
              label={t("quickactions.north")}
              cmd="norte"
              onPress={onAction}
              disabled={disabled}
            />
            <View style={{ width: 55 }} />
          </View>
          <View style={styles.row}>
            <ActionButton
              label={lang === "en" ? "W" : t("quickactions.west")}
              cmd="oeste"
              onPress={onAction}
              disabled={disabled}
            />
            <View style={styles.dpadCenter}>
              <View style={styles.compassRing}>
                <View style={styles.compassNub} />
              </View>
            </View>
            <ActionButton
              label={t("quickactions.east")}
              cmd="este"
              onPress={onAction}
              disabled={disabled}
            />
          </View>
          <View style={styles.row}>
            <View style={{ width: 55 }} />
            <ActionButton
              label={t("quickactions.south")}
              cmd="sur"
              onPress={onAction}
              disabled={disabled}
            />
            <View style={{ width: 55 }} />
          </View>

          {/* Contextuales */}
          {hasSedative && (
            <View style={styles.row}>
              <ActionButton
                label={t("quickactions.use_sedative")}
                cmd="usar sedante"
                onPress={onAction}
                disabled={disabled}
                style={styles.useButton}
              />
            </View>
          )}

          {forceableDirections.length > 0 && (
            <View style={styles.row}>
              {forceableDirections.map((dir) => (
                <ActionButton
                  key={dir}
                  label={`${t("quickactions.force")} ${dir.toUpperCase().charAt(0)}`}
                  cmd={`forzar ${dir}`}
                  onPress={onAction}
                  disabled={disabled}
                  style={styles.forceButton}
                />
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

// Sub-componente para botones limpios
function ActionButton({ label, cmd, onPress, disabled, isMain, style }: any) {
  const handlePress = () => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      onPress(cmd);
    }
  };
  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        Platform.OS === "web" && styles.webButton,
        isMain && styles.mainButton,
        Platform.OS === "web" && isMain && styles.webMainButton,
        style,
        pressed && styles.pressed,
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
//     { label: "N", cmd: "norte" },
//     { label: "S", cmd: "sur" },
//     { label: "E", cmd: "este" },
//     { label: "W", cmd: "oeste" },
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
  webContainer: { width: "100%" },
  webActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  row: { flexDirection: "row", gap: 10, marginBottom: 10, alignItems: "center" },
  dpadCenter: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#002200",
    backgroundColor: "rgba(0, 10, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  compassRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#004400",
    alignItems: "center",
    justifyContent: "center",
  },
  compassNub: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#006600",
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderBottomWidth: 4, // Efecto mecánico
    borderColor: "#004400",
    backgroundColor: "rgba(0, 20, 0, 0.85)",
    minWidth: 55,
    alignItems: "center",
    borderRadius: 4,
  },
  webButton: {
    minWidth: 48,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  webMainButton: {
    minWidth: 110,
  },
  mainButton: {
    borderColor: "#008800",
    borderBottomColor: "#00ff00",
    minWidth: 130,
    backgroundColor: "rgba(0, 40, 0, 0.9)",
  },
  useButton: {
    backgroundColor: "rgba(0, 26, 0, 0.9)",
    borderColor: "#00aa00",
    borderBottomColor: "#0f0",
  },
  forceButton: {
    borderColor: "#880000",
    borderBottomColor: "#ff0000",
    backgroundColor: "rgba(26, 0, 0, 0.9)",
  },
  mapButton: {
    borderColor: "#008800",
    borderBottomColor: "#00ff00",
    backgroundColor: "rgba(0, 50, 0, 0.6)",
    minWidth: 130,
  },
  text: {
    color: "#0f0",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 1,
  },
  pressed: {
    borderBottomWidth: 1,
    marginTop: 3, // Se "hunde" al presionar
    backgroundColor: "#003300",
    borderColor: "#00ff00",
  },
  disabled: { opacity: 0.25 },
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
