import { AssertionError } from "assert";
import { isDeepStrictEqual } from "util";

import { UnsupportedOperationError } from "./errors/UnsupportedOperationError";
import { isJSObject, isKeyOf } from "./helpers/guards";
import { TypeFactory } from "./helpers/TypeFactories";

export interface Constructor<T> extends Function {
  prototype: T;
}

export interface ExecuteOptions {
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

/**
 * Base class for all assertions.
 *
 * @param T the type of the `actual` value
 */
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
   * A convenience method to execute the assertion. The inversion logic for
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
   * Check if the value matches the given predicate.
   *
   * @param matcher a matcher predicate
   * @returns the assertion instance
   */
  public toMatch(matcher: (actual: T) => boolean): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected matcher predicate to return true"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected matcher predicate NOT to return true"
    });

    return this.execute({
      assertWhen: matcher(this.actual),
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
   * Check if the value is `undefined`
   *
   * @returns the assertion instance
   */
  public toBeUndefined(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be undefined`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be undefined"
    });

    return this.execute({
      assertWhen: this.actual === undefined,
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
   * Check if the value is an instance of the provided constructor.
   *
   * @example
   * ```
   * expect(pontiac).toBeInstanceOf(Car);
   *
   * expect(today).toBeInstanceOf(Date);
   * ```
   *
   * @param Expected the constructor the value should be an instance
   * @returns the assertion instance
   */
  public toBeInstanceOf(Expected: Constructor<any>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected value to be an instance of <${Expected.name}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected value NOT to be an instance of <${Expected.name}>`
    });

    return this.execute({
      assertWhen: this.actual instanceof Expected,
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
      if (this.actual instanceof Date && expected instanceof Date) {
        return this.actual.getTime() === expected.getTime();
      }

      if (isJSObject(this.actual) && isJSObject(expected)) {
        const actualKeys = Object.keys(this.actual);
        const expectedKeys = Object.keys(expected);
        const sizeMatch = actualKeys.length === expectedKeys.length;
        const valuesMatch = actualKeys.every(key => this.actual[key] === expected[key]);

        return sizeMatch && valuesMatch;
      }

      return false;
    };

    const areBothNaN = typeof this.actual === "number"
      && typeof expected === "number"
      && isNaN(this.actual)
      && isNaN(expected);

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

  /**
   * Check first if the value is of some specific type, in which case returns
   * an assertion instance for that specific type. The new assertion is built
   * from a factory that should extend from the base {@link Assertion} class.
   *
   * We provide some basic factories in `TypeFactories`. If you need some
   * other factory for a custom assertion for instance, you can easily create
   * one from a Factory reference and a predicate.
   *
   * @example
   * ```
   * expect(unknownValue)
   *   .asType(TypeFactories.STRING)
   *   .toStartWith("/api/");
   *
   * expect(uuid)
   *   .asType({
   *     Factory: UUIDAssertion, // a custom UUID assertion
   *     predicate: (value): value is UUID => typeof value === "string" && UUID.PATTER.test(value)
   *   })
   *   .isValid();
   * ```
   *
   * @typeParam S the type of the factory's value
   * @typeParam A the type of the assertion factory
   * @param typeFactory a factory to assert the type and create an assertion
   * @returns a more specific assertion based on the factory type
   */
  public asType<S, A extends Assertion<S>>(typeFactory: TypeFactory<S, A>): A {
    const { Factory, predicate, typeName } = typeFactory;

    if (this.inverted) {
      throw new UnsupportedOperationError("The `.not` modifier is not allowed on `.asType(..)` method");
    }

    if (predicate(this.actual)) {
      return new Factory(this.actual);
    }

    throw new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be of type "${typeName}"`
    });
  }
}
