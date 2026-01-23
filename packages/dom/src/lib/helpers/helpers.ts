interface StyleDeclaration extends Record<string, string> {
  property: string;
  value: string;
}

function normalizeStyles(css: Partial<CSSStyleDeclaration>): StyleDeclaration {
  const normalizer = document.createElement("div");
  document.body.appendChild(normalizer);

  const { expectedStyle } = Object.entries(css).reduce(
    (acc, [property, value]) => {

      if (typeof value !== "string") {
        return acc;
      }

      normalizer.style.setProperty(property, value);

      const normalizedValue = window
        .getComputedStyle(normalizer)
        .getPropertyValue(property)
        .trim();

      return {
        expectedStyle: {
          ...acc.expectedStyle,
          [property]: normalizedValue,
        },
      };
    },
    { expectedStyle: {} as StyleDeclaration },
  );

  document.body.removeChild(normalizer);

  return expectedStyle;
}

function getReceivedStyle (props: string[], received: CSSStyleDeclaration): StyleDeclaration {

  return props.reduce((acc, prop) => {

    const actualStyle = received.getPropertyValue(prop).trim();

    return actualStyle
    ? { ...acc, [prop]: actualStyle }
    : acc;

  }, {} as StyleDeclaration);
}

export const getExpectedAndReceivedStyles =
(actual: Element, expected: Partial<CSSStyleDeclaration>): StyleDeclaration[] => {
    if (!actual.ownerDocument.defaultView) {
      throw new Error("The element is not attached to a document with a default view.");
    }
    if (!(actual instanceof HTMLElement)) {
      throw new Error("The element is not an HTMLElement.");
    }

    const window = actual.ownerDocument.defaultView;

    const rawElementStyles = window.getComputedStyle(actual);

    const expectedStyle = normalizeStyles(expected);

    const styleKeys = Object.keys(expectedStyle);

    const elementProcessedStyle = getReceivedStyle(styleKeys, rawElementStyles);

    return [
      expectedStyle,
      elementProcessedStyle,
    ];
};

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function getAccessibleDescription(actual: Element): string {
  const ariaDescribedBy = actual.getAttribute("aria-describedby") || "";
  const descriptionIDs = ariaDescribedBy
    .split(/\s+/)
    .filter(Boolean);

  if (descriptionIDs.length === 0) {
    return "";
  }

  const getElementText = (id: string): string | null => {
    const element = actual.ownerDocument.getElementById(id);
    return element?.textContent || null;
  };

  return normalizeText(
    descriptionIDs
      .map(getElementText)
      .filter((text): text is string => text !== null)
      .join(" "),
  );
}
