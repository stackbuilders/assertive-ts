import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

export class BooleanAssertion extends Assertion<boolean> {

  constructor(actual: boolean) {
    super(actual);
  }

  /**
   * Check if the value is `true`.
   *
   * @returns the assertion instance
   */
  public toBeTrue(): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: true,
      message: "Expected value to be true"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected value to NOT be true"
    });

    return this.execute({
      assertWhen: this.actual === true,
      error,
      invertedError
    });
  }

  /**
   * Check if the value is `false`.
   *
   * @returns the assertion instance
   */
  public toBeFalse(): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: false,
      message: "Expected value to be false"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected value to NOT be false"
    });

    return this.execute({
      assertWhen: this.actual === false,
      error,
      invertedError
    });
  }
}
