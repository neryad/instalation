import { useRouter } from "expo-router";
import React from "react";
import {
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CRTOverlay } from "../components/game/CRTOverlay";

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir link:", err),
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <CRTOverlay isGlitchActive={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>[ REGISTRO_DE_SISTEMA ]</Text>

        <View style={styles.section}>
          <Text style={styles.label}>ARQUITECTO:</Text>
          <Text style={styles.value}>NERYAD</Text>
          <Text style={styles.label}>VERSIÓN:</Text>
          <Text style={styles.value}>1.0.4-STABLE</Text>
        </View>

        <Text style={styles.description}>
          "La interfaz de S.A.N.I.T.Y. ha sido interceptada por Neryad para la
          observación de colapsos neuronales. No se garantiza el retorno de la
          conciencia del usuario."
        </Text>

        <View style={styles.linkContainer}>
          <AboutButton
            label="ACCEDER_AL_CÓDIGO (GITHUB)"
            onPress={() => openLink("https://github.com/neryad/instalation")}
          />
          <AboutButton
            label="ENVIAR_CAFÉ_A_CENTRAL (KO-FI)"
            onPress={() => openLink("https://ko-fi.com/neryad")}
          />
          <AboutButton
            label="CANAL_DE_TRANSMISIÓN (YOUTUBE)"
            onPress={() => openLink("https://www.youtube.com/@neryad")}
          />
          <AboutButton
            label="RED_DE_ECOS (X / TWITTER)"
            onPress={() => openLink("https://x.com/NeryadG")}
          />
        </View>

        <Pressable
          style={styles.backBtn}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.backText}>[ VOLVER_A_LA_TERMINAL ]</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function AboutButton({ label, onPress }: any) {
  return (
    <Pressable style={styles.linkBtn} onPress={onPress}>
      <Text style={styles.linkText}>{`> ${label}`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000500",
    paddingHorizontal: 25,
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  scrollContent: { paddingVertical: 20 },
  header: {
    color: "#0f0",
    fontSize: 24,
    fontFamily: "monospace",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
    borderLeftWidth: 2,
    borderLeftColor: "#004400",
    paddingLeft: 15,
  },
  label: { color: "#006600", fontSize: 12, fontFamily: "monospace" },
  value: {
    color: "#0f0",
    fontSize: 18,
    fontFamily: "monospace",
    marginBottom: 10,
  },
  description: {
    color: "#008800",
    fontFamily: "monospace",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 40,
    lineHeight: 20,
  },
  linkContainer: { gap: 15 },
  linkBtn: {
    padding: 10,
    backgroundColor: "rgba(0, 50, 0, 0.1)",
    borderWidth: 1,
    borderColor: "#003300",
  },
  linkText: { color: "#0f0", fontFamily: "monospace", fontSize: 13 },
  backBtn: { marginTop: 50, alignSelf: "center" },
  backText: { color: "#004400", fontFamily: "monospace", fontSize: 14 },
});
