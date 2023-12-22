export function prettify<T>(value: T): string {
  const isClassObject = typeof value === "object"
    && value !== null
    && value.toString() !== "[object Object]";

  if (Array.isArray(value)) {
    return `[${value.map(prettify).join(",")}]`;
  }

  if (
    isClassObject
    || value === undefined
    || Number.isNaN(value)
    || typeof value === "symbol"
    || typeof value === "bigint"
  ) {
    return String(value);
  }

  return typeof value === "function"
    ? value.toString()
    : JSON.stringify(value);
}
