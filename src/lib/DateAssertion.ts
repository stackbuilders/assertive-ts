import { AssertionError } from "assert";

import { Assertion } from "./Assertion";
import { DateMethod, DateOptions, DayOfWeek } from "./DateAssertion.types";
import { dateConfOptionsToDate, dayOfWeekAsNumber } from "./helpers/dates";

const DATE_METHOD_MAP: Record<keyof DateOptions, DateMethod> = {
  day: "getDay",
  hours: "getHours",
  miliseconds: "getMilliseconds",
  minutes: "getMinutes",
  month: "getMonth",
  seconds: "getSeconds",
  year: "getFullYear"
};

export class DateAssertion extends Assertion<Date> {

  constructor(actual: Date) {
    super(actual);
  }

  /**
   * Check if a day of the week, might be string
   * (e.g 'monday') or number (e.g 0-6), equals the
   * day of the actual date.
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
      message: `Expected <${this.actual.getDay()}> to be equal to <${dayAsNum}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual.getDay()}> NOT to be equal to <${dayAsNum}>`
    });

    return this.execute({
      assertWhen: this.actual.getDay() === dayAsNum,
      error,
      invertedError
    });
  }

  /**
   * Check if two dates are equal or partially equal
   * by using a configuration object that can contain
   * optional specifications for: year, month, day, hour,
   * minutes, seconds and miliseconds, equals the actual date.
   * The test fails when the value of one of the specifications
   * doesn't match the actual date.
   *
   * @param options the option object to compare with
   * @returns the assertion instance
   */
  public toHaveDateParts(options: DateOptions): this {
    const optionsAsDate = dateConfOptionsToDate(options);
    const assertWhen = Object.keys(options).every(key => {
      const dateMethod = DATE_METHOD_MAP[key];
      return options[key] === this.actual[dateMethod]();
    });
    const error = new AssertionError({
      actual: this.actual,
      expected: options,
      message: `Expected <${this.actual}> to be equal to <${optionsAsDate}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be equal to <${optionsAsDate}>`
    });

    return this.execute({
      assertWhen,
      error,
      invertedError
    });
  }

  /**
   * Check if the actual date comes before the passed date.
   *
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeBefore(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: date,
      message: `Expected <${this.actual}> to be before <${date}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be before <${date}>`
    });

    return this.execute({
      assertWhen: this.actual < date,
      error,
      invertedError
    });
  }

  /**
   * Check if the actual date comes before or equals the passed date.
   *
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeBeforeOrEqualTo(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be before or equal to <${date}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be before or equal to <${date}>`
    });

    return this.execute({
      assertWhen: this.actual <= date,
      error,
      invertedError
    });
  }

  /**
   * Check if the actual date comes after the passed date.
   *
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeAfter(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be after <${date}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be after <${date}>`
    });

    return this.execute({
      assertWhen: this.actual > date,
      error,
      invertedError
    });
  }

  /**
   * Check if the actual date comes after or equals the passed date.
   *
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeAfterOrEqualTo(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be after or equal to <${date}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be after or equal to <${date}>`
    });

    return this.execute({
      assertWhen: this.actual >= date,
      error,
      invertedError
    });
  }
}
