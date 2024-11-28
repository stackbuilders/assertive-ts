import { Assertion, AssertionError } from "@assertive-ts/core";
import { get } from "dot-prop-immutable";
import prettyFormat, { plugins } from "pretty-format";
import { ReactTestInstance } from "react-test-renderer";

const { ReactTestComponent, ReactElement } = plugins;

export class ElementAssertion extends Assertion<ReactTestInstance> {
  public constructor(actual: ReactTestInstance) {
    super(actual);
  }

  public override toString = (): string => {
    if (this.actual === null) {
      return "null";
    }

    return prettyFormat(
        {
          // This prop is needed to persuade the prettyFormat that the element
          // is a ReactTestRendererJSON instance, so it is formatted as JSX.
          $$typeof: Symbol.for("react.test.json"),
          props: this.actual.props,
          type: this.actual.type,
        },
        {
          highlight: true,
          plugins: [ReactTestComponent, ReactElement],
          printBasicPrototype: false,
          printFunctionName: false,
        },
    );
  };

   /**
    * Check if the component is diabled.
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
      message: `Expected ${this.toString()} to be disabled`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be disabled",
    });

    return this.execute({
      assertWhen: this.isElementDisabled(this.actual) || this.isAncestorDisabled(this.actual),
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
