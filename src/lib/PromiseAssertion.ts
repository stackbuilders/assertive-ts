import { AssertionError } from "assert/strict";
import { isDeepStrictEqual } from "util";

import { Assertion } from "./Assertion";

type ValueOrUnknown<I extends boolean, T, R extends T | undefined> =
  I extends false
    ? T
    : R extends T
      ? T
      : unknown;

type ErrorOrValue<I extends boolean, T, E> = I extends true ? T : E;

export class PromiseAssertion<T, I extends boolean = false> extends Assertion<Promise<T>> {

  // @ts-ignore:
  // Needed because the `I` generic has to change in the inverted
  // assertion so we can have better types. As we're overriding the property
  // which expects `this` as a type, we cannot cast the type, but we know the
  // new type is equicalent to `this`.
  public override readonly not: PromiseAssertion<T, true>;

  constructor(actual: Promise<T>) {
    super(actual);
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
  public toBeResolved<R extends T | undefined>(expected?: R): Promise<ValueOrUnknown<I, T, R>> {
    return this.actual
      .then(value => {
        if (expected) {
          this.execute({
            assertWhen: isDeepStrictEqual(value, expected),
            error: new AssertionError({
              actual: value,
              expected,
              message: `Expected promise to be resolved with [${expected}], but got [${value}] instead`
            }),
            invertedError: new AssertionError({
              actual: value,
              message: `Expected promise NOT to be resolved with [${value}]`
            })
          });

          return value;
        }

        if (this.inverted) {
          throw new AssertionError({
            actual: this.actual,
            message: "Expected promise NOT to be resolved"
          });
        }

        return value;
      })
      .catch(error => {
        if (error instanceof AssertionError) {
          throw error;
        }

        if (this.inverted) {
          return error;
        }

        throw new AssertionError({
          actual: this.actual,
          message: `Expected promise to be resolved, but it was rejected with [${error}] instead`
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
  public toBeRejected<E = unknown>(expected?: E): Promise<ErrorOrValue<I, T, E>> {
    return this.actual
      .then(value => {
        if (this.inverted) {
          return value;
        }

        throw new AssertionError({
          actual: this.actual,
          message: `Expected promise to be rejected, but it was resolved with [${value}] instead`
        });
      })
      .catch(error => {
        if (error instanceof AssertionError) {
          throw error;
        }

        if (expected) {
          this.execute({
            assertWhen: isDeepStrictEqual(error, expected),
            error: new AssertionError({
              actual: error,
              expected,
              message: `Expected promise to be rejected with [${expected}], but got [${error}] instead`
            }),
            invertedError: new AssertionError({
              actual: error,
              message: `Expected promise NOT to be rejected with [${error}]`
            })
          });

          return error;
        }

        if (this.inverted) {
          throw new AssertionError({
            actual: error,
            message: "Expeted promise NOT to be rejected"
          });
        }

        return error;
      });
  }
}
