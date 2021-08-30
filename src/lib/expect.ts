import { Assertion } from "./Assertion";
import { BooleanAssertion } from "./BooleanAssertion";
import { StringAssertion } from "./StringAssertion";

export function expect(actual: boolean): BooleanAssertion;
export function expect<T>(actual: T): Assertion<T>;
export function expect(actual: unknown): Assertion<unknown> {
  switch (typeof actual) {
    case "boolean": return new BooleanAssertion(actual);
    case "string": return new StringAssertion(actual);

    default: return new Assertion(actual);
  }
}
