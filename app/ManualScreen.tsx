import { CRTOverlay } from "@/components/game/CRTOverlay";
import { useI18n } from "@/locales/I18nContext";
import { useRouter } from "expo-router";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GridBackground } from "../components/game/GridBackground";

export default function ManualScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
      ]}
    >
      <GridBackground />
      <CRTOverlay />

      <Text style={styles.header}>{t("manual.header")}</Text>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* SECCIÓN 1: MISIÓN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("manual.mission_title")}</Text>
          <Text style={styles.text}>
            {t("manual.mission_text")}
          </Text>
        </View>

        {/* SECCIÓN 2: MECÁNICAS DE RIESGO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("manual.threats_title")}</Text>
          
          <View style={styles.mechanicBox}>
            <Text style={[styles.mechanicTitle, { color: "#0f0" }]}>{t("manual.sanity_title")}</Text>
            <Text style={styles.text}>
              {t("manual.sanity_text")}
            </Text>
          </View>

          <View style={styles.mechanicBox}>
            <Text style={[styles.mechanicTitle, { color: "#f00" }]}>{t("manual.awareness_title")}</Text>
            <Text style={styles.text}>
              {t("manual.awareness_text")}
            </Text>
          </View>
        </View>

        {/* SECCIÓN 3: COMANDOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("manual.commands_title")}</Text>
          <View style={styles.cmdRow}><Text style={styles.cmd}>N, S, E, W</Text><Text style={styles.desc}>{t("manual.cmd_move")}</Text></View>
          <View style={styles.cmdRow}><Text style={styles.cmd}>INVESTIGAR</Text><Text style={styles.desc}>{t("manual.cmd_investigate")}</Text></View>
          <View style={styles.cmdRow}><Text style={styles.cmd}>MIRAR</Text><Text style={styles.desc}>{t("manual.cmd_look")}</Text></View>
          <View style={styles.cmdRow}><Text style={styles.cmd}>USAR [ITEM]</Text><Text style={styles.desc}>{t("manual.cmd_use")}</Text></View>
          <View style={styles.cmdRow}><Text style={styles.cmd}>FORZAR [DIR]</Text><Text style={styles.desc}>{t("manual.cmd_force")}</Text></View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.backText}>{t("manual.close")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    color: "#0f0",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#003300",
    paddingBottom: 10,
  },
  content: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#0a0",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    backgroundColor: "rgba(0, 50, 0, 0.2)",
    padding: 5,
  },
  text: {
    color: "#aaa",
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    lineHeight: 18,
  },
  mechanicBox: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#222",
  },
  mechanicTitle: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 4,
  },
  cmdRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  cmd: {
    color: "#0f0",
    width: 100,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  desc: {
    color: "#8a8",
    fontSize: 12,
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#003300",
    alignItems: "center",
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: "#0f0",
    backgroundColor: "rgba(0, 20, 0, 0.5)",
  },
  backText: {
    color: "#0f0",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 1,
  },
});
