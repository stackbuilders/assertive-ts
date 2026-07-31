const COMMENT_NODE_TYPE = 8;

export function isElementEmpty(element: Element): boolean {
  const nonCommentChildNodes = [...element.childNodes].filter(child => child.nodeType !== COMMENT_NODE_TYPE);
  return nonCommentChildNodes.length === 0;
}

// `htmlText` is not validated here because callers are internal and the public
// assertions already reject non-string and empty values before reaching this point.
export function normalizeHtml(htmlText: string, ownerDocument: Document): string {
  const div = ownerDocument.createElement("div");
  div.innerHTML = htmlText;

  return div.innerHTML;
}

export function isButtonElement(element: Element): boolean {
  const roles = (element.getAttribute("role") || "")
    .split(" ")
    .map(role => role.trim());

  const tagName = element.tagName.toLowerCase();
  const type = element.getAttribute("type");

  const isNativeButton = tagName === "button" || (tagName === "input" && type === "button");
  const hasButtonRole = roles.includes("button");

  return isNativeButton || hasButtonRole;
}
