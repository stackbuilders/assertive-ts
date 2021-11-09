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
  | "sunday" ;

export type DateMethod = {
  [K in keyof Date]: Date[K] extends () => number
    ? K
    : never;
}[keyof Date];

export interface DateConfOptions {
  year?: number;
  month?: Month | number;
  day?: DayOfWeek | number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  miliseconds?: number;
}
