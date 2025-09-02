import { Assertion, AssertionError } from "@assertive-ts/core";
import { get } from "dot-prop-immutable";
import { ReactTestInstance } from "react-test-renderer";

import { instanceToString, isEmpty, getFlattenedStyle  } from "./helpers/helpers";
import { AssertiveStyle } from "./helpers/types";

export class ElementAssertion extends Assertion<ReactTestInstance> {
  public constructor(actual: ReactTestInstance) {
    super(actual);
  }

  public override toString = (): string => {
    return instanceToString(this.actual);
  };

  /**
   * Check if the component is disabled or has been disabled by an ancestor.
   *
   * @example
   * ```
   * expect(component).toBeDisabled();
   * ```
   *
   * @returns the assertion instance
   */
  public toBeDisabled(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} to be disabled.`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} NOT to be disabled.`,
    });

    return this.execute({
      assertWhen: this.isElementDisabled(this.actual) || this.isAncestorDisabled(this.actual),
      error,
      invertedError,
    });
  }

  /**
   * Check if the component is enabled and has not been disabled by an ancestor.
   *
   * @example
   * ```
   * expect(component).toBeEnabled();
   * ```
   * @returns the assertion instance
   */
  public toBeEnabled(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} to be enabled.`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} NOT to be enabled.`,
    });

    return this.execute({
      assertWhen: !this.isElementDisabled(this.actual) && !this.isAncestorDisabled(this.actual),
      error,
      invertedError,
    });
  }

  /**
   * Check if the element is empty.
   *
   * @example
   * ```
   * expect(element).toBeEmpty();
   * ```
   *
   * @returns the assertion instance
   */
  public toBeEmpty(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} to be empty.`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} NOT to be empty.`,
    });

    return this.execute({
      assertWhen: isEmpty(this.actual.children),
      error,
      invertedError,
    });
  }

  /**
   * Check if the element is visible and has not been hidden by an ancestor.
   *
   * @example
   * ```
   * expect(element).toBeVisible();
   * ```
   *
   * @returns the assertion instance
   */
  public toBeVisible(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} to be visible.`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} NOT to be visible.`,
    });

    return this.execute({
      assertWhen: this.isElementVisible(this.actual) && !this.isAncestorNotVisible(this.actual),
      error,
      invertedError,
    });
  }

  /**
   * Check if an element is contained within another element.
   *
   * @example
   * ```
   * expect(parent).toContainElement(child);
   * ```
   *
   * @param element - The element to check for.
   * @returns the assertion instance
   */
  public toContainElement(element: ReactTestInstance): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} to contain element ${instanceToString(element)}.`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} NOT to contain element ${instanceToString(element)}.`,
    });

    const isElementContained = (
      parentElement: ReactTestInstance,
      childElement: ReactTestInstance,
    ): boolean => {
      if (parentElement === null || childElement === null) {
        return false;
      }

      return (
        parentElement.findAll(
          node =>
            node.type === childElement.type && node.props === childElement.props,
        ).length > 0
      );
    };

    return this.execute({
      assertWhen: isElementContained(this.actual, element),
      error,
      invertedError,
    });
  }

  /**
   * Check if the element has a specific property or a specific property value.
   *
   * @example
   * ```
   * expect(element).toHaveProp("propName");
   * expect(element).toHaveProp("propName", "propValue");
   * ```
   *
   * @param propName - The name of the prop to check for.
   * @param value - The value of the prop to check for.
   * @returns the assertion instance
   */
  public toHaveProp(propName: string, value?: unknown): this {
    const propValue: unknown = get(this.actual, `props.${propName}`, undefined);
    const hasProp = propValue !== undefined;
    const isPropEqual = value === undefined || propValue === value;

    const errorMessage = value === undefined
      ? `Expected element ${this.toString()} to have prop '${propName}'.`
      : `Expected element ${this.toString()} to have prop '${propName}' with value '${String(value)}'.`;

    const invertedErrorMessage = value === undefined
      ? `Expected element ${this.toString()} NOT to have prop '${propName}'.`
      : `Expected element ${this.toString()} NOT to have prop '${propName}' with value '${String(value)}'.`;

    const error = new AssertionError({ actual: this.actual, message: errorMessage });
    const invertedError = new AssertionError({ actual: this.actual, message: invertedErrorMessage });

    return this.execute({
      assertWhen: hasProp && isPropEqual,
      error,
      invertedError,
    });
  }

  /**
   * Asserts that a component has the specified style(s) applied.
   *
   * This method supports both single style objects and arrays of style objects.
   * It checks if all specified style properties match on the target element.
   *
   * @example
   * ```
   * expect(element).toHaveStyle({ backgroundColor: "red" });
   * expect(element).toHaveStyle([{ backgroundColor: "red" }]);
   * ```
   *
   * @param style - A style object to check for.
   * @returns the assertion instance
   */
  public toHaveStyle(style: AssertiveStyle): this {
    const stylesOnElement: AssertiveStyle = get(this.actual, "props.style", {});

    const flattenedElementStyle = getFlattenedStyle(stylesOnElement);
    const flattenedStyle = getFlattenedStyle(style);

    const hasStyle = Object.keys(flattenedStyle)
                           .every(key => flattenedElementStyle[key] === flattenedStyle[key]);

    const error = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} to have style ${JSON.stringify(flattenedStyle)}.`,
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} NOT to have style ${JSON.stringify(flattenedStyle)}.`,
    });

    return this.execute({
      assertWhen: hasStyle,
      error,
      invertedError,
    });
  }

  private isElementDisabled(element: ReactTestInstance): boolean {
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

  private isAncestorDisabled(element: ReactTestInstance): boolean {
    const { parent } = element;
    return parent !== null && (this.isElementDisabled(element) || this.isAncestorDisabled(parent));
  }

  private isElementVisible(element: ReactTestInstance): boolean {
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

  private isAncestorNotVisible(element: ReactTestInstance): boolean {
    const { parent } = element;
    return parent !== null && (!this.isElementVisible(element) || this.isAncestorNotVisible(parent));
  }
}
