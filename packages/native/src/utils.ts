import { ReactTestInstance } from "react-test-renderer";

export function checkReactElement(
    element: ReactTestInstance | null | undefined
  ): asserts element is ReactTestInstance {
    if (!element) {
      throw new Error('Value must be a React element');
    }
  
    // @ts-expect-error internal _fiber property of ReactTestInstance
    if (!element._fiber && !VALID_ELEMENTS.includes(element.type.toString())) {
        throw new Error('Value must be a React element');
    }
  }

export function getType({ type }: ReactTestInstance) : string {
    // @ts-expect-error: ReactTestInstance contains too loose typing
    return type.displayName || type.name || type;
  }
