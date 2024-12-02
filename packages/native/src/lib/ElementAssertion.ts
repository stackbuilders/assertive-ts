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

    return `<${this.actual.type.toString()} testID="${this.actual.props.testID}"... />`;
  };

   /**
    * Check if the component is disabled.
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
      message: `Received element ${this.toString()} is enabled.`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Received element ${this.toString()} is disabled.`,
    });

    return this.execute({
      assertWhen: this.isElementDisabled(this.actual) || this.isAncestorDisabled(this.actual),
      error,
      invertedError,
    });
  }

  public toBeEnabled(): this {
    return this.not.toBeDisabled();
  }

  private isElementDisabled(element: ReactTestInstance): boolean {
    const { type } = element;
    const elementType = type.toString();
    if (elementType === "TextInput" && element?.props?.editable === false) {
      return true;
    }

    return (
        get(element, "props.aria-disabled") ||
        get(element, "props.disabled", false) ||
        get(element, "props.accessibilityState.disabled", false) ||
        get<ReactTestInstance, [string]>(element, "props.accessibilityStates", []).includes("disabled")
    );
  }

  private isAncestorDisabled(element: ReactTestInstance): boolean {
    const { parent } = element;
    return parent !== null && (this.isElementDisabled(element) || this.isAncestorDisabled(parent));
  }
}
