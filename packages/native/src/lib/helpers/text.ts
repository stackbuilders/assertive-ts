import type { TestableTextMatcher, TextContent } from "./types";
import type { ReactTestInstance } from "react-test-renderer";

function collectText(element: TextContent): string[] {
  if (typeof element === "string") {
    return [element];
  }

  if (Array.isArray(element)) {
    return element.flatMap(child => collectText(child));
  }

  if (element && (typeof element === "object" && "props" in element)) {
    const value = element.props?.value as TextContent;
    if (typeof value === "string") {
      return [value];
    }

    const children = (element.props?.children as ReactTestInstance[]) ?? element.children;
    if (!children) {
      return [];
    }

    return Array.isArray(children)
      ? children.flatMap(collectText)
      : collectText(children);
  }

  return [];
}

export function getTextContent(element: ReactTestInstance): string {
  if (!element) {
    return "";
  }
  if (typeof element === "string") {
    return element;
  }
  if (typeof element.props?.value === "string") {
    return element.props.value;
  }

  return collectText(element).join(" ");
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
