export interface CssAtRuleAST {
  rules: Rule[];
  declarations: StyleDeclaration[];
}

interface Rule {
  selectors: string[];
  declarations: StyleDeclaration[];
}

interface StyleDeclaration extends Record<string, string> {
  property: string;
  value: string;
}

export const normalizeStylesObject = (
  css: Object,
  window: Window
): { props: string[]; expectedStyle: StyleDeclaration } => {
  const normalizer = document.createElement("div");
  document.body.appendChild(normalizer);

  const { props, expectedStyle } = Object.entries(css).reduce(
    (acc, [property, value]) => {
      normalizer.style.setProperty(property, value);

      const normalizedValue = window
        .getComputedStyle(normalizer)
        .getPropertyValue(property)
        .trim();

      return {
        props: [...acc.props, property],
        expectedStyle: {
          ...acc.expectedStyle,
          [property]: normalizedValue,
        },
      };
    },
    { props: [] as string[], expectedStyle: {} as StyleDeclaration }
  );

  document.body.removeChild(normalizer);

  return { props, expectedStyle };
};

export const normalizeStylesString = (expectedRule: CssAtRuleAST, window: Window) => {
  const normalizer = document.createElement("div");
  document.body.appendChild(normalizer);

  const rules = expectedRule?.rules[0] || { declarations: [] };
  const { props, expectedStyle } = rules?.declarations.reduce(
    (acc, { property, value }) => {
      normalizer.style.setProperty(property, value);

      const normalizedValue = window
        .getComputedStyle(normalizer)
        .getPropertyValue(property)
        .trim();

        return {
          props: [...acc.props, property],
          expectedStyle: {
            ...acc.expectedStyle,
            [property]: normalizedValue,
          },
        };
      },
      { props: [] as string[], expectedStyle: {} as StyleDeclaration }
    );

  document.body.removeChild(normalizer);

  return { props, expectedStyle };
};

export const getProps = (props : string[], received: CSSStyleDeclaration) => {
  return props.reduce((acc, prop) => {
    acc[prop] = received?.getPropertyValue(prop).trim();
    return acc;
  }, {} as StyleDeclaration);

};

export const isSameStyle = (expectedStyle: StyleDeclaration, receivedStyle: StyleDeclaration): boolean => {
  return !!Object.keys(expectedStyle).length &&
    Object.entries(expectedStyle).every(([expectedProp, expectedValue]) => {
      const isCustomProperty = expectedProp.startsWith("--");
      const spellingVariants = [expectedProp];
      expectedProp !== null;

      if (!isCustomProperty)
        spellingVariants.push(expectedProp.toLowerCase());
      return spellingVariants.some(
        (searchProp) => receivedStyle[searchProp] === expectedValue
      );
    });
}

