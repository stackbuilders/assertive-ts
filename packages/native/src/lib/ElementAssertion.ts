import { Assertion, AssertionError } from "@assertive-ts/core";
import { get } from "dot-prop-immutable";
import { ReactTestInstance } from "react-test-renderer";

import { instanceToString, isEmpty } from "./helpers/helpers";

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
   * Check if the component is enabled.
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
   * Check if the element is visible.
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
