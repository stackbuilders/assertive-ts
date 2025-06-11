import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { ReactTestInstance } from "react-test-renderer";

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

/**
 * Type representing a matcher for text in tests.
 *
 * It can be a string, a regular expression, or a function that
 * takes a string and returns a boolean.
 */
export type TestableTextMatcher = string | RegExp | ((text: string) => boolean);

/**
 * Type representing a value that can be used to match text content in tests.
 * It can be a string, a ReactTestInstance, or an array of ReactTestInstances.
 */
export type WithTextContent = string | ReactTestInstance | ReactTestInstance[];
