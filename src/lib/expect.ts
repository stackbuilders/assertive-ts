import { Assertion } from "./Assertion";
import { BooleanAssertion } from "./BooleanAssertion";

export function expect(actual: boolean): BooleanAssertion;
export function expect<T>(actual: T): Assertion<T>;
export function expect(actual: unknown): Assertion<unknown> {
  if (typeof actual === "boolean") {
    return new BooleanAssertion(actual);
  }

  return new Assertion(actual);
}
