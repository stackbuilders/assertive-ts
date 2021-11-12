import {
  BetweenOptions,
  HighInclusiveBetweenOptions,
  InclusiveBetweenOptions,
  LowInclusiveBetweenOptions,
} from "../NumberAssertion";

export function isPromise<T>(value: unknown): value is Promise<T> {
  const maybePromise = value as Promise<T> | null;

  return (
    typeof value === "object" &&
    typeof maybePromise?.then === "function" &&
    typeof maybePromise?.catch === "function" &&
    typeof maybePromise?.finally === "function"
  );
}

export function isInclusiveOptions(
  options: BetweenOptions
): options is InclusiveBetweenOptions {
  return (options as InclusiveBetweenOptions).inclusive !== undefined;
}

export function isLowInclusiveOptions(
  options: BetweenOptions
): options is LowInclusiveBetweenOptions {
  return (options as LowInclusiveBetweenOptions).lowInclusive !== undefined;
}

export function isHighInclusiveOptions(
  options: BetweenOptions
): options is HighInclusiveBetweenOptions {
  return (options as HighInclusiveBetweenOptions).highInclusive !== undefined;
}
