import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

export class BoolAssertion<T extends boolean> extends Assertion<T> {

  constructor(actual: T) {
    super(actual);
  }

  /**
   * Check if the value is `true`.
   *
   * @returns the assertion instance
   */
  public isTrue(): this {
    if (this.actual !== true) {
      throw new AssertionError({
        actual: this.actual,
        expected: true,
        message: `Expected <${this.actual}> to be true`
      });
    }

    return this;
  }

  /**
   * Check if the value is `false`.
   *
   * @returns the assertion instance
   */
  public isFalse(): this {
    if (this.actual !== false) {
      throw new AssertionError({
        actual: this.actual,
        expected: false,
        message: `Expected <${this.actual}> to be false`
      });
    }

    return this;
  }
}
