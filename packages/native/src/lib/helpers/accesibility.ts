import { get } from "dot-prop-immutable";

import type { ReactTestInstance } from "react-test-renderer";

export function isElementDisabled(element: ReactTestInstance): boolean {
  const { type } = element;
  const elementType = type.toString();
  if (elementType === "TextInput" && element?.props?.editable === false) {
    return true;
  }
  return (
    get(element, "props.aria-disabled")
    || get(element, "props.disabled", false)
    || get(element, "props.accessibilityState.disabled", false)
    || get<ReactTestInstance, string[]>(element, "props.accessibilityStates", []).includes("disabled")
  );
}

export function isAncestorDisabled(element: ReactTestInstance): boolean {
  const { parent } = element;
  return parent !== null && (isElementDisabled(element) || isAncestorDisabled(parent));
}
export function isElementVisible(element: ReactTestInstance): boolean {
  const { type } = element;
  const elementType = type.toString();
  if (elementType === "Modal" && !element?.props?.visible === true) {
    return false;
  }
  return (
    get(element, "props.style.display") !== "none"
    && get(element, "props.style.opacity") !== 0
    && get(element, "props.accessibilityElementsHidden") !== true
    && get(element, "props.importantForAccessibility") !== "no-hide-descendants"
  );
}
export function isAncestorNotVisible(element: ReactTestInstance): boolean {
  const { parent } = element;
  return parent !== null && (!isElementVisible(element) || isAncestorNotVisible(parent));
}
