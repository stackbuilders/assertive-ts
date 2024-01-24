import dedent from "dedent";
import isDeepEqual from "fast-deep-equal/es6";

import { Assertion } from "./Assertion";
import { prettify } from "./helpers/messages";

import { AssertionError } from "assert/strict";

/**
 * Encapsulates assertion methods applicable to Promises
 *
 * @param T the type of the value of the promise
 * @param I type to track the current inverted state
 */
export class PromiseAssertion<T, I extends boolean = false> extends Assertion<Promise<T>> {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:
  // Needed because the `I` generic has to change in the inverted
  // assertion so we can have better types. As we're overriding the property
  // which expects `this` as a type, we cannot cast the type, but we know the
  // new type is equivalent to `this`.
  public override readonly not: PromiseAssertion<T, true>;

  public constructor(actual: Promise<T>) {
    super(actual);
  }

  /**
   * Check if a promise is resolved. If `.not` is prepended, the resulting
   * promise will contain the error.
   *
   * **Important:** Remember to return or `await` for this assertion to not
   * leave the promise asynchronous to the test
   *
   * @example
   * ```
   * await expect(successfulAsyncRequest()).toBeResolved();
   * ```
   *
   * @returns a promise with the resolved value (or an error if `.not` was
   *          prepended)
   */
  public toBeResolved(): Promise<I extends false ? T : unknown> {
    return this.actual.then(value => {
      if (this.inverted) {
        throw new AssertionError({
          actual: this.actual,
          message: "Expected promise NOT to be resolved",
        });
      }

      return value;
    })
    .catch((error: unknown) => {
      if (error instanceof AssertionError) {
        throw error;
      }

      if (this.inverted) {
        return error as I extends false ? T : unknown;
      }

      throw new AssertionError({
        actual: this.actual,
        message: `Expected promise to be resolved, but it was rejected with <${prettify(error)}> instead`,
      });
    });
  }

  /**
   * Check if a promise is resolved exactly (deep strict equally) with the
   * passed value. If `.not` is prepended, it will check if the promise was
   * resolved with anything but the passed value.
   *
   * **Important:** Remember to return or `await` for this assertion to not
   * leave the assertion asynchronous in the test
   *
   * @example
   * ```
   * await expect(requestAsyncMagicValue()).toBeResolvedWith(64);
   * ```
   *
   * @param expected the expected value to be resolved by the promise
   * @returns a promise with the resolved value
   */
  public toBeResolvedWith(expected: T): Promise<I extends false ? T : unknown> {
    return this.actual.then(value => {
      this.execute({
        assertWhen: isDeepEqual(value, expected),
        error: new AssertionError({
          actual: value,
          expected,
          message: `Expected promise to be resolved with <${prettify(expected)}>, but got <${prettify(value)}> instead`,
        }),
        invertedError: new AssertionError({
          actual: value,
          message: `Expected promise NOT to be resolved with <${prettify(value)}>`,
        }),
      });

      return value;
    })
    .catch((error: unknown) => {
      if (error instanceof AssertionError) {
        throw error;
      }

      throw new AssertionError({
        actual: error,
        expected: !this.inverted ? expected : undefined,
        message: this.inverted
          ? dedent`
              Expected promise to be resolved with anything but <${prettify(expected)}>, but was rejected with \
              <${prettify(error)}> instead
            `
          : dedent`
              Expected promise to be resolved with <${prettify(expected)}>, but it was rejected with \
              <${prettify(error)}> instead
            `,
      });
    });
  }

  /**
   * Check if the promise was rejected. If `.not` is prepended, the resulting
   * promise will contain the value.
   *
   * **Important:** Remember to return or `await` for this assertion to not
   * leave the promise asynchronous to the test
   *
   * @example
   * ```
   * await expect(failingAsyncRequest()).toBeRejected();
   * ```
   *
   * @returns a promise with the caught error (or the value if `.not` is
   *          prepended)
   */
  public toBeRejected(): Promise<I extends false ? unknown : T> {
    return this.actual.then(value => {
      if (this.inverted) {
        return value;
      }

      throw new AssertionError({
        actual: this.actual,
        message: `Expected promise to be rejected, but it was resolved with <${prettify(value)}> instead`,
      });
    })
    .catch((error: unknown) => {
      if (error instanceof AssertionError) {
        throw error;
      }

      if (this.inverted) {
        throw new AssertionError({
          actual: error,
          message: "Expected promise NOT to be rejected",
        });
      }

      return error as I extends false ? unknown : T;
    });
  }

  /**
   * Check if a promise is rejected exactly (deep strict equally) with the
   * passed error. If `.not` is prepended, it will check if the promise was
   * rejected with anything but the passed error.
   *
   * **Important:** Remember to return or `await` for this assertion to not
   * leave the promise asynchronous to the test
   *
   * @example
   * ```
   * await expect(failingAsyncRequest()).toBeRejectedWith(new Error("404"));
   * ```
   *
   * @typeParam E the type of the rejected value
   * @param expected the expected error to be rejected by the promise
   * @returns a promise with the caught error
   */
  public toBeRejectedWith<E>(expected: E): Promise<I extends false ? E : unknown> {
    return this.actual.then(value => {
      throw new AssertionError({
        actual: this.actual,
        expected: !this.inverted ? expected : undefined,
        message: this.inverted
          ? dedent`
              Expected promise to be rejected with anything but <${prettify(expected)}>, but it was resolved with \
              <${prettify(value)}> instead
            `
          : dedent`
              Expected promise to be rejected with <${prettify(expected)}>, but it was resolved with \
              <${prettify(value)}> instead
            `,
      });
    })
    .catch((error: unknown) => {
      if (error instanceof AssertionError) {
        throw error;
      }

      this.execute({
        assertWhen: isDeepEqual(error, expected),
        error: new AssertionError({
          actual: error,
          expected,
          message: `Expected promise to be rejected with <${prettify(expected)}>, but got <${prettify(error)}> instead`,
        }),
        invertedError: new AssertionError({
          actual: error,
          message: `Expected promise NOT to be rejected with <${prettify(error)}>`,
        }),
      });

      return error as I extends false ? E : unknown;
    });
  }
}
