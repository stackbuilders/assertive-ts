export type Month =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

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
