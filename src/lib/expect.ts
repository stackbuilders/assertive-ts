import { Assertion } from "./Assertion";
import { BooleanAssertion } from "./BooleanAssertion";
import { PromiseAssertion } from "./PromiseAssertion";
import { StringAssertion } from "./StringAssertion";

export function expect(actual: boolean): BooleanAssertion;
export function expect(actual: string): StringAssertion;
export function expect<T>(actual: Promise<T>): PromiseAssertion<T>;
export function expect<T>(actual: T): Assertion<T>;
export function expect<T>(actual: unknown): Assertion<unknown> | PromiseAssertion<T> {
  if (isPromise<T>(actual)) {
    return new PromiseAssertion(actual);
  }

  switch (typeof actual) {
    case "boolean": return new BooleanAssertion(actual);
    case "string": return new StringAssertion(actual);

    default: return new Assertion(actual);
  }
}

function isPromise<T>(value: unknown): value is Promise<T> {
  return typeof value === "object"
    && typeof Object(value)?.then === "function"
    && typeof Object(value)?.catch === "function"
    && typeof Object(value)?.finally === "function";
}
