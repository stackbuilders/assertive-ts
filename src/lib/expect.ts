import { Assertion } from "./Assertion";
import { BooleanAssertion } from "./BooleanAssertion";
import { DateAssertion } from "./DateAssertion";
import { isPromise } from "./helpers/guards";
import { PromiseAssertion } from "./PromiseAssertion";
import { StringAssertion } from "./StringAssertion";

export function expect(actual: boolean): BooleanAssertion;
export function expect(actual: string): StringAssertion;
export function expect(actual: Date): DateAssertion;
export function expect<T>(actual: Promise<T>): PromiseAssertion<T>;
export function expect<T>(actual: T): Assertion<T>;
export function expect<T>(
  actual: unknown
): Assertion<unknown> | PromiseAssertion<T> {
  if (isPromise<T>(actual)) {
    return new PromiseAssertion(actual);
  }

  if (actual instanceof Date) {
    return new DateAssertion(actual);
  }

  switch (typeof actual) {
    case "boolean":
      return new BooleanAssertion(actual);
    case "string":
      return new StringAssertion(actual);

    default:
      return new Assertion(actual);
  }
}
