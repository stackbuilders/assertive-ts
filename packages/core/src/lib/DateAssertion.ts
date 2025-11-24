import { AssertionError } from "assert";

import { Assertion } from "./Assertion";
import { dateToOptions, dayOfWeekAsNumber, optionsToDate } from "./helpers/dates";

import type { DateMethod, DateOptions, DayOfWeek } from "./DateAssertion.types";

const DATE_METHOD_MAP: Record<keyof DateOptions, DateMethod> = {
  day: "getDay",
  hours: "getHours",
  milliseconds: "getMilliseconds",
  minutes: "getMinutes",
  month: "getMonth",
  seconds: "getSeconds",
  year: "getFullYear",
};

/**
 * Encapsulates assertion methods applicable to values of type Date
 */
export class DateAssertion extends Assertion<Date> {
  public constructor(actual: Date) {
    super(actual);
  }

  /**
   * Check if a day of the week equals the day of the actual date. You can pass
   * either a string (e.g. "monday"), or a number from 0 to 6, where 0 is
   * Sunday and 6 is Saturday, as in Date.getDay().
   *
   * @example
   * ```
   * const octoberTenth2022 = new Date(2022, 9, 10);
   *
   * expect(octoberTenth2022).toBeDayOfWeek("monday");
   * expect(octoberTenth2022).toBeDayOfWeek(1);
   * ```
   *
   * @param dayOfWeek the day to compare with
   * @returns the assertion instance
   */
  public toBeDayOfWeek(dayOfWeek: DayOfWeek | number): this {
    const dayAsNum = typeof dayOfWeek === "string"
      ? dayOfWeekAsNumber(dayOfWeek)
      : dayOfWeek;
    const error = new AssertionError({
      actual: this.actual,
      expected: dayOfWeek,
      message: `Expected <${this.actual.getDay()}> to be equal to <${dayAsNum}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual.getDay()}> NOT to be equal to <${dayAsNum}>`,
    });

    return this.execute({
      assertWhen: this.actual.getDay() === dayAsNum,
      error,
      invertedError,
    });
  }

  /**
   * Check if two dates are equal or partially equal
   * by using a configuration object that can contain
   * optional specifications for: year, month, day, hour,
   * minutes, seconds and milliseconds, equals the actual date.
   * The test fails when the value of one of the specifications
   * doesn't match the actual date.
   *
   * @example
   * ```
   * const septemberTenth2022 = new Date(2022, 8, 10);
   *
   * expect(octoberTenth2022).toMatchDateParts({
   *   month: "august", // or just `8`
   *   year:2022,
   * });
   * ```
   *
   * @param options the option object to compare with
   * @returns the assertion instance
   */
  public toMatchDateParts(options: DateOptions): this {
    const optionsAsDate = optionsToDate(options);
    const error = new AssertionError({
      actual: dateToOptions(this.actual, options),
      expected: options,
      message: `Expected <${this.actual.toISOString()}> to have parts <${JSON.stringify(options)}>`,
    });
    const invertedError = new AssertionError({
      actual: dateToOptions(this.actual, options),
      message: `Expected <${this.actual.toISOString()}> NOT to have parts <${JSON.stringify(options)}>`,
    });

    return this.execute({
      assertWhen: Object.keys(options).every(key => {
        const dateMethod = DATE_METHOD_MAP[key];
        return optionsAsDate[dateMethod]() === this.actual[dateMethod]();
      }),
      error,
      invertedError,
    });
  }

  /**
   * Check if the actual date comes before the passed date.
   *
   * @example
   * ```
   * const septemberFirst2022 = new Date(2022, 8, 1);
   * const octoberFirst2022 = new Date(2022, 9, 1);
   *
   * expect(septemberFirst2022).toBeBefore(octoberFirst2022);
   * ```
   *
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeBefore(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: date,
      message: `Expected <${this.actual.toISOString()}> to be before <${date.toISOString()}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual.toISOString()}> NOT to be before <${date.toISOString()}>`,
    });

    return this.execute({
      assertWhen: this.actual < date,
      error,
      invertedError,
    });
  }

  /**
   * Check if the actual date comes before or equals the passed date.
   *
   * @example
   * ```
   * const septemberFirst2022 = new Date(2022, 8, 1);
   * const octoberFirst2022 = new Date(2022, 9, 1);
   *
   * expect(septemberFirst2022).toBeBeforeOrEqual(octoberFirst2022);
   * expect(septemberFirst2022).toBeBeforeOrEqual(octoberFirst2022);
   * ```
   *
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeBeforeOrEqual(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual.toISOString()}> to be before or equal to <${date.toISOString()}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual.toISOString()}> NOT to be before or equal to <${date.toISOString()}>`,
    });

    return this.execute({
      assertWhen: this.actual <= date,
      error,
      invertedError,
    });
  }

  /**
   * Check if the actual date comes after the passed date.
   *
   * @example
   * ```
   * const septemberFirst2022 = new Date(2022, 8, 1);
   * const octoberFirst2022 = new Date(2022, 9, 1);
   *
   * expect(octoberFirst2022).toBeAfter(septemberFirst2022);
   * ```
   *
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeAfter(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual.toISOString()}> to be after <${date.toISOString()}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual.toISOString()}> NOT to be after <${date.toISOString()}>`,
    });

    return this.execute({
      assertWhen: this.actual > date,
      error,
      invertedError,
    });
  }

  /**
   * Check if the actual date comes after or equals the passed date.
   *
   * @example
   * ```
   * const septemberFirst2022 = new Date(2022, 8, 1);
   * const octoberFirst2022 = new Date(2022, 9, 1);
   *
   * expect(octoberFirst2022).toBeAfterOrEqual(septemberFirst2022);
   * expect(octoberFirst2022).toBeAfterOrEqual(octoberFirst2022);
   * ```
   *
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeAfterOrEqual(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual.toISOString()}> to be after or equal to <${date.toISOString()}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual.toISOString()}> NOT to be after or equal to <${date.toISOString()}>`,
    });

    return this.execute({
      assertWhen: this.actual >= date,
      error,
      invertedError,
    });
  }
}
