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
  public isTrue(): this {
    if (this.actual === true) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      expected: true,
      message: `Expected <${this.actual}> to be true`
    });
  }

  /**
   * Check if the value is `false`.
   *
   * @returns the assertion instance
   */
  public isFalse(): this {
    if (this.actual === false) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      expected: false,
      message: `Expected <${this.actual}> to be false`
    });
  }
}
