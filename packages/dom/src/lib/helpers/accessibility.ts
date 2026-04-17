function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function getAccessibleDescription(actual: Element): string {
  const ariaDescribedBy = actual.getAttribute("aria-describedby");

  if (!ariaDescribedBy) {
    return "";
  }

  const descriptionIds = ariaDescribedBy.split(/\s+/).filter(Boolean);

  const getElementText = (id: string): null | string => {
    const element = actual.ownerDocument.getElementById(id);

    if (!element || !element.textContent) {
      return null;
    }

    return element.textContent;
  };

  const combinedText = descriptionIds
    .map(getElementText)
    .filter((text): text is string => text !== null)
    .join(" ");

  return normalizeText(combinedText);
}
