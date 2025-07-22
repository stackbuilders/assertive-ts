import { ReactTestInstance } from "react-test-renderer";

/**
 * Checks if a value is empty.
 *
 * @param value - The value to check.
 * @returns `true` if the value is empty, `false` otherwise.
 */
export function isEmpty(value: unknown): boolean {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
}

/**
 * Converts a ReactTestInstance to a string representation.
 *
 * @param instance - The ReactTestInstance to convert.
 * @returns A string representation of the instance.
 */
export function instanceToString(instance: ReactTestInstance | null): string {
  if (instance === null) {
    return "null";
  }

  return `<${instance.type.toString()} ... />`;
}
