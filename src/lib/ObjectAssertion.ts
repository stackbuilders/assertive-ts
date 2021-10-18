import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

export class ObjectAssertion<T extends object> extends Assertion<T> {
  constructor(actual: T) {
    super(actual);
  }

  /**
   * Check if the object is empty. That is, when the object doesn't have any properties.
   *
   * @returns the assertion instance
   */
  public toBeEmptyObject(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the value to be an empty object`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the value NOT to be an empty object`,
    });

    return this.execute({
      assertWhen: Object.keys(this.actual).length === 0,
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains the provided value.
   *
   * @param value
   * @returns the assertion instance
   */

  public toContain(value: T[keyof T]): this;

  /**
   * Check if the object contains the provided entry.
   *
   * @param value
   * @param key
   * @returns the assertion instance
   */

  public toContain<K extends keyof T>(value: T[K], key: K): this;

  public toContain<K extends keyof T>(value: T[K], key?: K): this {
    const error = new AssertionError({
      actual: this.actual,
      message:
        key != undefined
          ? `Expected the object's key <${key}> to contain the provided value <${value}>`
          : `Expected the object to contain the provided value <${value}>`,
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message:
        key != undefined
          ? `Expected the object's key <${key}> NOT to contain the provided value <${value}>`
          : `Expected the object NOT to contain the provided value <${value}>`,
    });
    return this.execute({
      assertWhen:
        key != undefined
          ? this.actual[key] === value
          : Object.values(this.actual).includes(value),
      error,
      invertedError,
    });
  }
}
