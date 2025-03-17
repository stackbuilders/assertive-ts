import { Assertion, AssertionError } from "@assertive-ts/core";
import { get } from "dot-prop-immutable";
import { ReactTestInstance } from "react-test-renderer";

export class ElementAssertion extends Assertion<ReactTestInstance> {
  public constructor(actual: ReactTestInstance) {
    super(actual);
  }

  public override toString = (): string => {
    if (this.actual === null) {
      return "null";
    }

    return `<${this.actual.type.toString()} ... />`;
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
      message: `Expected element ${this.toString()} to NOT be disabled.`,
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
      message: `Expected element ${this.toString()} to NOT be enabled.`,
    });

    return this.execute({
      assertWhen: !this.isElementDisabled(this.actual) && !this.isAncestorDisabled(this.actual),
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
}
