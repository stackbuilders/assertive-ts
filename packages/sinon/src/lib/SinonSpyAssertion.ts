import { Assertion, AssertionError } from "@assertive-ts/core";
import isDeepEqual from "fast-deep-equal";

import { SinonSpyCallAssertion } from "./SinonSpyCallAssertion";
import { callTimes, numeral, prettify } from "./helpers/messages";

import type { SinonSpy } from "sinon";

/**
 * Encapsulates assertion methods applicable to {@link SinonSpy} instances.
 * This includes `Sinon.spy(..)`, `Sinon.stub(..)`, `Sinon.mock()` and
 * `Sinon.fake(..)` as all of them extend from a SinonSpy.
 *
 * @param A the arguments type of the spied function
 * @param R the type return type of the spied function
 */
export class SinonSpyAssertion<A extends unknown[], R> extends Assertion<SinonSpy<A, R>> {
  public constructor(actual: SinonSpy<A, R>) {
    super(actual);
  }

  /**
   * Check if the spy was called exactly a number of times. If the argument is
   * omited it defaults to one.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy).tobeCalled(); // exactly once
   * expect(spy).toBeCalled(3); // exacty 3 times
   * ```
   *
   * @param times the number of times the spy is called. Defaults to `1`.
   * @returns the assertion instance
   */
  public toBeCalled(times: number = 1): this {
    if (times < 0) {
      throw new Error("Spy cannot be called less than zero times!");
    }

    const { callCount, name } = this.actual;
    const error = new AssertionError({
      actual: callCount,
      expected: times,
      message: `Expected <${name}> to be called ${numeral(times)}, but it was ${callTimes(callCount)}`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${name}> NOT to be called ${numeral(times)}, but it was ${callTimes(callCount)}`,
    });

    return this.execute({
      assertWhen: callCount === times,
      error,
      invertedError,
    });
  }

  /**
   * Check if the spy was called exactly once and return a
   * {@link SinonSpyAssertion} instance of the first call. This allows to make
   * more specific verifications over the spy.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy)
   *   .tobeCalledOnce()
   *   .toReturn(..);
   * ```
   *
   * @returns a {@link SinonSpyCallAssertion} instance of the first call
   */
  public toBeCalledOnce(): SinonSpyCallAssertion<A, R> {
    const { actual } = this.toBeCalled(1);

    return new SinonSpyCallAssertion(actual.firstCall);
  }

  /**
   * Check if the spy was called exactly twice. This is a more explicit name of
   * calling `.toBeCalled(2)`.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy).tobeCalledTwice();
   * ```
   *
   * @returns the assertion instance
   */
  public toBeCalledTwice(): this {
    return this.toBeCalled(2);
  }

  /**
   * Check if the spy was called exactly thrice. This is a more explicit name of
   * calling `.toBeCalled(3)`.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy).toBeCalledThrice();
   * ```
   *
   * @returns the assertion instance
   */
  public toBeCalledThrice(): this {
    return this.toBeCalled(3);
  }

  /**
   * Check if the spy was called at least a specific number of times.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy).toBeCalledAtLeast(3);
   * ```
   *
   * @param times the number of times the spy is at least called
   * @returns the assertion instance
   */
  public toBeCalledAtLeast(times: number): this {
    if (times < 0) {
      throw new Error("Spy cannot be called less than zero times!");
    }

    const { callCount, name } = this.actual;
    const error = new AssertionError({
      actual: callCount,
      message: `Expeceted <${name}> to be called at least ${numeral(times)}, but it was ${callTimes(callCount)}`,
    });
    const invertedError = new AssertionError({
      actual: callCount,
      message: `Expeceted <${name}> NOT to be called at least ${numeral(times)}, but it was ${callTimes(callCount)}`,
    });

    return this.execute({
      assertWhen: callCount >= times,
      error,
      invertedError,
    });
  }

  /**
   * Check if the spy was called at most a specific number of times.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy).toBeCalledAtMost(2);
   * ```
   *
   * @param times the number of times the spy is at most called
   * @returns the assertion instance
   */
  public toBeCalledAtMost(times: number): this {
    if (times < 0) {
      throw new Error("Spy cannot be called less than zero times!");
    }

    const { callCount, name } = this.actual;
    const error = new AssertionError({
      actual: callCount,
      message: `Expeceted <${name}> to be called at most ${numeral(times)}, but it was ${callTimes(callCount)}`,
    });
    const invertedError = new AssertionError({
      actual: callCount,
      message: `Expeceted <${name}> NOT to be called at most ${numeral(times)}, but it was ${callTimes(callCount)}`,
    });

    return this.execute({
      assertWhen: callCount <= times,
      error,
      invertedError,
    });
  }

  /**
   * Check if the spy was never called.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy).toNeverBeCalled();
   * ```
   *
   * @returns the assertion instance
   */
  public toNeverBeCalled(): this {
    const { callCount, name } = this.actual;
    const error = new AssertionError({
      actual: callCount,
      expected: 0,
      message: `Expected <${name}> to be never called, but it was ${callTimes(callCount)}`,
    });
    const invertedError = new AssertionError({
      actual: callCount,
      message: `Expected <${name}> NOT to be never called, but it was ${callTimes(callCount)}`,
    });

    return this.execute({
      assertWhen: callCount === 0,
      error,
      invertedError,
    });
  }

  /**
   * Check if any of the calls to this spy have the expected arguments. Each
   * argument is compared with a strict-deep-equals strategy and must be in
   * the exact same order as called.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy).toHaveArgs("foo", 3, true);
   * ```
   *
   * @param expected the expected arguments passed to any call
   * @returns the assertion instance
   */
  public toHaveArgs(...expected: A): this {
    const { args, name } = this.actual;
    const prettyArgs = expected.map(prettify).join(", ");
    const error = new AssertionError({
      expected,
      message: `Expected <${name}> to be called with <${prettyArgs}>`,
    });
    const invertedError = new AssertionError({
      actual: args,
      message: `Expected <${name}> NOT to be called with <${prettyArgs}>`,
    });

    return this.execute({
      assertWhen: args.some(callArgs => isDeepEqual(callArgs, expected)),
      error,
      invertedError,
    });
  }

  /**
   * Check if any of the calls to this spy returns the expected value. The
   * value is compared with a strict-deep-equals strategy.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy).toReturn({ res: "ok" });
   * ```
   *
   * @param expected the expected value returned by any call
   * @returns the assertion instance
   */
  public toReturn(expected: R): this {
    const { name, returnValues } = this.actual;
    const error = new AssertionError({
      expected,
      message: `Expected <${name}> to return <${prettify(expected)}> when called`,
    });
    const invertedError = new AssertionError({
      actual: returnValues,
      message: `Expected <${name}> NOT to return <${prettify(expected)}> when called`,
    });

    return this.execute({
      assertWhen: returnValues.some(value => isDeepEqual(value, expected)),
      error,
      invertedError,
    });
  }

  /**
   * Check if any of the calls to this spy throws an exception. The thrown
   * values are compared with a strict-deep-equals strategy.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy).toThrow("I'm not an error");
   * expect(spy).toThrow(new Error("I'm an error"));
   * ```
   *
   * @param exception the exception thrown by any call
   * @returns the assertion instance
   */
  public toThrow(exception?: unknown): this {
    const { exceptions, name } = this.actual;
    const errorCount = exceptions?.length ?? 0;
    const expected = exception !== undefined
      ? `<${prettify(exception)}>`
      : "when called";
    const error = new AssertionError({
      expected: exception,
      message: `Expected <${name}> to throw ${expected}`,
    });
    const invertedError = new AssertionError({
      actual: exceptions,
      message: `Expected <${name}> NOT to throw ${expected}`,
    });

    return this.execute({
      assertWhen: exception !== undefined
        ? exceptions?.some(ex => isDeepEqual(ex, exception))
        : errorCount > 0,
      error,
      invertedError,
    });
  }

  /**
   * Retrieves a specific call of the spy, checking first if there's at least
   * that number of calls. Then returns a {@link SinonSpyCallAssertion}
   * instance of that call. This allows more specific verifications over the
   * spy when this is called more than once.
   *
   * @example
   * ```
   * const spy = Sinon.spy(..); // .stub(..) / .mock(..) / .fake(..)
   *
   * expect(spy)
   *   .call(7)
   *   .toHaveArgs(..); // check over the 7th call to this spy
   * ```
   *
   * @param count The spy call to retrieve. Where `1` means the first call, `2`
   *              the second call, and so on.
   * @returns a {@link SinonSpyCallAssertion} instance of the call
   */
  public call(count: number): SinonSpyCallAssertion<A, R> {
    if (count === 0) {
      throw new Error("It's not possible to access no call at all!");
    }

    this.toBeCalledAtLeast(count);

    return new SinonSpyCallAssertion(this.actual.getCall(count - 1));
  }
}
