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

export function isEmpty(element: ReactTestInstance): boolean {
  const children = element?.children;

  if (!children) {
    return true;
  }

  if (Array.isArray(children)) {
    return children.length === 0;
  }

  return false;
}
