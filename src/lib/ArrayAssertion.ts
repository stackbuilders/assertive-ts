import { AssertionError } from "assert";
import { isDeepStrictEqual } from "util";

import { Assertion } from "./Assertion";
import { UnsupportedOperationError } from "./errors/UnsupportedOperationError";
import { expect } from "./expect";
import { TypeFactory } from "./helpers/TypeFactories";

/**
 * Encapsulates assertion methods applicable to arrays.
 *
 * @param T the type of the array
 */
export class ArrayAssertion<T> extends Assertion<T[]> {

  public constructor(actual: T[]) {
    super(actual);
  }

  /**
   * Check if all the array values match the predicate
   *
   * @example
   * ```
   * expect([1, 2, 3]).toMatchAll(x => x < 5);
   * expect([apple, orange, pear]).toMatchAll(isFruit);
   * ```
   *
   * @param matcher a generic matcher predicate
   * @returns the assertion instance
   */
  public toMatchAll(matcher: (value: T) => boolean): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected all values of the array to return true on the matcher predicate"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected not every value of the array to return true on the matcher predicate"
    });

    return this.execute({
      assertWhen: this.actual.every(matcher),
      error,
      invertedError
    });
  }

  /**
   * Check if any of the array values match the predicate
   *
   * @example
   * ```
   * expect([dog, apple, cat]).toMatchAny(isFruit);
   * ```
   *
   * @param matcher a matcher predicate
   * @returns the assertion instance
   */
  public toMatchAny(matcher: (value: T) => boolean): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected any value of the array to return true on the matcher predicate"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected no value of the array to return true on the matcher predicate"
    });

    return this.execute({
      assertWhen: this.actual.some(matcher),
      error,
      invertedError
    });
  }

  /**
   * Check if all the values of the array satisfies a given assertion.
   *
   * @example
   * ```
   * const checkIsFruit = (x: Fruit) => expect(x).toBeInstanceOf(Fruit);
   * expect([apple, pear, banana]).toSatisfyAll(checkIsFruit);
   * ```
   *
   * @param consumer a consumer of the array to assert over each value of its values
   * @returns the assertion instance
   */
  public toSatisfyAll(consumer: (value: T) => void): this {
    const tryAllValues = (): AssertionError | undefined => {
      try {
        this.actual.forEach(consumer);
        return undefined;
      } catch (error) {
        if (error instanceof AssertionError) {
          return error;
        }

        throw error;
      }
    };
    const firstError = tryAllValues();

    return this.execute({
      assertWhen: firstError === undefined,
      error: firstError!,
      invertedError: new AssertionError({
        actual: this.actual,
        message: "Expected not all values of the array to satisfy the given assertion"
      })
    });
  }

  /**
   * Check if any value of the array satisfies the give assertion.
   *
   * @example
   * ```
   * const checkIsFruit = (x: Fruit) => expect(x).toBeInstanceOf(Fruit);
   * expect([dog, apple, cat]).toSatisfyAny(checkIsFruit);
   * ```
   *
   * @param consumer a consumer of the array to assert over each value of its values
   * @returns the assertion instance
   */
  public toSatisfyAny(consumer: (value: T) => void): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected any value of the array to satisfy the given assertion"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected no value of the array to satisfy the given assertion"
    });

    return this.execute({
      assertWhen: this.actual.some(value => {
        try {
          consumer(value);
          return true;
        } catch (err) {
          return false;
        }
      }),
      error,
      invertedError
    });
  }

  /**
   * Check if the array is empty. That is, when its `length` property is zero.
   *
   * @example
   * ```
   * expect([]).toBeEmpty();
   * ```
   *
   * @returns the assertion instance
   */
  public toBeEmpty(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected array to be empty"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected array NOT to be empty"
    });

    return this.execute({
      assertWhen: this.actual.length === 0,
      error,
      invertedError
    });
  }

  /**
   * Check if the array has some specific number of elements.
   *
   * @example
   * ```
   * expect([0, 1, 2]).toHaveSize(3);
   * ```
   *
   * @param size the expected number of elements in the array
   * @returns the assertion instance
   */
  public toHaveSize(size: number): this {
    const error = new AssertionError({
      actual: this.actual.length,
      expected: size,
      message: `Expected array to contain ${size} elements, but it has ${this.actual.length}`
    });
    const invertedError = new AssertionError({
      actual: this.actual.length,
      message: `Expected array NOT to contain ${size} elements, but it does`
    });

    return this.execute({
      assertWhen: this.actual.length === size,
      error,
      invertedError
    });
  }

  /**
   * Check if the array contains the same elements as another. This doesn't
   * check the order of the elements.
   *
   * @example
   * ```
   * expect([1, 2, 3]).toHaveSameMembers([3, 2, 1]);
   * ```
   *
   * @param expected the other array to compare its elements to
   * @returns the assertion instance
   */
  public toHaveSameMembers(expected: T[]): this {
    const prettyValues = `[${expected.map(value => JSON.stringify(value)).join(", ")}]`;
    const error = new AssertionError({
      actual: this.actual,
      expected,
      message: `Expected array to have the same members as: ${prettyValues}`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected array NOT to have the same members as: ${prettyValues}`
    });

    return this.execute({
      assertWhen:
        this.actual.length === expected.length
        && this.actual.every(value => expected.includes(value)),
      error,
      invertedError
    });
  }

  /**
   * Check if the array contains all the passed values.
   *
   * @example
   * ```
   * expect([1, 2, 3]).toContainAll(1, 3);
   * ```
   *
   * @param values the values the array should contain
   * @returns the assertion instance
   */
  public toContainAll(...values: T[]): this {
    const prettyValues = `[${values.map(value => JSON.stringify(value)).join(", ")}]`;
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected array to contain the following values: ${prettyValues}`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected array NOT to contain the following values, but it does: ${prettyValues}`
    });

    return this.execute({
      assertWhen: values.every(value => this.actual.includes(value)),
      error,
      invertedError
    });
  }

  /**
   * Check if the array contains any of the passed values.
   *
   * @example
   * ```
   * expect([1, 2, 3]).toContainAny(1, 50, 36);
   * ```
   *
   * @param values the value the array should include (at least one)
   * @returns the assertion instance
   */
  public toContainAny(...values: T[]): this {
    const prettyValues = `[${values.map(value => JSON.stringify(value)).join(", ")}]`;
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected array to contain at least one of the following values: ${prettyValues}`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected array NOT to contain one of the following values, but it does: ${prettyValues}`
    });

    return this.execute({
      assertWhen: values.some(value => this.actual.includes(value)),
      error,
      invertedError
    });
  }

  /**
   * Check if the array contains an specific value at an exact index.
   *
   * @param index the index of the array to find the value
   * @param value the expected value of the index in the array
   * @returns the assertion instance
   */
  public toContainAt(index: number, value: T): this {
    const error = new AssertionError({
      actual: this.actual[index],
      expected: value,
      message: `Expected value at index ${index} of the array to be <${value}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual[index],
      message: `Expected value at index ${index} of the array NOT to be <${value}>`
    });

    return this.execute({
      assertWhen: isDeepStrictEqual(this.actual[index], value),
      error,
      invertedError
    });
  }

  /**
   * Extract the value on a specific index of the array and create an assertion
   * instance of that specific type. This method uses {@link Assertion.asType}
   * internally to create the new assertion instance.
   *
   * @example
   * ```
   * expect(["foo", 2, true])
   *   .extracting(1, TypeFactories.Number)
   *   .toBePositive();
   * ```
   *
   * @typeParam S the type of the factory's value
   * @typeParam A the type of the assertion factory
   * @param index the index of the array to extract the value
   * @param typeFactory a factory to assert the extracted value type and create
   *                    an assertion for it
   * @returns a more specific assertion based on the factory type for the value
   */
  public extracting<S extends T, A extends Assertion<S>>(index: number, typeFactory: TypeFactory<S, A>): A {
    if (this.inverted) {
      throw new UnsupportedOperationError("The `.not` modifier is not allowed on `.extracting(..)` method");
    }

    if (index >= this.actual.length) {
      throw new AssertionError({
        actual: this.actual,
        message: `Out of bounds! Cannot extract index ${index} from an array of ${this.actual.length} elements`
      });
    }

    return expect(this.actual[index]).asType(typeFactory);
  }
}
