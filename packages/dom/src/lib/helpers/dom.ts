const COMMENT_NODE_TYPE = 8;

export function isElementEmpty(element: Element): boolean {
  const nonCommentChildNodes = [...element.childNodes].filter(child => child.nodeType !== COMMENT_NODE_TYPE);
  return nonCommentChildNodes.length === 0;
}
