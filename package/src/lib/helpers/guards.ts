import type { AnyFunction } from "../FunctionAssertion";
import type {
  BetweenOptions,
  HighInclusiveBetweenOptions,
  InclusiveBetweenOptions,
  LowInclusiveBetweenOptions,
} from "../NumberAssertion";

export function isJSObject<T>(value: T): value is { [K in keyof T]: T[K] } {
  return value !== null
    && typeof value === "object"
    && typeof value !== "function";
}

export function isKeyOf<T extends object>(target: T, key: unknown): key is keyof T {
  return (
    typeof key === "string"
    || typeof key === "number"
    || typeof key === "symbol"
  )
  && key in target;
}

export function isPromise<T>(value: unknown): value is Promise<T> {
  const maybePromise = value as Promise<T> | null;

  return (
    typeof value === "object"
      && typeof maybePromise?.then === "function"
      && typeof maybePromise?.catch === "function"
      && typeof maybePromise?.finally === "function"
  );
}

export function isAnyFunction<T extends AnyFunction>(func: unknown): func is T {
  return typeof func === "function";
}

export function isInclusiveOptions(options: BetweenOptions): options is InclusiveBetweenOptions {
  return (options as InclusiveBetweenOptions).inclusive !== undefined;
}

export function isLowInclusiveOptions(options: BetweenOptions): options is LowInclusiveBetweenOptions {
  return (options as LowInclusiveBetweenOptions).lowInclusive !== undefined;
}

export function isHighInclusiveOptions(options: BetweenOptions): options is HighInclusiveBetweenOptions {
  return (options as HighInclusiveBetweenOptions).highInclusive !== undefined;
}
