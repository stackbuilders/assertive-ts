import { AssertionError } from "assert";
import { isDeepStrictEqual } from "util";

export class Assertion<T> {

  protected readonly actual: T;

  constructor(actual: T) {
    this.actual = actual;
  }

  /**
   * Check the value exists. This means that the value should be neither
   * `null` nor `undefined`.
   */
  public exists(): void {
    if (this.actual === undefined || this.actual === null) {
      throw new AssertionError({
        actual: this.actual,
        message: `Expected <${this.actual}> to exist`
      });
    }
  }

  /**
   * Check the value is `null`.
   */
  public isNull(): void {
    if (this.actual !== null) {
      throw new AssertionError({
        actual: this.actual,
        expected: null,
        message: `Expected <${this.actual}> to be null`
      });
    }
  }

  /**
   * Check the value is present. This means that the value should not be
   * `undefined`.
   */
  public isPresent(): void {
    if (this.actual === undefined) {
      throw new AssertionError({
        actual: this.actual,
        message: "Expected the value to be present"
      });
    }
  }

  /**
   * Check the value is a truthy value. There are six falsy values in JavaScript:
   * `null`, `undefined`, `0`, `""`, `false`, `NaN`. Everything else is truthy.
   */
  public isTruthy(): void {
    if (!this.actual) {
      throw new AssertionError({
        actual: this.actual,
        message: `Expected <${this.actual}> to be a truthy value`
      });
    }
  }

  /**
   * Check the value is a falsy value. There are six falsy values in JavaScript:
   * `null`, `undefined`, `0`, `""`, `false`, `NaN`. Everything else is truthy.
   */
  public isFalsy(): void {
    if (this.actual) {
      throw new AssertionError({
        actual: this.actual,
        message: `Expected <${this.actual}> to be a falsy value`
      });
    }
  }

  /**
   * Check the value is deep equal to another value.
   *
   * @param expected the value to compare for deep equality
   */
  public isEqualTo(expected: T): void {
    if (!isDeepStrictEqual(this.actual, expected)) {
      throw new AssertionError({
        actual: this.actual,
        expected,
        message: "Expected both values to be deep equal"
      });
    }
  }

  /**
   * Check the value is shallow equal to another value.
   *
   * @param expected the value to compare for shallow equality
   */
  public isSimilarTo<U extends T>(expected: U): void {
    if (isNumber(this.actual) && isNumber(expected) && isNaN(this.actual) && isNaN(expected)) {
      return;
    }

    // tslint:disable-next-line: triple-equals
    if (this.actual != expected) {
      throw new AssertionError({
        actual: this.actual,
        expected,
        message: "Expected both values to be similar"
      });
    }
  }

  /**
   * Check the value is the same as another value.
   *
   * @param expected the value to compare for referential equality
   */
  public isSameAs(expected: T): void {
    if (!Object.is(this.actual, expected)) {
      throw new AssertionError({
        actual: this.actual,
        expected,
        message: "Expected both values to be the same"
      });
    }
  }
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
