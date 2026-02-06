import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";

export function GridBackground() {
  // En web, inyectamos estilos globales para el body
  useEffect(() => {
    if (Platform.OS === "web") {
      const style = document.createElement("style");
      style.innerHTML = `
        body {
          background: #000000;
          background-image:
            radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%),
            linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px);
          background-size: 100% 100%, 40px 40px, 40px 40px;
          background-position: center, 0 0, 0 0;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // En mobile, renderizamos un View con fondo negro absoluto
  if (Platform.OS !== "web") {
    return <View style={styles.background} />;
  }

  return null; // En web, los estilos se aplican al body
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000",
    zIndex: -1, // Asegurar que esté detrás de todo
  },
});
