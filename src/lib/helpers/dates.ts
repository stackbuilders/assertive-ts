import { DateOptions, DayOfWeek, Month } from "../DateAssertion.types";

export function dayOfWeekAsNumber (day: DayOfWeek): number {
    switch (day) {
      case "sunday": return 0;
      case "monday": return 1;
      case "tuesday": return 2;
      case "wednesday": return 3;
      case "thursday": return 4;
      case "friday": return 5;
      case "saturday": return 6;
    }
  }

  export function monthOfYear (month: Month): number {
    switch (month) {
      case "january": return 0;
      case "february": return 1;
      case "march": return 2;
      case "april": return 3;
      case "may": return 4;
      case "june": return 5;
      case "july": return 6;
      case "august": return 7;
      case "september": return 8;
      case "october": return 9;
      case "november": return 10;
      case "december": return 11;
    }
  }

  export function dateOptionsToDate(options: DateOptions): Date {
    const { year, month, day, hours, minutes, seconds, miliseconds } = options;
    const monthAsNum = typeof month === "string"
      ? monthOfYear(month)
      : month;
    const dayAsNum = typeof day === "string"
      ? dayOfWeekAsNumber(day)
      : day;
    const today = new Date();
    return new Date(
      year ?? today.getFullYear(),
      monthAsNum ?? today.getMonth(),
      dayAsNum ?? today.getDate(),
      hours ?? today.getHours(),
      minutes ?? today.getMinutes(),
      seconds ?? today.getSeconds(),
      miliseconds ?? today.getMilliseconds()
    );
  }
