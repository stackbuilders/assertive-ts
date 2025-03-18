import { Assertion, AssertionError } from "@assertive-ts/core";
import { ReactTestInstance } from "react-test-renderer";

import { instanceToString, isEmpty } from "./helpers/helpers";

/**
 * Assertion for checking if a React element is empty.
 */
export class ToBeEmptyAssertion extends Assertion<ReactTestInstance> {
  public constructor(actual: ReactTestInstance) {
    super(actual);
  }

  public override toString = (): string => {
    return instanceToString(this.actual);
  };

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
}
