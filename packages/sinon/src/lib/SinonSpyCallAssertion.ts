import { Assertion, AssertionError } from "@assertive-ts/core";
import { Constructor } from "@assertive-ts/core/dist/lib/Assertion";
import { ErrorAssertion } from "@assertive-ts/core/dist/lib/ErrorAssertion";
import isDeepEqual from "fast-deep-equal";
import { SinonSpyCall } from "sinon";

import { prettify } from "./helpers/messages";

/**
 * Encapsulates assertion methods applicable to {@link SinonSpyCall} instances.
 * This includes single calls of `Sinon.spy(..)`, `Sinon.stub(..)`,
 * `Sinon.mock()` and `Sinon.fake(..)` as all of them extend from a SinonSpy.
 *
 * @param A the arguments type of the spied function
 * @param R the type return type of the spied function
 */
export class SinonSpyCallAssertion<A extends unknown[], R> extends Assertion<SinonSpyCall<A, R>> {

  private spyName: string;

  public constructor(actual: SinonSpyCall<A, R>) {
    super(actual);
    this.spyName = "proxy" in actual && typeof actual.proxy === "function"
      ? actual.proxy.name
      : "unknown";
  }

  /**
   * Check if the call to this spy have the expected arguments. Each arguments
   * is compared with a strict-deep-equals strategy and must be in the exact
   * same order as called.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) or .mock(..)
   *
   * expect(spy.firstCall).toHaveArgs("foo", 3, true);
   * ```
   *
   * @param expected the expected arguments passed
   * @returns the assertion instance
   */
  public toHaveArgs(...expected: A): this {
    const { args } = this.actual;
    const prettyArgs = expected.map(prettify).join(", ");
    const error = new AssertionError({
      expected,
      message: `Expected <${this.spyName}> to be called with <${prettyArgs}>`,
    });
    const invertedError = new AssertionError({
      actual: args,
      message: `Expected <${this.spyName}> NOT to be called with <${prettyArgs}>`,
    });

    return this.execute({
      assertWhen: isDeepEqual(args, expected),
      error,
      invertedError,
    });
  }

  /**
   * Check if the call to this spy returns the expected value. The value is
   * compared with a strict-deep-equals strategy.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) or .mock(..)
   *
   * expect(spy.firstCall).toReturn({ res: "ok" });
   * ```
   *
   * @param expected the expected value returned by the call
   * @returns the assertion instance
   */
  public toReturn(expected: R): this {
    const { returnValue } = this.actual;
    const error = new AssertionError({
      actual: returnValue,
      expected,
      message: `Expected <${this.spyName}> to return <${prettify(expected)}> when called`,
    });
    const invertedError = new AssertionError({
      actual: returnValue,
      message: `Expected <${this.spyName}> NOT to return <${prettify(expected)}> when called`,
    });

    return this.execute({
      assertWhen: isDeepEqual(returnValue, expected),
      error,
      invertedError,
    });
  }

  /**
   * Check if the call to the spy throws an exception. The thrown values are
   * compared with a strict-deep-equals strategy.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) or .mock(..)
   *
   * expect(spy.firstCall).toThrow("I'm not an error");
   * expect(spy.firstCall).toThrow(new Error("I'm an error"));
   * ```
   *
   * @param exception the exception thrown by the call
   * @returns the assertion instance
   */
  public toThrow(exception?: unknown): this {
    const expected = exception !== undefined
      ? `<${prettify(exception)}>`
      : "when called";
    const error = new AssertionError({
      actual: this.actual.exception,
      expected: exception,
      message: `Expected <${this.spyName}> to throw ${expected}`,
    });
    const invertedError = new AssertionError({
      actual: this.actual.exception,
      message: `Expected <${this.spyName}> NOT to throw ${expected}`,
    });

    return this.execute({
      assertWhen: exception !== undefined
        ? isDeepEqual(this.actual.exception, exception)
        : this.actual.exception !== undefined,
      error,
      invertedError,
    });
  }

  /**
   * Check if the call to this spy throws an `Error`. If the `Expected`
   * constructor is passed, it also checks if the error is an instance of the
   * specific Error type.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) or .mock(..)
   *
   * expect(spy.firstCall).toThrowError(); // any instance of Error
   * expect(spy.firstCall)
   *   .toThrowError(MyCustomError)
   *   .toHaveMessage("Something went wrong!");
   * ```
   *
   * @typeParam E the type of the `Error`
   * @param Expected optional error type constructor to check the thrown error
   *                 against. If is not provided, it defaults to {@link Error}
   * @returns a new {@link ErrorAssertion} to assert over the error
   */
  public toThrowError<E extends Error = Error>(Expected?: Constructor<E>): ErrorAssertion<E> {
    const ExpectedType = Expected ?? Error;
    const error = new AssertionError({
      expected: Expected,
      message: `Expected <${this.spyName}> to throw an <${ExpectedType.name}> instance`,
    });
    const invertedError = new AssertionError({
      actual: this.actual.exception,
      message: `Expected <${this.spyName}> NOT to throw an <${ExpectedType.name}> instance`,
    });

    this.execute({
      assertWhen: this.actual.exception instanceof ExpectedType,
      error,
      invertedError,
    });

    return new ErrorAssertion(this.actual.exception as E);
  }
}
