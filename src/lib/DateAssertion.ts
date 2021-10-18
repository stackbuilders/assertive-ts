import { AssertionError } from 'assert';

import { Assertion } from './Assertion';

export class DateAssertion extends Assertion<Date> {
  constructor(actual: Date) {
    super(actual);
  }

  /**
   * Check if the actual date comes before the
   * passed date
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeBefore(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: date,
      message: `Expected <${this.actual}> to be before <${date}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be before <${date}>`,
    });
    return this.execute({
      assertWhen: this.actual < date,
      error,
      invertedError,
    });
  }

  /**
   * Check if the actual date comes before or
   * equals the passed date
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeBeforeOrEqualTo(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be before or equal to <${date}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be before or equal to <${date}>`,
    });
    return this.execute({
      assertWhen: this.actual <= date,
      error,
      invertedError,
    });
  }

  /**
   * Check if the actual date comes after the
   * passed
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeAfter(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be after <${date}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be after <${date}>`,
    });
    return this.execute({
      assertWhen: this.actual > date,
      error,
      invertedError,
    });
  }

  /**
   * Check if the actual date comes after or
   * equals the passed date
   * @param date the date to compare with
   * @returns the assertion instance
   */
  public toBeAfterOrEqualTo(date: Date): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be after or equal to <${date}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be after or equal to <${date}>`,
    });
    return this.execute({
      assertWhen: this.actual >= date,
      error,
      invertedError,
    });
  }

  /**
   * Check if the miliseconds of the actual date
   * matches the passed miliseconds
   * @param miliseconds the miliseconds to compare with
   * @returns the assertion instance
   */
  public toHaveSameMilisecondsAs(miliseconds: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to have same miliseconds as <${miliseconds}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to have same miliseconds as <${miliseconds}>`,
    });
    return this.execute({
      assertWhen: this.actual.getMilliseconds() === miliseconds,
      error,
      invertedError,
    });
  }

  /**
   * Check if the seconds of the actual date
   * matches the passed seconds
   * @param seconds the seconds to compare with
   * @returns the assertion instance
   */
  public toHaveSameSecondsAs(seconds: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to have same seconds as <${seconds}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to have same seconds as <${seconds}>`,
    });
    return this.execute({
      assertWhen: this.actual.getSeconds() === seconds,
      error,
      invertedError,
    });
  }

  /**
   * Check if the minutes of the actual date
   * matches the passed minutes
   * @param minutes the minutes to compare with
   * @returns the assertion instance
   */
  public toHaveSameMinutesAs(minutes: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to have same minutes as <${minutes}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to have same minutes as <${minutes}>`,
    });
    return this.execute({
      assertWhen: this.actual.getMinutes() === minutes,
      error,
      invertedError,
    });
  }

  /**
   * Check if the hour of the actual date
   * matches te passed hour
   * @param hours the hours to compare with
   * @returns the assertion instance
   */
  public toHaveSameHourAs(hours: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to have same hours as <${hours}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to have same hours as <${hours}>`,
    });
    return this.execute({
      assertWhen: this.actual.getHours() === hours,
      error,
      invertedError,
    });
  }

  /**
   * Check if the day of the actual date
   * matches the passed
   * @param day the day to compare with
   * @returns the assertion instance
   */
  public toHaveSameDayAs(day: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to have same day as <${day}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to have same day as <${day}>`,
    });
    return this.execute({
      assertWhen: this.actual.getDay() === day,
      error,
      invertedError,
    });
  }

  /**
   * Check if the month of the actual date
   * matches the passed month
   * @param month the month to compare with
   * @returns the assertion instance
   */
  public toHaveSameMonthAs(month: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to have same month as <${month}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to have same month as <${month}>`,
    });
    return this.execute({
      assertWhen: this.actual.getMonth() === month,
      error,
      invertedError,
    });
  }
  /**
   * Check if the year of the actual date
   * matches the passed year
   * @param year the year to compare with
   * @returns the assertion instance
   */
  public toHaveSameYearAs(year: number): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to have same year as <${year}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to have same year as <${year}>`,
    });
    return this.execute({
      assertWhen: this.actual.getFullYear() === year,
      error,
      invertedError,
    });
  }

  /**
   * Check if the day of the actual date
   * is monday
   * @returns the assertion instance
   */
  public toBeMonday(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be monday`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be monday`,
    });
    return this.execute({
      assertWhen: this.actual.getDay() === 1,
      error,
      invertedError,
    });
  }

  /**
   * Check if the day of the actual date
   * is tuesday
   * @returns the assertion instance
   */
  public toBeTuesday(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be tuesday`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be tuesday`,
    });
    return this.execute({
      assertWhen: this.actual.getDay() === 2,
      error,
      invertedError,
    });
  }

  /**
   * Check if the day of the actual date
   * is wednesday
   * @returns the assertion instance
   */
  public toBeWednesday(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be wednesday`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be wednesday`,
    });
    return this.execute({
      assertWhen: this.actual.getDay() === 3,
      error,
      invertedError,
    });
  }
  /**
   * Check if the day of the actual date
   * is thursday
   * @returns the assertion instance
   */
  public toBeThursday(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be thursday`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be thursday`,
    });
    return this.execute({
      assertWhen: this.actual.getDay() === 4,
      error,
      invertedError,
    });
  }
  /**
   * Check if the day of the actual date
   * is friday
   * @returns the assertion instance
   */
  public toBeFriday(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be friday`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be friday`,
    });
    return this.execute({
      assertWhen: this.actual.getDay() === 5,
      error,
      invertedError,
    });
  }
  /**
   * Check if the day of the actual date
   * is saturday
   * @returns the assertion instance
   */
  public toBeSaturday(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be saturday`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be saturday`,
    });
    return this.execute({
      assertWhen: this.actual.getDay() === 6,
      error,
      invertedError,
    });
  }
  /**
   * Check if the day of the actual date
   * is sunday
   * @returns the assertion instance
   */
  public toBeSunday(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be sunday`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to be sunday`,
    });
    return this.execute({
      assertWhen: this.actual.getDay() === 0,
      error,
      invertedError,
    });
  }
}
