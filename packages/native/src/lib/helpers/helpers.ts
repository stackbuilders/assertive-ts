import { ReactTestInstance } from "react-test-renderer";

import { TestableTextMatcher } from "./types";

/**
 * Checks if a value is empty.
 *
 * @param value - The value to check.
 * @returns `true` if the value is empty, `false` otherwise.
 */
export function isEmpty(value: unknown): boolean {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
}

/**
 * Converts a ReactTestInstance to a string representation.
 *
 * @param instance - The ReactTestInstance to convert.
 * @returns A string representation of the instance.
 */
export function instanceToString(instance: ReactTestInstance | null): string {
  if (instance === null) {
    return "null";
  }

  return `<${instance.type.toString()} ... />`;
}

/**
 * Converts a TestableTextMatcher to a string representation.
 *
 * @param matcher - The matcher to convert.
 * @returns A string representation of the matcher.
 * @throws Error if the matcher is not a string, RegExp, or function.
 */
export function testableTextMatcherToString(matcher: TestableTextMatcher): string {
  if (typeof matcher === "string") {
    return `String: "${matcher}"`;
  }

  if (matcher instanceof RegExp) {
    return `RegExp: ${matcher.toString()}`;
  }

  if (typeof matcher === "function") {
    return `Function: ${matcher.toString()}`;
  }

  throw new Error("Matcher must be a string, RegExp, or function.");
}

/**
 * Checks if a text matches a given matcher.
 *
 * @param text - The text to check.
 * @param matcher - The matcher to use for comparison.
 * @returns `true` if the text matches the matcher, `false` otherwise.
 * @throws Error if the matcher is not a string, RegExp, or function.
 * @example
 * ```ts
 * textMatches("Hello World", "Hello World"); // true
 * textMatches("Hello World", /Hello/); // true
 * textMatches("Hello World", (text) => text.startsWith("Hello")); // true
 * textMatches("Hello World", "Goodbye"); // false
 * textMatches("Hello World", /Goodbye/); // false
 * textMatches("Hello World", (text) => text.startsWith("Goodbye")); // false
 * ```
 */
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
