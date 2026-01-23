export type Month
  = "april"
  | "august"
  | "december"
  | "february"
  | "january"
  | "july"
  | "june"
  | "march"
  | "may"
  | "november"
  | "october"
  | "september";

export type DayOfWeek
  = "friday"
  | "monday"
  | "saturday"
  | "sunday"
  | "thursday"
  | "tuesday"
  | "wednesday";

export type DateMethod = {
  [K in keyof Date]: Date[K] extends () => number
    ? K
    : never;
}[keyof Date];

export interface DateOptions {
  day?: DayOfWeek | number;
  hours?: number;
  milliseconds?: number;
  minutes?: number;
  month?: Month | number;
  seconds?: number;
  year?: number;
}
