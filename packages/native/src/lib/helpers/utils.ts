import { ReactTestInstance } from "react-test-renderer";

export function isEmpty(value: unknown): boolean {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
}

export function instanceToString(instance: ReactTestInstance | null): string {
  if (instance === null) {
    return "null";
  }

  return `<${instance.type.toString()} ... />`;
}

export function isElementContained(parentElement: ReactTestInstance, childElement: ReactTestInstance): boolean {
  if (parentElement === null || childElement === null) {
    return false;
  }
  return (
      parentElement.findAll(
          node =>
              node.type === childElement.type && node.props === childElement.props,
      ).length > 0
  );
}
