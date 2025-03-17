import { ReactTestInstance } from "react-test-renderer";

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
