import { Assertion } from "./Assertion";
import { BoolAssertion } from "./BoolAssertion";

export function expect<T extends boolean>(actual: T): BoolAssertion<T>;
export function expect<T>(actual: T): Assertion<T>;
export function expect(actual: unknown): Assertion<unknown> {
  if (typeof actual === "boolean") {
    return new BoolAssertion(actual);
  }

  return new Assertion(actual);
}
