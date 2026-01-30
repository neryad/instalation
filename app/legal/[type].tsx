import { CRTOverlay } from "@/components/game/CRTOverlay";
import { LICENSE_TEXT, PRIVACY_POLICY, TERMS_OF_USE } from "@/constants/legalText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LegalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { type } = useLocalSearchParams();

  let content = "";
  let title = "";

  if (type === "privacy") {
      content = PRIVACY_POLICY;
      title = "POLÍTICA DE PRIVACIDAD";
  } else if (type === "terms") {
      content = TERMS_OF_USE;
      title = "TÉRMINOS DE USO";
  } else if (type === "license") {
      content = LICENSE_TEXT;
      title = "LICENCIA MIT";
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
      ]}
    >
      <CRTOverlay />

      <Text style={styles.header}>[ {title} ]</Text>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.text}>{content}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>VOLVER</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000500",
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
  scroll: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(0, 50, 0, 0.5)",
    backgroundColor: "rgba(0, 10, 0, 0.2)",
    marginBottom: 20,
  },
  content: {
    padding: 15,
  },
  text: {
    color: "#aaa",
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    lineHeight: 18,
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
