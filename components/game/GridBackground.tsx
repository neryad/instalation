import { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";

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

  return null; // No necesitamos renderizar nada, los estilos se aplican al body
}

const styles = StyleSheet.create({});
