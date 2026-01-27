import { CRTOverlay } from "@/components/game/CRTOverlay";
import { useRouter } from "expo-router";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ManualScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
      ]}
    >
      <CRTOverlay />

      <Text style={styles.header}>// PROTOCOLO_DE_SUPERVIVENCIA</Text>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* SECCIÓN 1: MISIÓN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. MISIÓN PRIORITARIA</Text>
          <Text style={styles.text}>
            Sujeto 00: Tu objetivo es llegar al NÚCLEO (Core) de la instalación y ejecutar el protocolo final.
            {"\n\n"}
            La IA que controla el lugar es hostil. No confíes en lo que ves. No confíes en lo que escuchas.
          </Text>
        </View>

        {/* SECCIÓN 2: MECÁNICAS DE RIESGO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. AMENAZAS SISTÉMICAS</Text>
          
          <View style={styles.mechanicBox}>
            <Text style={[styles.mechanicTitle, { color: "#0f0" }]}>CORDURA (Sanity)</Text>
            <Text style={styles.text}>
              Tu mente se fragmenta con el tiempo y el horror.
              {"\n"}- Si llega a 0, pierdes tu identidad.
              {"\n"}- Mantente estable usando SEDANTES o evitando horrores.
              {"\n"}- Alucinaciones visuales y auditivas aumentan con la locura.
            </Text>
          </View>

          <View style={styles.mechanicBox}>
            <Text style={[styles.mechanicTitle, { color: "#f00" }]}>RUIDO (Awareness)</Text>
            <Text style={styles.text}>
              La IA te escucha. Cada acción ruidosa aumenta su atención.
              {"\n"}- INVESTIGAR: +Riesgo moderado.
              {"\n"}- FORZAR PUERTAS: +Riesgo CRÍTICO.
              {"\n"}- Si llega al 100%, serás localizado y eliminado.
            </Text>
          </View>
        </View>

        {/* SECCIÓN 3: COMANDOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. COMANDOS DE INTERFAZ</Text>
          <View style={styles.cmdRow}><Text style={styles.cmd}>N, S, E, W</Text><Text style={styles.desc}>Desplazamiento físico.</Text></View>
          <View style={styles.cmdRow}><Text style={styles.cmd}>INVESTIGAR</Text><Text style={styles.desc}>Buscar ítems en la sala.</Text></View>
          <View style={styles.cmdRow}><Text style={styles.cmd}>MIRAR</Text><Text style={styles.desc}>Analizar el entorno visible.</Text></View>
          <View style={styles.cmdRow}><Text style={styles.cmd}>USAR [ITEM]</Text><Text style={styles.desc}>Utilizar objeto del inventario.</Text></View>
          <View style={styles.cmdRow}><Text style={styles.cmd}>FORZAR [DIR]</Text><Text style={styles.desc}>Romper cerradura sin llave (-Cordura).</Text></View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.backText}>CERRAR ARCHIVO</Text>
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
