const COMMENT_NODE_TYPE = 8;

export function isElementEmpty(element: Element): boolean {
  const nonCommentChildNodes = [...element.childNodes].filter(child => child.nodeType !== COMMENT_NODE_TYPE);
  return nonCommentChildNodes.length === 0;
}

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

const FORM_TAGS = [
  "fieldset",
  "input",
  "select",
  "optgroup",
  "option",
  "button",
  "textarea",
];

function isFirstLegendChildOfFieldset(element: Element, parent: Element | null): boolean {
  return (
    element.tagName.toLowerCase() === "legend"
    && parent?.tagName.toLowerCase() === "fieldset"
    && element === Array.from(parent.children).find(child => child.tagName.toLowerCase() === "legend")
  );
}

function isElementDisabledByParent(element: Element, parent: Element | null): boolean {
  return (
    parent !== null
    && isElementDisabled(parent) && !isFirstLegendChildOfFieldset(element, parent)
  );
}

function isCustomElement(tag: string): boolean {
  return tag.includes("-");
}

function canElementBeDisabled(element: Element): boolean {
  const tag = element.tagName.toLowerCase();
  return FORM_TAGS.includes(tag) || isCustomElement(tag);
}

function isElementDisabled(element: Element): boolean {
  return canElementBeDisabled(element) && element.hasAttribute("disabled");
}

function isAncestorDisabled(element: Element): boolean {
  const parent = element.parentElement;
  return (
    parent !== null
    && (isElementDisabledByParent(element, parent) || isAncestorDisabled(parent))
  );
}

export function isElementOrAncestorDisabled(element: Element): boolean {
  return (
    canElementBeDisabled(element)
    && (isElementDisabled(element) || isAncestorDisabled(element))
  );
}
