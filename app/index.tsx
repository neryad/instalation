import { Link, useRouter } from "expo-router";
import { useI18n } from "@/locales/I18nContext";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CRTOverlay } from "../components/game/CRTOverlay";
import { GridBackground } from "../components/game/GridBackground";

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const [glitch, setGlitch] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("menu.subtitle");
  const isWeb = Platform.OS === "web";

  const horrorMessages = [
    "menu.horror_1",
    "menu.horror_2",
    "menu.horror_3",
    "menu.horror_4",
    "menu.horror_5",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitch(true);
        const randomMessage =
          horrorMessages[Math.floor(Math.random() * horrorMessages.length)];
        setCurrentSubtitle(randomMessage);

        setTimeout(() => {
          setGlitch(false);
          setCurrentSubtitle("Análisis Sistemático de Integridad Neural");
        }, 200);
      },
      4000 + Math.random() * 4000,
    );

    return () => clearInterval(interval);
  }, []);

  // Layout block reused for both web and mobile
  const menuButtons = (
    <>
      <Link href="/intro" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            glitch && styles.buttonGlitch,
            pressed && styles.buttonPressed,
            isWeb && styles.buttonWeb,
          ]}
        >
          <Text style={[styles.buttonText, glitch && { color: "#f00" }, isWeb && styles.buttonTextWeb]}>
            {t("menu.start")}
          </Text>
        </Pressable>
      </Link>

      <Link href="/AchievementsScreen" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { marginTop: 15, borderColor: "#005500" },
            pressed && { backgroundColor: "rgba(0, 50, 0, 0.3)" },
            isWeb && styles.buttonWeb,
          ]}
        >
          <Text style={[styles.buttonText, { color: "#00aa00", fontSize: 14 }]}>
            {t("menu.archives")}
          </Text>
        </Pressable>
      </Link>

      <Link href="/SettingsScreen" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { marginTop: 15, borderColor: "#008800" },
            pressed && { backgroundColor: "rgba(0, 80, 0, 0.2)" },
            isWeb && styles.buttonWeb,
          ]}
        >
          <Text style={[styles.buttonText, { color: "#0f0", fontSize: 14 }]}>
            {t("menu.settings")}
          </Text>
        </Pressable>
      </Link>

      <Link href="/AboutScreen" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { marginTop: 15, borderColor: "#003300" },
            pressed && { backgroundColor: "rgba(0, 30, 0, 0.3)" },
            isWeb && styles.buttonWeb,
          ]}
        >
          <Text style={[styles.buttonText, { color: "#005500", fontSize: 12 }]}>
            {t("menu.system")}
          </Text>
        </Pressable>
      </Link>
    </>
  );

  return (
    <View
      style={[
        styles.container,
        isWeb && styles.containerWeb,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <GridBackground />
      <CRTOverlay isGlitchActive={glitch} />

      {isWeb ? (
        /* WEB LAYOUT: Horizontal — título izquierda, botones derecha */
        <View style={styles.webLayout}>
          <View style={styles.webLeft}>
            <View style={styles.titleWrapper}>
              <Text
                style={[styles.title, styles.titleWeb, glitch && styles.glitchText]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {t("menu.title")}
              </Text>
              <View
                style={[
                  styles.scanlineTitle,
                  glitch && { backgroundColor: "rgba(255,0,0,0.4)" },
                ]}
              />
            </View>
            <Text style={[styles.version, { marginTop: 15 }]}>v2.0.26_CORE</Text>
            <View style={styles.subtitleContainer}>
              <Text style={[styles.subtitle, glitch && styles.glitchSubtitle]}>
                {t(currentSubtitle)}
              </Text>
            </View>
            <View style={[styles.warningBox, { marginBottom: 0, marginTop: 30 }]}>
              <View style={styles.warningLine} />
              <Text style={styles.warningText}>
                {t("menu.warning_1")}
              </Text>
              <Text style={styles.warningText}>
                {t("menu.warning_2")}
              </Text>
              <View style={styles.warningLine} />
            </View>
          </View>
          <View style={styles.webRight}>
            {menuButtons}
          </View>
        </View>
      ) : (
        /* MÓVIL LAYOUT: Vertical */
        <>
          <View style={styles.header}>
            <View style={styles.titleWrapper}>
              <Text
                style={[styles.title, glitch && styles.glitchText]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {t("menu.title")}
              </Text>
              <View
                style={[
                  styles.scanlineTitle,
                  glitch && { backgroundColor: "rgba(255,0,0,0.4)" },
                ]}
              />
            </View>
            <Text style={styles.version}>v2.0.26_CORE</Text>

            <View style={styles.subtitleContainer}>
              <Text style={[styles.subtitle, glitch && styles.glitchSubtitle]}>
                {t(currentSubtitle)}
              </Text>
            </View>
          </View>

          <View style={styles.centerContent}>
            <View style={styles.warningBox}>
              <View style={styles.warningLine} />
              <Text style={styles.warningText}>
                {t("menu.warning_1")}
              </Text>
              <Text style={styles.warningText}>
                {t("menu.warning_2")}
              </Text>
              <View style={styles.warningLine} />
            </View>
            {menuButtons}
          </View>

          <View style={styles.footerContainer}>
            <Link href="/ManualScreen" asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.manualButton,
                  pressed && { backgroundColor: "rgba(0, 50, 0, 0.2)" },
                ]}
              >
                <Text style={styles.footerHeader}>
                  {t("menu.manual")}
                </Text>
              </Pressable>
            </Link>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 25,
    justifyContent: "space-between",
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  containerWeb: {
    maxWidth: "100%" as any,
    width: "100%" as any,
    paddingHorizontal: 60,
    justifyContent: "center" as any,
  },
  webLayout: {
    flex: 1,
    flexDirection: "row" as any,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40,
    width: "100%",
  },
  webLeft: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  webRight: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWeb: {
    fontSize: 56,
  },
  buttonWeb: {
    width: "100%",
    maxWidth: 320,
  },
  buttonTextWeb: {
    fontSize: 18,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  titleWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 42,
    fontWeight: "bold",
    color: "#0f0",
    letterSpacing: 4,
    textAlign: "center",
  },
  scanlineTitle: {
    position: "absolute",
    bottom: -5,
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0, 255, 0, 0.3)",
  },
  glitchText: {
    color: "#f00",
    transform: [{ scale: 1.03 }, { translateX: 2 }],
  },
  version: {
    color: "#050",
    fontSize: 10,
    fontFamily: "monospace",
    marginTop: 10,
    letterSpacing: 2,
  },
  subtitleContainer: {
    height: 50,
    justifyContent: "center",
    marginTop: 20,
  },
  subtitle: {
    color: "#4a4",
    fontSize: 11,
    textAlign: "center",
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  glitchSubtitle: {
    color: "#f00",
    opacity: 0.8,
  },
  centerContent: {
    alignItems: "center",
    width: "100%",
  },
  warningBox: {
    alignItems: "center",
    marginBottom: 40,
  },
  warningLine: {
    height: 1,
    width: 60,
    backgroundColor: "#200",
    marginVertical: 12,
  },
  warningText: {
    color: "#500",
    fontSize: 10,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  button: {
    borderWidth: 1,
    borderColor: "#0f0",
    paddingHorizontal: 40,
    paddingVertical: 18,
    backgroundColor: "transparent",
  },
  buttonGlitch: {
    borderColor: "#f00",
  },
  buttonPressed: {
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
  buttonText: {
    color: "#0f0",
    fontSize: 16,
    letterSpacing: 4,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  footerContainer: {
    width: "100%",
    marginBottom: 20,
  },
  manualButton: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,255,0,0.3)",
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  footerHeader: {
    color: "#262",
    fontSize: 12,
    fontFamily: "monospace",
    letterSpacing: 2,
  },
});
