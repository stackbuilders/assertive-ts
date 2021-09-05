import { AssertionError } from "assert";
import { isDeepStrictEqual } from "util";

interface ExecuteOptions {
  /**
   * The condition for when the assertion should pass. The negation of this
   * condition is also used for the `.not` case of the assertion
   */
  assertWhen: boolean;
  /**
   * The assertion error to throw when the condition is not fullfiled
   */
  error: AssertionError;
  /**
   * The assertion error to throw given the condition was inverted (`.not`),
   * and it is also not fullfilled
   */
  invertedError: AssertionError;
}

export class Assertion<T> {

  protected readonly actual: T;

  protected readonly inverted: boolean;

  public readonly not: this;

  constructor(actual: T) {
    this.actual = actual;
    this.inverted = false;

    this.not = new Proxy(this, { get: this.proxyInverter(true) });
  }

  private proxyInverter(isInverted: boolean): ProxyHandler<this>["get"] {
    return (target, p) => {
      const key = isKeyOf(target, p) ? p : undefined;

      if (key === "inverted") {
        return isInverted;
      }

      return key ? target[key] : undefined;
    };
  }

  /**
   * A convinince method to execute the assertion. The inversion logic for
   * `.not` is already embedded in this method, so this should always be used
   * in assertions to keep the negation system working
   *
   * @param options the execution options for the assertion
   * @returns the Assertion instance if no error was thrown
   */
  protected execute(options: ExecuteOptions): this {
    const { assertWhen, error, invertedError } = options;

    if (!assertWhen && !this.inverted) {
      throw error;
    }

    if (assertWhen && this.inverted) {
      throw invertedError;
    }

    return this.inverted
      ? new Proxy(this, { get: this.proxyInverter(false) })
      : this;
  }

  /**
   * Check if the assertion passes using a generic matcher function. That is,
   * if the matcher function returns true, the assertion passes, otherwise it
   * fails.
   *
   * As a convenience, the matcher function recieves the actual value in its
   * first argument, and a boolean in its second which indicates it the logic
   * was inverted by the `.not` operator
   *
   * @param matcher a generic matcher function
   * @returns the assertion instance
   */
  public toMatch(matcher: (actual: T, inverted: boolean) => boolean): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected matcher function to return true"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected matcher function NOT to return true"
    });

    return this.execute({
      assertWhen: matcher(this.actual, this.inverted),
      error,
      invertedError
    });
  }

  /**
   * Check if the value exists. This means that the value should be neither
   * `null` nor `undefined`.
   *
   * @returns the assertion instance
   */
  public toExist(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected value to exist, but it was <${this.actual}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected value to NOT exist, but it was <${this.actual}>`
    });

    return this.execute({
      assertWhen: this.actual !== undefined && this.actual !== null,
      error,
      invertedError
    });
  }

  /**
   * Check if the value is `null`.
   *
   * @returns the assertion instance
   */
  public toBeNull(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be null`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be null"
    });

    return this.execute({
      assertWhen: this.actual === null,
      error,
      invertedError
    });
  }

  /**
   * Check if the value is present. This means that the value should not be
   * `undefined`.
   *
   * @returns the assertion instance
   */
  public toBePresent(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected the value to be present"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be present"
    });

    return this.execute({
      assertWhen: this.actual !== undefined,
      error,
      invertedError
    });
  }

  /**
   * Check if the value is a truthy value. There are six falsy values in
   * JavaScript: `null`, `undefined`, `0`, `""`, `false`, `NaN`. Everything
   * else is truthy.
   *
   * @returns the assertion instance
   */
  public toBeTruthy(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be a truthy value`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be a truthy value`
    });

    return this.execute({
      assertWhen: !!this.actual,
      error,
      invertedError
    });
  }

  /**
   * Check if the value is a falsy value. There are six falsy values in
   * JavaScript: `null`, `undefined`, `0`, `""`, `false`, `NaN`. Everything
   * else is truthy.
   *
   * @returns the assertion instance
   */
  public toBeFalsy(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be a falsy value`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be a falsy value`
    });

    return this.execute({
      assertWhen: !this.actual,
      error,
      invertedError
    });
  }

  /**
   * Check if the value is deep equal to another value.
   *
   * @param expected the value to compare for deep equality
   * @returns the assertion instance
   */
  public toBeEqual(expected: T): this {
    const error = new AssertionError({
      actual: this.actual,
      expected,
      message: "Expected both values to be deep equal"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected both values to NOT be deep equal"
    });

    return this.execute({
      assertWhen: isDeepStrictEqual(this.actual, expected),
      error,
      invertedError
    });
  }

  /**
   * Check if the value is shallow equal to another value.
   *
   * @param expected the value to compare for shallow equality
   * @returns the assertion instance
   */
  public toBeSimilar(expected: T): this {
    const error = new AssertionError({
      actual: this.actual,
      expected,
      message: "Expected both values to be similar"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected both values to NOT be similar"
    });

    const areShallowEqual = (): boolean => {
      if (isObject(this.actual) && isObject(expected)) {
        const actualKeys = Object.keys(this.actual) as Array<keyof T>;
        const expectedKeys = Object.keys(expected) as Array<keyof T>;
        const sizeMatch = actualKeys.length === expectedKeys.length;
        const valuesMatch = actualKeys.every(key => this.actual[key] === expected[key]);

        return sizeMatch && valuesMatch;
      }

      return false;
    };

    const areBothNaN = isNumber(this.actual) && isNumber(expected) && isNaN(this.actual) && isNaN(expected);

    return this.execute({
      assertWhen: areShallowEqual() || areBothNaN || this.actual === expected,
      error,
      invertedError
    });
  }

  /**
   * Check if the value is the same as another value.
   *
   * @param expected the value to compare for referential equality
   * @returns the assertion instance
   */
  public toBeSame(expected: T): this {
    const error = new AssertionError({
      actual: this.actual,
      expected,
      message: "Expected both values to be the same"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected both values to NOT be the same"
    });

    return this.execute({
      assertWhen: this.actual === expected,
      error,
      invertedError
    });
  }
}

function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function isKeyOf<T>(target: T, key: unknown): key is keyof T {
  return (typeof key === "string" || typeof key === "symbol") && key in target;
}
