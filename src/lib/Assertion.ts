import { AssertionError } from "assert";
import { isDeepStrictEqual } from "util";

export class Assertion<T> {

  protected readonly actual: T;

  constructor(actual: T) {
    this.actual = actual;
  }

  /**
   * Check if the value exists. This means that the value should be neither
   * `null` nor `undefined`.
   *
   * @returns the assertion instance
   */
  public exists(): this {
    if (this.actual !== undefined && this.actual !== null) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      message: `Expected value to exist, but it was <${this.actual}>`
    });
  }

  /**
   * Check if the value is `null`.
   *
   * @returns the assertion instance
   */
  public isNull(): this {
    if (this.actual === null) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      expected: null,
      message: `Expected <${this.actual}> to be null`
    });
  }

  /**
   * Check if the value is present. This means that the value should not be
   * `undefined`.
   *
   * @returns the assertion instance
   */
  public isPresent(): this {
    if (this.actual !== undefined) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      message: "Expected the value to be present"
    });
  }

  /**
   * Check if the value is a truthy value. There are six falsy values in
   * JavaScript: `null`, `undefined`, `0`, `""`, `false`, `NaN`. Everything
   * else is truthy.
   *
   * @returns the assertion instance
   */
  public isTruthy(): this {
    if (this.actual) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be a truthy value`
    });
  }

  /**
   * Check if the value is a falsy value. There are six falsy values in
   * JavaScript: `null`, `undefined`, `0`, `""`, `false`, `NaN`. Everything
   * else is truthy.
   *
   * @returns the assertion instance
   */
  public isFalsy(): this {
    if (!this.actual) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be a falsy value`
    });
  }

  /**
   * Check if the value is deep equal to another value.
   *
   * @param expected the value to compare for deep equality
   * @returns the assertion instance
   */
  public isEqualTo(expected: T): this {
    if (isDeepStrictEqual(this.actual, expected)) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      expected,
      message: "Expected both values to be deep equal"
    });
  }

  /**
   * Check if the value is shallow equal to another value.
   *
   * @param expected the value to compare for shallow equality
   * @returns the assertion instance
   */
  public isSimilarTo(expected: T): this {
    if (isObject(this.actual) && isObject(expected)) {
      const actualKeys = Object.keys(this.actual) as Array<keyof T>;
      const expectedKeys = Object.keys(expected) as Array<keyof T>;
      const sizeMatch = actualKeys.length === expectedKeys.length;
      const valuesMatch = actualKeys.every(key => this.actual[key] === expected[key]);

      if (sizeMatch && valuesMatch) {
        return this;
      }
    }

    if (isNumber(this.actual) && isNumber(expected) && isNaN(this.actual) && isNaN(expected)) {
      return this;
    }

    if (this.actual === expected) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      expected,
      message: "Expected both values to be similar"
    });
  }

  /**
   * Check the value is the same as another value.
   *
   * @param expected the value to compare for referential equality
   * @returns the assertion instance
   */
  public isSameAs(expected: T): this {
    if (this.actual === expected) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      expected,
      message: "Expected both values to be the same"
    });
  }
}

function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
