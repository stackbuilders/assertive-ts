export interface CssAtRuleAST {
  declarations: StyleDeclaration[];
  rules: Rule[];
}

interface Rule {
  declarations: StyleDeclaration[];
  selectors: string[];
}

interface StyleDeclaration extends Record<string, string> {
  property: string;
  value: string;
}

export const normalizeStyles = (css: Partial<CSSStyleDeclaration>):
{ expectedStyle: StyleDeclaration; props: string[]; } => {
  const normalizer = document.createElement("div");
  document.body.appendChild(normalizer);

  const { props, expectedStyle } = Object.entries(css).reduce(
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
        props: [...acc.props, property],
      };
    },
    { expectedStyle: {} as StyleDeclaration, props: [] as string[] },
  );

  document.body.removeChild(normalizer);

  return { expectedStyle, props };
};

export const getReceivedStyle = (props: string[], received: CSSStyleDeclaration): StyleDeclaration => {
  return props.reduce((acc, prop) => {
    acc[prop] = received?.getPropertyValue(prop).trim();
    return acc;
  }, {} as StyleDeclaration);
};
