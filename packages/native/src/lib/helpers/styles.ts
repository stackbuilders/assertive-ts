import { StyleSheet } from "react-native";

import { AssertiveStyle, StyleObject } from "./types";

export function getFlattenedStyle(style: AssertiveStyle): StyleObject {
    const flattenedStyle = StyleSheet.flatten(style);
    return flattenedStyle ? (flattenedStyle as StyleObject) : {};
}

export function styleToString(flattenedStyle: StyleObject): string {
  const styleEntries = Object.entries(flattenedStyle);
  return styleEntries.map(([key, value]) => `\t- ${key}: ${String(value)};`).join("\n");
}
