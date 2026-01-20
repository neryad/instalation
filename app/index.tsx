import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>S A N I T Y</Text>
      <Text style={styles.subtitle}>
        "No todas las puertas llevan a un lugar real."
      </Text>

      <Pressable style={styles.button} onPress={() => router.push("/game")}>
        <Text style={styles.buttonText}>INICIAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#0f0",
    fontSize: 42,
    letterSpacing: 6,
    marginBottom: 20,
  },
  subtitle: {
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 60,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#0f0",
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#0f0",
    fontSize: 18,
    letterSpacing: 2,
  },
});
