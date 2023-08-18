export function prettify<T>(value: T): string {
  return typeof value === "object" && value !== null
    ? value.toString()
    : String(value);
}
