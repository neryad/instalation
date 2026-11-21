import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface InventoryHUDProps {
  items: string[];
}

const ITEM_IMAGE_MAP: Record<string, number> = {
  sedative: require("@/assets/images/items/sedative.png"),
  keycard_red: require("@/assets/images/items/keycard_red.png"),
  data_link: require("@/assets/images/items/data_link.png"),
  thermal_fuse: require("@/assets/images/items/thermal_fuse.png"),
  dev_log_aes: require("@/assets/images/items/dev_log_aes.png"),
};

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
        {items.map((item, index) => {
          const imageSource = ITEM_IMAGE_MAP[item];
          return (
            <View key={index} style={styles.itemBadge}>
              <View style={styles.corner} />
              {imageSource ? (
                <>
                  <Image source={imageSource} style={styles.itemImage} resizeMode="contain" />
                  <Text style={styles.itemText}>{item.toUpperCase()}</Text>
                </>
              ) : (
                <Text style={styles.itemText}>{item.toUpperCase()}</Text>
              )}
            </View>
          );
        })}
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
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: "center",
    position: "relative",
  },
  itemImage: {
    width: 48,
    height: 48,
    marginBottom: 4,
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
