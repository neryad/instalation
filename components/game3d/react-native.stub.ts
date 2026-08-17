import React from "react";

export const StyleSheet = {
  create: (styles: Record<string, unknown>) => styles,
};

const Plain = (props: Record<string, unknown>) => React.createElement("Plain", props);

export const View = Plain;
export const Text = Plain;
export const Pressable = Plain;
export const Modal = Plain;
export const ScrollView = Plain;
export const TextInput = Plain;
export const Switch = Plain;
export const Image = Plain;
export const ImageBackground = Plain;
export const TouchableOpacity = Plain;

export const Animated = {
  Value: class Value {},
  timing: () => ({ start: () => {} }),
};