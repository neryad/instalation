import * as Haptics from "expo-haptics"; // Importamos la vibración
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
interface TerminalInputProps {
  onSubmit: (input: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export const TerminalInput = ({
  onSubmit,
  placeholder = "Enter command...",
  editable = true,
}: TerminalInputProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<TextInput>(null);

  // Animación para el cursor parpadeante
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Ciclo de parpadeo infinito
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handleChangeText = (newText: string) => {
    setText(newText);
    // Vibración sutil cada vez que se presiona una tecla
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      // Vibración un poco más fuerte al enviar
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onSubmit(text.trim());
      setText("");
      inputRef.current?.focus();
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{">"}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmit}
          placeholder={text === "" ? placeholder : ""} // Limpiamos placeholder si hay texto
          placeholderTextColor="#223322"
          editable={editable}
          autoCapitalize="none"
          returnKeyType="send"
          autoFocus={true}
          blurOnSubmit={false}
          // Ocultamos el cursor nativo de Android/iOS si es posible
          selectionColor="rgba(0, 255, 0, 0.3)" // Color del selector de texto
        />

        {/* Este es tu cursor parpadeante retro */}
        {editable && (
          <Animated.View
            style={[
              styles.customCursor,
              { opacity: cursorOpacity, left: text.length * 9.7 }, // Ajuste aproximado de posición
            ]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 10, 0, 0.95)", // Un poco más oscuro para que resalte
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 255, 0, 0.3)",
  },
  prompt: {
    color: "#00ff00",
    fontSize: 18,
    marginRight: 5,
    fontFamily: "monospace",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 255, 0, 0.7)",
    textShadowRadius: 4,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#00ff00",
    fontSize: 18,
    fontFamily: "monospace",
    padding: 0, // Importante para que el cursor parpadeante se alinee
  },
  customCursor: {
    width: 10,
    height: 18,
    backgroundColor: "#00ff00",
    position: "absolute",
    // La posición 'left' se calcula dinámicamente arriba
    // Nota: El valor 9.7 depende del tamaño de fuente, ajusta según veas
  },
});
