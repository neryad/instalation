import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface InventoryHUDProps {
  items: string[];
}

export const InventoryHUD: React.FC<InventoryHUDProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INVENTARIO_ACTIVO:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.itemBadge}>
            <View style={styles.corner} />
            <Text style={styles.itemText}>{item.toUpperCase()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    color: "#445544", // Un verde muy oscuro, tipo comentario de código
    fontSize: 10,
    fontFamily: "monospace",
    marginBottom: 5,
    letterSpacing: 1,
  },
  list: {
    gap: 8,
  },
  itemBadge: {
    backgroundColor: "rgba(0, 255, 0, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 0, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    position: "relative",
  },
  // Ese pequeño detalle que lo hace parecer una interfaz militar/retro
  corner: {
    position: "absolute",
    top: -1,
    left: -1,
    width: 4,
    height: 4,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#00ff00",
  },
  itemText: {
    color: "#00ff00",
    fontSize: 11,
    fontFamily: "monospace",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 255, 0, 0.5)",
    textShadowRadius: 4,
  },
});
