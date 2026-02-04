import { AssertionError } from "assert";

import isDeepEqual from "fast-deep-equal/es6";

import { Assertion, type Constructor } from "./Assertion";
import { ErrorAssertion } from "./ErrorAssertion";
import { prettify } from "./helpers/messages";

import type { TypeFactory } from "./helpers/TypeFactories";

export type AnyFunction = (...args: unknown[]) => unknown;

/**
 * Helper symbol used to indicate that no error was captured during
 * the assertion.
 *
 * @hidden
 */
const NoThrow = Symbol("NoThrow");

/**
 * Encapsulates assertion methods applicable to functions.
 *
 * @param T the type of the function's signature
 */
export class FunctionAssertion<T extends AnyFunction> extends Assertion<T> {
  public constructor(actual: T) {
    super(actual);
  }

  /**
   * Check if the function throws when called. Optionally, you can check that
   * the thrown error is strictly equal to an `Error` instance by passing it as
   * a parameter.
   *
   * @example
   * ```
   * expect(throwingFunction).toThrow();
   * expect(throwingFunction).toThrow(myErrorInstance);
   * ```
   *
   * @param error the error the function should throw
   * @returns the assertion instance
   */
  public toThrow<E extends Error>(error?: E): this {
    const captured = this.captureError();

    if (error !== undefined) {
      return this.execute({
        assertWhen: isDeepEqual(captured, error),
        error: new AssertionError({
          actual: captured,
          expected: error,
          message: `Expected the function to throw - ${prettify(error)}`,
        }),
        invertedError: new AssertionError({
          actual: this.actual,
          message: `Expected the function NOT to throw - ${prettify(error)}`,
        }),
      });
    }

    return this.execute({
      assertWhen: captured !== NoThrow,
      error: new AssertionError({
        actual: captured,
        message: "Expected the function to throw when called",
      }),
      invertedError: new AssertionError({
        actual: captured,
        message: "Expected the function NOT to throw when called",
      }),
    });
  }

  /**
   * Check if the function throws an `Error`. If the `ErrorType` is passed,
   * it also checks if the error is an instance of the specific type.
   *
   * @example
   * ```
   * expect(throwingFunction)
   *   .toThrowError()
   *   .toHaveMessage("Oops! Something went wrong...")
   *
   * expect(myCustomFunction)
   *   .toThrowError(MyCustomError)
   *   .toHaveMessage("Something failed!");
   * ```
   *
   * @typeParam E the type of the `Error`
   * @param ExpectedType optional error type constructor to check the thrown
   *                  error against. If is not provided, it defaults to
   *                  {@link Error}
   * @returns a new {@link ErrorAssertion} to assert over the error
   */
  public toThrowError(): ErrorAssertion<Error>;
  public toThrowError<E extends Error>(Expected: Constructor<E>): ErrorAssertion<E>;
  public toThrowError<E extends Error>(Expected?: Constructor<E>): ErrorAssertion<E> {
    const captured = this.captureError();

    if (captured === NoThrow) {
      throw new AssertionError({
        actual: captured,
        message: "Expected the function to throw when called",
      });
    }

    const ErrorType = Expected ?? Error;
    const error = new AssertionError({
      actual: captured,
      message: `Expected the function to throw an error instance of <${ErrorType.name}>`,
    });
    const invertedError = new AssertionError({
      actual: captured,
      message: `Expected the function NOT to throw an error instance of <${ErrorType.name}>`,
    });

    this.execute({
      assertWhen: captured instanceof ErrorType,
      error,
      invertedError,
    });

    return new ErrorAssertion(captured as E);
  }

  /**
   * Check if the function throws a non-error value when called. Additionally,
   * you can pass a {@link TypeFactory} in the second argument so the returned
   * assertion is for the specific value type. Otherwise, a basic
   * {@link Assertion Assertion<unknown>} instance is returned.
   *
   * @example
   * ```
   * expect(raiseValue)
   *   .toThrowValue()
   *   .toBeEqual(someValue);
   *
   * expect(raiseExitCode)
   *   .toThrowValue(TypeFactories.Number)
   *   .toBeNegative();
   * ```
   *
   * @typeParam S the type of the factory's value
   * @typeParam A the type of the assertion factory
   * @param expected the value the function is expected to throw
   * @param typeFactory optional type factory to perform more specific
   *                    assertions over the thrown value
   * @returns the factory assertion or a basic assertion instance
   */
  public toThrowValue<S, A extends Assertion<S>>(typeFactory?: TypeFactory<S, A>): A {
    const captured = this.captureError();

    if (captured === NoThrow) {
      throw new AssertionError({
        actual: captured,
        message: "Expected the function to throw a value",
      });
    }

    const error = new AssertionError({
      actual: captured,
      message: typeFactory
        ? `Expected the function to throw a value of type "${typeFactory.typeName}"`
        : "Expected the function to throw a value",
    });
    const invertedError = new AssertionError({
      actual: captured,
      message: typeFactory
        ? `Expected the function NOT to throw a value of type "${typeFactory.typeName}"`
        : "Expected the function NOT to throw a value",
    });
    const isTypeMatch = typeFactory?.predicate(captured) ?? true;

    this.execute({
      assertWhen: captured !== NoThrow && isTypeMatch,
      error,
      invertedError,
    });

    return typeFactory?.predicate(captured)
      ? new typeFactory.Factory(captured)
      : new Assertion(captured) as A;
  }

  private captureError<X>(): typeof NoThrow | X {
    try {
      this.actual();
      return NoThrow;
    } catch (error) {
      return error as X;
    }
  }
}
