import { StyleSheet } from "react-native";

import { AssertiveStyle, StyleObject } from "./types";

export function getFlattenedStyle(style: AssertiveStyle): StyleObject {
    const flattenedStyle = StyleSheet.flatten(style);
    return flattenedStyle ? (flattenedStyle as StyleObject) : {};
}
