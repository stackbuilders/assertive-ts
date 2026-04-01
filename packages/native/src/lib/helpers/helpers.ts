import { StyleSheet } from "react-native";
import { ReactTestInstance } from "react-test-renderer";

import { AssertiveStyle, StyleObject, TestableTextMatcher } from "./types";

export function isEmpty(value: unknown): boolean {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
}

export function instanceToString(instance: ReactTestInstance | null): string {
  if (instance === null) {
    return "null";
  }

  return `<${instance.type.toString()} ... />`;
}

export function textMatches(
  text: string,
  matcher: TestableTextMatcher,
): boolean {
  if (typeof matcher === "string") {
    return text.includes(matcher);
  }

  if (matcher instanceof RegExp) {
    return matcher.test(text);
  }

  if (typeof matcher === "function") {
    return matcher(text);
  }

  throw new Error("Matcher must be a string, RegExp, or function.");
}

export function getFlattenedStyle(style: AssertiveStyle): StyleObject {
    const flattenedStyle = StyleSheet.flatten(style);
    return flattenedStyle ? (flattenedStyle as StyleObject) : {};
}

export function styleToString(flattenedStyle: StyleObject): string {
  const styleEntries = Object.entries(flattenedStyle);
  return styleEntries.map(([key, value]) => `\t- ${key}: ${String(value)};`).join("\n");
}
