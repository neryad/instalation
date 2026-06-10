import { useEffect, useRef, useState } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

interface GridBackgroundProps {
  sanity?: number;
}

function getGridColor(sanity: number) {
  if (sanity > 50) return { r: 0, g: 255, b: 65, a: 0.03 };
  if (sanity > 30) {
    const t = (sanity - 30) / 20;
    return {
      r: Math.round(255 * (1 - t)),
      g: Math.round(255 * t),
      b: 0,
      a: 0.03 + (1 - t) * 0.02,
    };
  }
  return { r: 255, g: Math.max(0, Math.round(255 * (sanity / 30))), b: 0, a: 0.05 };
}

export function GridBackground({ sanity = 100 }: GridBackgroundProps) {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      const c = getGridColor(sanity);
      if (!styleRef.current) {
        const el = document.createElement("style");
        document.head.appendChild(el);
        styleRef.current = el;
      }
      styleRef.current.innerHTML = `
        body {
          background: #000000;
          background-image:
            radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%),
            linear-gradient(rgba(${c.r}, ${c.g}, ${c.b}, ${c.a}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${c.r}, ${c.g}, ${c.b}, ${c.a}) 1px, transparent 1px);
          background-size: 100% 100%, 40px 40px, 40px 40px;
          background-position: center, 0 0, 0 0;
        }
      `;
      return () => {
        if (styleRef.current) {
          document.head.removeChild(styleRef.current);
          styleRef.current = null;
        }
      };
    }
  }, [sanity]);

  if (Platform.OS !== "web") {
    return <View style={styles.background} />;
  }

  return null;
}

export function StaticNoise({ density = 0 }: { density?: number }) {
  const animRef = useRef<Animated.Value[]>([]);
  const posRef = useRef<Array<{ x: number; y: number; s: number }>>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const count = Math.round(density * 40);
    while (posRef.current.length < count) {
      posRef.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 1,
      });
      animRef.current.push(new Animated.Value(0));
    }
    if (posRef.current.length > count) {
      posRef.current = posRef.current.slice(0, count);
      animRef.current = animRef.current.slice(0, count);
    }
    setReady(true);
  }, [density]);

  useEffect(() => {
    if (density <= 0 || !ready) return;
    const interval = setInterval(() => {
      animRef.current.forEach((v) => {
        v.setValue(Math.random() > 0.5 ? Math.random() * 0.6 + 0.2 : 0);
      });
    }, 150);
    return () => clearInterval(interval);
  }, [density, ready]);

  if (!ready || density <= 0) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {animRef.current.map((v, i) => (
        <Animated.View
          key={i}
          style={{
            position: "absolute",
            left: `${posRef.current[i].x}%`,
            top: `${posRef.current[i].y}%`,
            width: posRef.current[i].s,
            height: posRef.current[i].s,
            borderRadius: posRef.current[i].s / 2,
            backgroundColor: "#fff",
            opacity: v,
          }}
        />
      ))}
    </View>
  );
}

export function ScanWave({ active = false }: { active?: boolean }) {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (!active) {
      translateY.setValue(-100);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, { toValue: 100, duration: 3000, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -100, duration: 0, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active]);

  if (!active) return null;

  return (
    <Animated.View
      style={[
        styles.scanWave,
        { transform: [{ translateY }] },
      ]}
      pointerEvents="none"
    />
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },
  scanWave: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(0, 255, 65, 0.12)",
    zIndex: 998,
  },
});
