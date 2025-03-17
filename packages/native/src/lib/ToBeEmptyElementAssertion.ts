import { Assertion, AssertionError } from "@assertive-ts/core";
import { ReactTestInstance } from "react-test-renderer";

import { isEmpty } from "./helpers/helpers";

/**
 * Assertion for checking if a React element is empty.
 */
export class ToBeEmptyElementAssertion extends Assertion<ReactTestInstance> {
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
   * Check if the element is empty.
   *
   * @example
   * ```
   * expect(element).toBeEmptyElement();
   * ```
   *
   * @returns the assertion instance
   */
  public toBeEmptyElement(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} to be empty.`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected element ${this.toString()} to NOT be empty.`,
    });

    return this.execute({
      assertWhen: isEmpty(this.actual),
      error,
      invertedError,
    });
  }
}
