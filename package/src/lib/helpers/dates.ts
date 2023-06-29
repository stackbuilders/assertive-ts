import { DateOptions, DayOfWeek, Month } from "../DateAssertion.types";

const DAYS_OF_WEEK: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const MONTHS: Month[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * Provides a numeric representation of a day of the week string. The number is
 * consistent with JavaScript's {@link Date}, so it's zero-based and starts
 * from Sunday = `0` to Saturday = `6`.
 *
 * @param day a day of the week string
 * @returns a number representing the day of the week
 */
export function dayOfWeekAsNumber (day: DayOfWeek): number {
  return DAYS_OF_WEEK.indexOf(day);
}

/**
 * Provides a numeric representation of a month string. The number is consistent
 * with JavaScript's {@link Date}, so it's zero-based and starts from
 * January = `0` to December = `11`.
 *
 * @param month a month string
 * @returns a number representing the month
 */
export function monthOfYear (month: Month): number {
  return MONTHS.indexOf(month);
}

export function optionsToDate(options: DateOptions): Date {
  const {
    year = 0,
    month = 0,
    day = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  } = options;
  const monthAsNum = typeof month === "string"
    ? monthOfYear(month) + 1
    : month;
  const dayAsNum = typeof day === "string"
    ? dayOfWeekAsNumber(day)
    : day;

  return new Date(
    year,
    monthAsNum,
    dayAsNum,
    hours,
    minutes,
    seconds,
    milliseconds,
  );
}

export function dateToOptions(date: Date, sample?: DateOptions): DateOptions {
  const options = {
    day: date.getDate(),
    hours: date.getHours(),
    milliseconds: date.getMilliseconds(),
    minutes: date.getMinutes(),
    month: date.getMonth(),
    seconds: date.getSeconds(),
    year: date.getFullYear(),
  };

  if (sample !== undefined) {
    return Object.keys(sample).reduce((acc, key) => {
      const dayOrMonth = key === "day"
        ? DAYS_OF_WEEK[date.getDay()]
        : MONTHS[date.getMonth()];
      const value = typeof sample[key] === "string"
        ? dayOrMonth
        : options[key];

      return {
        ...acc,
        [key]: value,
      };
    }, { } as DateOptions);
  }

  return options;
}
