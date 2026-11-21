import { AchievementToast } from "@/components/game/AchievementToast";
import { CRTOverlay } from "@/components/game/CRTOverlay";
import { useI18n } from "@/locales/I18nContext";
import { EndingType, unlockEnding } from "@/storage/achievements";
import { getSettings } from "@/storage/settings";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { GridBackground, StaticNoise } from "../components/game/GridBackground";

export default function FinalScreen() {
  const { type } = useLocalSearchParams<{
    type: "good" | "bad" | "insane" | "captured" | "transcend" | "escape";
  }>();
  const router = useRouter();
  const { t } = useI18n();
  const soundRef = useRef<Audio.Sound | null>(null);
  const [achievementToast, setAchievementToast] = useState<EndingType | null>(null);
  const [showContent, setShowContent] = useState(false);

  const titleAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const glitchAnim = useRef(new Animated.Value(0)).current;

  const [displayedText, setDisplayedText] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (type) {
      unlockEnding(type as any);
      setAchievementToast(type as EndingType);
      loadAndPlayAudio();
    }

    const timer = setTimeout(() => setShowContent(true), 600);
    return () => {
      clearTimeout(timer);
      soundRef.current?.unloadAsync();
    };
  }, [type]);

  useEffect(() => {
    if (!showContent) return;

    Animated.sequence([
      Animated.timing(titleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.delay(400),
      Animated.timing(textAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();

    const content = getEndingContent();
    let idx = 0;
    const chars = content.text.split("");
    const twInterval = setInterval(() => {
      if (idx < chars.length) {
        setDisplayedText(chars.slice(0, idx + 1).join(""));
        idx++;
      } else {
        clearInterval(twInterval);
        setTimeout(() => {
          Animated.timing(buttonAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
          setShowButton(true);
        }, 500);
      }
    }, 25);

    return () => clearInterval(twInterval);
  }, [showContent]);

  useEffect(() => {
    if (!showContent) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glitchAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(glitchAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [showContent]);

  const loadAndPlayAudio = async () => {
    try {
      const settings = await getSettings();
      if (!settings.soundEnabled) return;

      let audioSource;
      if (type === "good" || type === "escape") {
        audioSource = require("../assets/sounds/GOOD_ y_ ESCAPE.mp3");
      } else if (type === "transcend") {
        audioSource = require("../assets/sounds/TRANSCEND.mp3");
      } else {
        audioSource = require("../assets/sounds/BAD_INSANE_y_CAPTURED.mp3");
      }

      const { sound } = await Audio.Sound.createAsync(audioSource);
      soundRef.current = sound;
      await sound.playAsync();
    } catch (e) {
      console.log("Error cargando audio final:", e);
    }
  };

  const getEndingContent = () => {
    const key = `endings.${type}`;
    return {
      title: t(`${key}.title`),
      text: t(`${key}.text`),
      button: t(`${key}.button`),
      style: styles[type] || styles.bad,
    };
  };

  const content = getEndingContent();

  return (
    <View style={styles.container}>
      <GridBackground sanity={50} />
      <StaticNoise density={0.6} />
      <CRTOverlay
        isGlitchActive={glitchAnim.interpolate({ inputRange: [0, 1], outputRange: [false, true] as any }) ? true : false}
        sanity={15}
        dangerLevel={0.8}
      />
      <AchievementToast
        endingType={achievementToast}
        onComplete={() => setAchievementToast(null)}
      />

      {showContent && (
        <>
          <Animated.Text
            style={[
              styles.title,
              content.style,
              {
                opacity: titleAnim,
                transform: [
                  {
                    scale: titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            {content.title}
          </Animated.Text>

          <Animated.Text
            style={[
              styles.text,
              {
                opacity: textAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ]}
          >
            {displayedText}
          </Animated.Text>

          {showButton && (
            <Animated.View
              style={{
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && { backgroundColor: "rgba(255,255,255,0.1)" },
                ]}
                onPress={() => router.replace("/")}
              >
                <Text style={styles.buttonText}>{content.button}</Text>
              </Pressable>
            </Animated.View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 4,
    textAlign: "center",
  },
  good: {
    color: "#00ff88",
  },
  bad: {
    color: "#ff0033",
  },
  insane: {
    color: "#ffcc00",
  },
  captured: {
    color: "#cc00ff",
  },
  transcend: {
    color: "#00ddff",
  },
  escape: {
    color: "#ff9900",
  },
  text: {
    color: "#aaa",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 60,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  button: {
    borderWidth: 1,
    borderColor: "#555",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 2,
  },
  buttonText: {
    color: "#fff",
    letterSpacing: 2,
    fontSize: 14,
    fontWeight: "bold",
  },
});
