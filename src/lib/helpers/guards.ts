export function isPromise<T>(value: unknown): value is Promise<T> {
  const maybePromise = value as (Promise<T> | null);

  return typeof value === "object"
    && typeof maybePromise?.then === "function"
    && typeof maybePromise?.catch === "function"
    && typeof maybePromise?.finally === "function";
}
