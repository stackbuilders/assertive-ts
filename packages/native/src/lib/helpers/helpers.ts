import { ReactTestInstance } from "react-test-renderer";

/**
 * Converts a ReactTestInstance to a string representation.
 *
 * @param instance The ReactTestInstance to convert.
 * @returns A string representation of the instance.
 */
export function instanceToString(instance: ReactTestInstance | null): string {
  if (instance === null) {
    return "null";
  }

  return `<${instance.type.toString()} ... />`;
}
