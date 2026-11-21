import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

interface RoomVisualProps {
  roomId: string;
  sanity: number;
}

// Mapeo de rooms a imágenes generadas
const roomImages: Record<string, number> = {
  awakening: require("../../assets/images/rooms/awakening.png"),
  awakening_insane: require("../../assets/images/rooms/awakening_insane.png"),
  hallway_a: require("../../assets/images/rooms/hallway_a.png"),
  shadow_lab: require("../../assets/images/rooms/shadow_lab.png"),
  data_morgue: require("../../assets/images/rooms/data_morgue.png"),
  data_morgue_insane: require("../../assets/images/rooms/data_morgue_insane.png"),
  data_terminal: require("../../assets/images/rooms/data_terminal.png"),
  mirror_gallery: require("../../assets/images/rooms/mirror_gallery.png"),
  armory: require("../../assets/images/rooms/armory.png"),
  neural_link: require("../../assets/images/rooms/neural_link.png"),
  neural_link_insane: require("../../assets/images/rooms/neural_link_insane.png"),
  waste_disposal: require("../../assets/images/rooms/waste_disposal.png"),
  incinerator: require("../../assets/images/rooms/incinerator.png"),
  incinerator_insane: require("../../assets/images/rooms/incinerator_insane.png"),
  ventilation_shaft: require("../../assets/images/rooms/ventilation_shaft.png"),
  life_support: require("../../assets/images/rooms/life_support.png"),
  dead_hydroponics: require("../../assets/images/rooms/dead_hydroponics.png"),
  dead_hydroponics_insane: require("../../assets/images/rooms/dead_hydroponics_insane.png"),
  core_door: require("../../assets/images/rooms/core_door.png"),
  core: require("../../assets/images/rooms/core.png"),
  shutdown_protocol: require("../../assets/images/rooms/shutdown_protocol.png"),
  transcendence_chamber: require("../../assets/images/rooms/transcendence_chamber.png"),
  emergency_escape: require("../../assets/images/rooms/emergency_escape.png"),
};

// Salas que tienen variantes insane según cordura
const insaneRooms = new Set([
  "awakening",
  "data_morgue",
  "incinerator",
  "dead_hydroponics",
  "neural_link",
]);

export function RoomVisual({ roomId, sanity }: RoomVisualProps) {
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let key = roomId;
    if (
      insaneRooms.has(roomId) &&
      sanity < 30 &&
      roomImages[`${roomId}_insane`]
    ) {
      key = `${roomId}_insane`;
    }

    if (roomImages[key]) {
      // Fade out, then change image, then fade in
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setImageKey(key);
        setIsLoaded(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    } else {
      setImageKey(null);
    }
  }, [roomId, sanity]);

  if (!imageKey) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]} pointerEvents="none">
      <Image
        source={roomImages[imageKey]}
        style={[styles.image, !isLoaded && styles.fadeIn]}
        resizeMode="cover"
        onLoad={() => setIsLoaded(true)}
        fadeDuration={600}
      />
      {/* Overlay oscuro para que el texto sea legible */}
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: `rgba(0, 5, 0, ${Math.min(0.55, 0.2 + (100 - sanity) / 200)})`,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1376 / 768, // proporción real de tus imágenes
    overflow: "hidden",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#003300",
    backgroundColor: "#000",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  fadeIn: {
    opacity: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
