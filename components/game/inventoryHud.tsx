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
      <Text style={styles.title}>INVENTARIO_ACTIVO</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {items.map((item, index) => {
          const imageSource = ITEM_IMAGE_MAP[item];
          return (
            <View key={index} style={styles.itemBadge}>
              {/* Corner accents */}
              <View style={styles.cornerTL} />
              <View style={styles.cornerBR} />
              {imageSource ? (
                <>
                  <View style={styles.imageGlow}>
                    <Image source={imageSource} style={styles.itemImage} resizeMode="contain" />
                  </View>
                  <Text style={styles.itemText} numberOfLines={1}>{item.toUpperCase()}</Text>
                </>
              ) : (
                <Text style={styles.itemText} numberOfLines={1}>{item.toUpperCase()}</Text>
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
    marginBottom: 6,
  },
  title: {
    color: "#335533",
    fontSize: 9,
    fontFamily: "monospace",
    marginBottom: 4,
    letterSpacing: 2,
  },
  list: {
    gap: 6,
  },
  itemBadge: {
    backgroundColor: "rgba(0, 20, 0, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 0, 0.25)",
    paddingHorizontal: 6,
    paddingVertical: 4,
    alignItems: "center",
    position: "relative",
    borderRadius: 4,
    minWidth: 60,
  },
  imageGlow: {
    shadowColor: "#00ff00",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  itemImage: {
    width: 40,
    height: 40,
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 6,
    height: 6,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#00ff00",
    borderRadius: 2,
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 6,
    height: 6,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#00ff00",
    borderRadius: 2,
  },
  itemText: {
    color: "#00cc00",
    fontSize: 8,
    fontFamily: "monospace",
    fontWeight: "bold",
    marginTop: 2,
    letterSpacing: 0.5,
  },
});
