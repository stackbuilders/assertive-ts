import { AssertionError } from "assert";

import { Assertion } from "./Assertion";
import {
  isHighInclusiveOptions,
  isInclusiveOptions,
  isLowInclusiveOptions,
} from "./helpers/guards";

interface BaseBetweenOptions {
  range: [number, number];
}

interface CloseToOptions {
  value: number;
  withOffset: number;
}

export interface InclusiveBetweenOptions extends BaseBetweenOptions {
  inclusive: boolean;
}

export interface LowInclusiveBetweenOptions extends BaseBetweenOptions {
  lowInclusive: boolean;
}

export interface HighInclusiveBetweenOptions extends BaseBetweenOptions {
  highInclusive: boolean;
}

export type BetweenOptions =
  | BaseBetweenOptions
  | InclusiveBetweenOptions
  | LowInclusiveBetweenOptions
  | HighInclusiveBetweenOptions;

export class NumberAssertion extends Assertion<number> {
  constructor(actual: number) {
    super(actual);
  }

  /**
   * Check if the number is zero.
   *
   * @returns the assertion instance
   */
  public toBeZero(): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: 0,
      message: `Expected <${this.actual}> to be zero`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be zero",
    });

    return this.execute({
      assertWhen: this.actual === 0,
      error,
      invertedError,
    });
  }

  /**
   * Check if the number is positive. That is, when the number is greater than zero.
   *
   * @returns the assertion instance
   */
  public toBePositive(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be positive`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be positive",
    });

    return this.execute({
      assertWhen: this.actual > 0,
      error,
      invertedError,
    });
  }

  /**
   * Check if the number is negative. That is, when the number is less than zero.
   *
   * @returns the assertion instance
   */
  public toBeNegative(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be negative`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be negative",
    });

    return this.execute({
      assertWhen: this.actual < 0,
      error,
      invertedError,
    });
  }

  /**
   * Check if the number is finite. That is, when the number is not a
   * JavaScript's {@link Infinity} value. Keep in mind that this includes
   * positive and negative infinity.
   *
   * @returns the assertion instance
   */
  public toBeFinite(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be finite`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be finite",
    });

    return this.execute({
      assertWhen: isFinite(this.actual),
      error,
      invertedError,
    });
  }

  /**
   * Check if the number is `NaN`. That is only when the number is JavaScript's
   * {@link NaN} value.
   *
   * @returns the assertion instance
   */
  public toBeNaN(): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: NaN,
      message: `Expected <${this.actual}> to be NaN`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be NaN",
    });

    return this.execute({
      assertWhen: isNaN(this.actual),
      error,
      invertedError,
    });
  }

  /**
   * Check if the number is even. That is, when the number is divisible by 2.
   *
   * @returns the assertion instance
   */
  public toBeEven(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be even`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be even",
    });

    return this.execute({
      assertWhen: this.actual % 2 === 0,
      error,
      invertedError,
    });
  }

  /**
   * Check if the number is odd. That is, when the number is not divisible by 2.
   *
   * @returns the assertion instance
   */
  public toBeOdd(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be odd`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be odd",
    });

    return this.execute({
      assertWhen: this.actual % 2 === 1,
      error,
      invertedError,
    });
  }

  /**
   * Check if the number is between the specified bounds. By default, the
   * bounds are exclusive, but the options allow to set the high, low, or both
   * limits as inclusive
   *
   * @param options an object of type {@link Between Options} where the `range`
   *                property defines the bounds, so it's always required. Use
   *                `inclusive: true` to make both limits inclusive. Or you can
   *                selectively make low or high limits inclusive using
   *                `lowInclusive: true` or `highInclusive: true`, respectively
   * @returns the assertion instance
   */
  public toBeBetween(options: BaseBetweenOptions): this;
  public toBeBetween(options: InclusiveBetweenOptions): this;
  public toBeBetween(options: LowInclusiveBetweenOptions): this;
  public toBeBetween(options: HighInclusiveBetweenOptions): this;
  public toBeBetween(options: BetweenOptions): this {
    if (isInclusiveOptions(options)) {
      const error = new AssertionError({
        actual: this.actual,
        expected: options,
        message: `Expected <${this.actual}> to be ${
          options.inclusive ? "strictly " : ""
        }between <${options.range}>`,
      });
      const invertedError = new AssertionError({
        actual: this.actual,
        message: `Expected <${this.actual}> NOT to be ${
          options.inclusive ? "strictly " : ""
        }between <${options.range}>`,
      });

      return this.execute({
        assertWhen: options.inclusive
          ? this.actual >= options.range[0] && this.actual <= options.range[1]
          : this.actual > options.range[0] && this.actual < options.range[1],
        error,
        invertedError,
      });
    }

    if (isLowInclusiveOptions(options)) {
      const error = new AssertionError({
        actual: this.actual,
        expected: options,
        message: `Expected <${this.actual}> to be between <${options.range}>${
          options.lowInclusive ? ` with <${options.range[0]}> inclusion` : ""
        }`,
      });
      const invertedError = new AssertionError({
        actual: this.actual,
        message: `Expected <${this.actual}> NOT to be between <${
          options.range
        }>${
          options.lowInclusive ? ` with <${options.range[0]}> inclusion` : ""
        }`,
      });

      return this.execute({
        assertWhen: options.lowInclusive
          ? this.actual >= options.range[0] && this.actual < options.range[1]
          : this.actual > options.range[0] && this.actual < options.range[1],
        error,
        invertedError,
      });
    }

    if (isHighInclusiveOptions(options)) {
      const error = new AssertionError({
        actual: this.actual,
        expected: options,
        message: `Expected <${this.actual}> to be between <${options.range}>${
          options.highInclusive ? ` with <${options.range[1]}> inclusion` : ""
        }`,
      });
      const invertedError = new AssertionError({
        actual: this.actual,
        message: `Expected <${this.actual}> NOT to be between <${
          options.range
        }>${
          options.highInclusive ? ` with <${options.range[1]}> inclusion` : ""
        }`,
      });

      return this.execute({
        assertWhen: options.highInclusive
          ? this.actual > options.range[0] && this.actual <= options.range[1]
          : this.actual > options.range[0] && this.actual < options.range[1],
        error,
        invertedError,
      });
    }

    const error = new AssertionError({
      actual: this.actual,
      expected: options,
      message: `Expected <${this.actual}> to be between <${options.range}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be between <${options.range}>`,
    });

    return this.execute({
      assertWhen:
        this.actual > options.range[0] && this.actual < options.range[1],
      error,
      invertedError,
    });
  }

  /**
   * Check if the number value is close to the base value with certain offset. This checks
   * both limits min and max which are inclusive.
   *
   * @param options the object that contains the value (base number that value should be close) and withOffset (value of min and max offset)
   * @returns the assertion instance
   */
  public toBeCloseTo(options: CloseToOptions): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: options,
      message: `Expected <${this.actual}> to be close to <${options.value}> with offset <${options.withOffset}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be close to <${options.value}> with offset <${options.withOffset}>`,
    });

    const { value, withOffset } = options;

    return this.execute({
      assertWhen:
        this.actual <= value + withOffset && this.actual >= value - withOffset,
      error,
      invertedError,
    });
  }

  /**
   * Check if the number value is greater than the defined value.
   *
   * @param value the value that number should be greater than
   * @returns the assertion instance
   */
  public toBeGreaterThan(value: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be greater than <${value}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be greater than <${value}>`,
    });

    return this.execute({
      assertWhen: this.actual > value,
      error,
      invertedError,
    });
  }

  /**
   * Check if the number value is greater than or equal to the defined value.
   *
   * @param value the value that number should be greater than or equal to
   * @returns the assertion instance
   */
  public toBeGreaterThanOrEqualTo(value: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be greater than or equal to <${value}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be greater than or equal to <${value}>`,
    });

    return this.execute({
      assertWhen: this.actual >= value,
      error,
      invertedError,
    });
  }

  /**
   * Check if the number value is less than the defined value.
   *
   * @param value the value that number should be less than
   * @returns the assertion instance
   */
  public toBeLessThan(value: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be less than <${value}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be less than <${value}>`,
    });

    return this.execute({
      assertWhen: this.actual < value,
      error,
      invertedError,
    });
  }

  /**
   * Check if the number value is less than or equal to the defined value.
   *
   * @param value the value that number should be less than or equal to
   * @returns the assertion instance
   */
  public toBeLessThanOrEqualTo(value: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be less than or equal to <${value}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be less than or equal to <${value}>`,
    });

    return this.execute({
      assertWhen: this.actual <= value,
      error,
      invertedError,
    });
  }
}
