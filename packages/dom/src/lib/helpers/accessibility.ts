export function isValidAriaPressed(element: Element): boolean {
  const pressedAttribute = element.getAttribute("aria-pressed");
  return pressedAttribute !== null && ["true", "false", "mixed"].includes(pressedAttribute);
}

export function matchesAccessibleExpectation(actual: string, expected?: RegExp | string): boolean {
  if (expected === undefined) {
    return Boolean(actual);
  }

  return expected instanceof RegExp
    ? expected.test(actual)
    : actual === expected;
}

export function describeAccessibleExpectation(expected?: RegExp | string): string {
  if (expected === undefined) {
    return "";
  }

  return expected instanceof RegExp
    ? `matching ${expected}`
    : `"${expected}"`;
}
