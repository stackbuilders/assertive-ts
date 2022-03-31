import { AssertionError } from "assert/strict";
import { isDeepStrictEqual } from "util";

import { Assertion } from "./Assertion";

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
   * Check if a promise is resolved. If `.not` is prepended, the resulting
   * promise will contain the error.
   *
   * **Important:** Remember to return or `await` for this assertion to not leave
   * the assertion asynchronous in the test
   *
   * @returns a promise with the resolved value (or an error if `.not` was prepended)
   */
  public toBeResolved(): Promise<I extends false ? T : unknown> {
    return this.actual.then(value => {
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
   * Check if a promise is resolved exactly (deep strict equally) with the
   * passed value. If `.not` is prepended, it will check if the promise was
   * resolved with anything but the passed value.
   *
   * **Important:** Remember to return or `await` for this assertion to not leave
   * the assertion asynchronous in the test
   *
   * @param expected the expected value to be resolved by the promise
   * @returns a promise with the resolved value
   */
  public toBeResolvedWith(expected: T): Promise<I extends false ? T : unknown> {
    return this.actual.then(value => {
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
    })
    .catch(error => {
      if (error instanceof AssertionError) {
        throw error;
      }

      throw new AssertionError({
        actual: error,
        expected: !this.inverted ? expected : undefined,
        message: this.inverted
          ? `Expected promise to be resolved with anything but [${expected}], but was rejected with [${error}] instead`
          : `Expected promise to be resolved with [${expected}], but it was rejected with [${error}] instead`
      });
    });
  }

  /**
   * Check if the promise was rejected. If `.not` is prepended, the resulting
   * promise will contain the value.
   *
   * **Important:** Remember to return or `await` for this assertion to not leave
   * the assertion asynchronous in the test
   *
   * @returns a promise with the caught error (or the value if `.not` is prepended)
   */
  public toBeRejected(): Promise<I extends false ? unknown : T> {
    return this.actual.then(value => {
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

      if (this.inverted) {
        throw new AssertionError({
          actual: error,
          message: "Expeted promise NOT to be rejected"
        });
      }

      return error;
    });
  }

  /**
   * Check if a promise is rejected exactly (deep strict equally) with the
   * passed error. If `.not` is prepended, it will check if the promise was
   * rejected with anything but the passed error.
   *
   * **Important:** Remember to return or `await` for this assertion to not leave
   * the it asynchronous in the test.
   *
   * @param expected the expected error to be rejected by the promise
   * @returns a promise with the caught error
   */
  public toBeRejectedWith<E>(expected: E): Promise<I extends false ? E : unknown> {
    return this.actual.then(value => {
      throw new AssertionError({
        actual: this.actual,
        expected: !this.inverted ? expected : undefined,
        message: this.inverted
          ? `Expected promise to be rejected with anything but [${expected}], but it was resolved with [${value}] instead`
          : `Expected promise to be rejected with [${expected}], but it was resolved with [${value}] instead`
      });
    })
    .catch(error => {
      if (error instanceof AssertionError) {
        throw error;
      }

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
    });
  }
}
