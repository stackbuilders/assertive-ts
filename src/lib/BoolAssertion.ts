import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

export class BoolAssertion<T extends boolean> extends Assertion<T> {

  constructor(actual: T) {
    super(actual);
  }

  /**
   * Check the value is `true`.
   */
  public isTrue() {
    if (this.actual !== true) {
      throw new AssertionError({
        actual: this.actual,
        expected: true,
        message: `Expected <${this.actual}> to be true`
      });
    }
  }

  /**
   * Check the value is `false`.
   */
  public isFalse() {
    if (this.actual !== false) {
      throw new AssertionError({
        actual: this.actual,
        expected: false,
        message: `Expected <${this.actual}> to be false`
      });
    }
  }
}
