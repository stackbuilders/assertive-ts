import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import type { ReactTestInstance } from "react-test-renderer";

type Style = ImageStyle | TextStyle | ViewStyle;

export type AssertiveStyle = StyleProp<Style>;

export type StyleObject = Record<string, unknown>;

export type TestableTextMatcher = ((text: string) => boolean) | RegExp | string;

export type TextContent = ReactTestInstance | ReactTestInstance[] | string;
