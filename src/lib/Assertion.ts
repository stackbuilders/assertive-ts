import { AssertionError } from "assert";
import { isDeepStrictEqual } from "util";

interface TryResult<T> {
  hasError: boolean;
  instance: T;
}

export class Assertion<T> {

  protected readonly actual: T;

  protected notError?: AssertionError;

  public readonly not: this;

  constructor(actual: T) {
    this.actual = actual;

    this.not = new Proxy(this, {
      get(target, key) {
        const prop = isKeyOf(target, key)
          ? target[key]
          : undefined;

        if (typeof prop === "function") {
          return (...args: unknown[]) => {
            const { hasError, instance } = target.tryAssertion(prop, args);

            if (!hasError) {
              const message: string = `WARNING! No assertion error defined for ".not.${String(key)}"`;

              throw instance.notError ?? new AssertionError({ message });
            }

            return instance;
          };
        }

        return prop;
      }
    });
  }

  private tryAssertion(prop: this[keyof this] & Function, args: unknown[]): TryResult<this> {
    try {
      const instance = prop.apply(this, args);

      return {
        hasError: false,
        instance
      };
    } catch (error) {
      return {
        hasError: true,
        instance: this
      };
    }
  }

  /**
   * Check if the value exists. This means that the value should be neither
   * `null` nor `undefined`.
   *
   * @returns the assertion instance
   */
  public exists(): this {
    const notError = new AssertionError({
      actual: this.actual,
      message: `Expected value to NOT exist, but is was <${this.actual}>`
    });

    if (this.actual !== undefined && this.actual !== null) {
      return { ...this, notError };
    }

    throw new AssertionError({
      actual: this.actual,
      message: `Expected value to exist, but it was <${this.actual}>`
    });
  }

  public notExist(): this {
    if (this.actual === undefined || this.actual === null) {
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

function isKeyOf<T>(target: T, key: unknown): key is keyof T {
  return (typeof key === "string" || typeof key === "symbol") && key in target;
}
