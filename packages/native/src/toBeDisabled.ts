/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { matcherHint } from "jest-matcher-utils";
import type { ReactTestInstance } from "react-test-renderer";

import { checkReactElement, getType } from "./utils";

type Response = {
  message: () => string;
  pass: boolean;
};

// Elements that support 'disabled'
const DISABLE_TYPES = [
  "Button",
  "Slider",
  "Switch",
  "Text",
  "TouchableHighlight",
  "TouchableOpacity",
  "TouchableWithoutFeedback",
  "TouchableNativeFeedback",
  "View",
  "TextInput",
  "Pressable",
];

function isElementDisabled(element: ReactTestInstance): boolean {
  if (getType(element) === "TextInput" && element?.props?.editable === false) {
    return true;
  }

  if (!DISABLE_TYPES.includes(getType(element))) {
    return false;
  }

  return (
    !!element?.props?.disabled ||
    !!element?.props?.accessibilityState?.disabled ||
    !!element?.props?.accessibilityStates?.includes("disabled")
  );
}

function isAncestorDisabled(element: ReactTestInstance): boolean {
  const parent = element.parent;
  return parent !== null && (isElementDisabled(element) || isAncestorDisabled(parent));
}

export function toBeDisabled(matcherContext: jest.MatcherContext, element: ReactTestInstance): Response {
  checkReactElement(element);

  const isDisabled = isElementDisabled(element) || isAncestorDisabled(element);

  return {
    message: () => {
      const is = isDisabled ? "is" : "is not";
      return [
        // eslint-disable-next-line no-invalid-this
        matcherHint(`${matcherContext.isNot ? ".not" : ""}.toBeDisabled`, "element", ""),
        "",
        `Received element ${is} disabled:`,
        element,
      ].join("\n");
    },
    pass: isDisabled,
  };
}
