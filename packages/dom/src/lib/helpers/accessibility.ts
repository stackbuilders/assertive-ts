export function isValidAriaPressed(element: Element): boolean {
  const pressedAttribute = element.getAttribute("aria-pressed");
  return pressedAttribute !== null && ["true", "false", "mixed"].includes(pressedAttribute);
}
