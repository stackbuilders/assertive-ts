import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { ReactTestInstance } from "react-test-renderer";

type Style = TextStyle | ViewStyle | ImageStyle;

export type AssertiveStyle = StyleProp<Style>;

export type StyleObject = Record<string, unknown>;

export type TestableTextMatcher = string | RegExp | ((text: string) => boolean);

export type TextContent = string | ReactTestInstance | ReactTestInstance[];
