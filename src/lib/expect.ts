import { Assertion } from "./Assertion";
import { BooleanAssertion } from "./BooleanAssertion";
import { NumberAssertion } from "./NumberAssertion";
import { StringAssertion } from "./StringAssertion";

export function expect(actual: boolean): BooleanAssertion;
export function expect(actual: number): NumberAssertion;
export function expect<T>(actual: T): Assertion<T>;
export function expect(actual: unknown): Assertion<unknown> {
  switch (typeof actual) {
    case "boolean":
      return new BooleanAssertion(actual);
    case "string":
      return new StringAssertion(actual);
    case "number":
      return new NumberAssertion(actual);

    default:
      return new Assertion(actual);
  }
}
