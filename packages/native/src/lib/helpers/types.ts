import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";

/**
 * Type representing a style that can be applied to a React Native component.
 * It can be a style for text, view, or image components.
 */
export type Style = TextStyle | ViewStyle | ImageStyle;

/**
 * Type for a style prop that can be applied to a React Native component.
 * It can be a single style or an array of styles.
 */
export type AssertiveStyle = StyleProp<Style>;

/**
 * Type representing a style object when flattened.
 * It is a record where the keys are strings and the values can be of any type.
 */
export type StyleObject = Record<string, unknown>;
