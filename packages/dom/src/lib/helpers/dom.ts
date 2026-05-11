const COMMENT_NODE_TYPE = 8;

export function isElementEmpty(element: Element): boolean {
  const nonCommentChildNodes = [...element.childNodes].filter(child => child.nodeType !== COMMENT_NODE_TYPE);
  return nonCommentChildNodes.length === 0;
}

export function isButtonElement(element: Element): boolean {
  const roles = (element.getAttribute("role") || "")
    .split(" ")
    .map(role => role.trim());

  const tagName = element.tagName.toLowerCase();
  const type = element.getAttribute("type");

  return (
    tagName === "button"
    || (tagName === "input" && type === "button")
    || roles.includes("button")
  );
}

export function isValidAriaPressed(element: Element): boolean {
  const pressedAttribute = element.getAttribute("aria-pressed");
  return pressedAttribute === "true" || pressedAttribute === "false" || pressedAttribute === "mixed";
}
