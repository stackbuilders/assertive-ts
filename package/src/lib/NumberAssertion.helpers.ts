export interface BaseBetweenOptions {
  range: [number, number];
}

export interface CloseToOptions {
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

export function isInclusiveOptions(options: BetweenOptions): options is InclusiveBetweenOptions {
  return (options as InclusiveBetweenOptions).inclusive !== undefined;
}

export function isLowInclusiveOptions(options: BetweenOptions): options is LowInclusiveBetweenOptions {
  return (options as LowInclusiveBetweenOptions).lowInclusive !== undefined;
}

export function isHighInclusiveOptions(options: BetweenOptions): options is HighInclusiveBetweenOptions {
  return (options as HighInclusiveBetweenOptions).highInclusive !== undefined;
}
