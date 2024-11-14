import { ReactTestInstance } from "react-test-renderer";

export function getType({ type }: ReactTestInstance): string {
    // @ts-expect-error: ReactTestInstance contains too loose typing
    return type.displayName || type.name || type;
  }
