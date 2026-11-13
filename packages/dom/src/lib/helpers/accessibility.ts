export function isValidAriaPressed(element: Element): boolean {
  const pressedAttribute = element.getAttribute("aria-pressed");
  return pressedAttribute !== null && ["true", "false", "mixed"].includes(pressedAttribute);
}

export function isValidAriaCheckedStrict(element: Element): boolean {
  const checkedAttribute = element.getAttribute("aria-checked");
  const role = element.getAttribute("role") ?? "";
  return ["checkbox", "radio", "switch"].includes(role)
    && checkedAttribute !== null
    && ["true", "false"].includes(checkedAttribute);
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
