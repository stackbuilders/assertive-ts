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

export function getExpectedAndReceivedStyles
(actual: Element, expected: Partial<CSSStyleDeclaration>): StyleDeclaration[] {
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
}

export function isElementEmpty (element: Element): boolean {
  const nonCommentChildNodes = [...element.childNodes].filter(child => child.nodeType !== 8);
  return nonCommentChildNodes.length === 0;
}
