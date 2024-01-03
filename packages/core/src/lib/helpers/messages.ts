export function prettify<T>(value: T): string {
  const isClassObject = typeof value === "object"
    && value !== null
    && value.toString() !== "[object Object]";
  const nonJsonValue = value === undefined
    || Number.isNaN(value)
    || typeof value === "symbol"
    || typeof value === "bigint";

  if (Array.isArray(value)) {
    return `[${value.map(prettify).join(",")}]`;
  }

  if (isClassObject || nonJsonValue) {
    return String(value);
  }

  return typeof value === "function"
    ? value.toString()
    : JSON.stringify(value);
}
