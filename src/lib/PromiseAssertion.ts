import { AssertionError } from "assert/strict";
import { isDeepStrictEqual } from "util";

export class PromiseAssertion<T> {

  private readonly actual: Promise<T>;

  constructor(actual: Promise<T>) {
    this.actual = actual;
  }

  /**
   * Check if a promise is resolved. Optionally, also check if the passed value
   * is strict deep equal to the value resolved by the promise.
   *
   * **Important:** Remember to return or `await` for this assertion to not leave
   * the assertion asynchronous in the test
   *
   * @param expected optional expected value to be resolved by the promise
   * @returns a promise with the resolved value
   */
  public toBeResolved(expected?: T): Promise<T> {
    return this.actual
      .then(value => {
        if (expected) {
          if (isDeepStrictEqual(value, expected)) {
            return value;
          }

          throw new AssertionError({
            actual: value,
            expected,
            message: `Expected promise to be resolved with <${expected}>, but got <${value}> instead`
          });
        }

        return value;
      })
      .catch((error: Error) => {
        if (error instanceof AssertionError) {
          throw error;
        }

        throw new AssertionError({
          actual: this.actual,
          message: `Expected promise to be resolved, but it was rejected with <${error}> instead`
        });
      });
  }

  /**
   * Check if a promise is rejected. Optionally, also check if the passed value
   * is strict deep equal to the error cought by the promise.
   *
   * **Important:** Remember to return or `await` for this assertion to not leave
   * the it asynchronous in the test.
   *
   * @param expected optinal expected value to be rejected by the promise
   * @returns a rejected promise with the cought error
   */
  public toBeRejected<E = unknown>(expected?: E): Promise<E> {
    return this.actual
      .then(value => {
        throw new AssertionError({
          actual: this.actual,
          message: `Expected promise to be rejected, but it was resolved with <${value}> instead`
        });
      })
      .catch((error: E) => {
        if (expected) {
          if (isDeepStrictEqual(error, expected)) {
            return error;
          }

          throw new AssertionError({
            actual: error,
            expected,
            message: `Expected promise to be rejected with <${expected}>, but got <${error}> instead`
          });
        }

        return error;
      });
  }

  /**
   * Check if the promise is the same as another reference. We cannot check the
   * value of the promise wihtout first resolving it. So this assertion checks
   * only for referential equality.
   *
   * If you need to check if the value of the promise is equal to another, use
   * {@link PromiseAssertion.toBeResolved toBeResolved} instead
   *
   * @param expected the promise to compare for referential equality
   * @returns the Assertion instance if no error was thrown
   */
  public toBeSameAs(expected: Promise<T>): this {
    if (this.actual === expected) {
      return this;
    }

    throw new AssertionError({
      actual: this.actual,
      expected,
      message: "Expected both promises to be the same"
    });
  }
}
