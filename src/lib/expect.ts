import { Assertion } from "./Assertion";
import { BooleanAssertion } from "./BooleanAssertion";
import { DateAssertion } from "./DateAssertion";
import { FunctionAssertion } from "./FunctionAssertion";
import { isPromise } from "./helpers/guards";
import { NumberAssertion } from "./NumberAssertion";
import { ObjectAssertion } from "./ObjectAssertion";
import { PromiseAssertion } from "./PromiseAssertion";
import { StringAssertion } from "./StringAssertion";

export function expect(actual: boolean): BooleanAssertion;
export function expect(actual: number): NumberAssertion;
export function expect(actual: string): StringAssertion;
export function expect(actual: Date): DateAssertion;
export function expect<T extends object>(actual: T): ObjectAssertion<T>;
export function expect<T>(actual: Promise<T>): PromiseAssertion<T>; // tslint:disable-next-line: ban-types
export function expect(actual: Function): FunctionAssertion;
export function expect<T>(actual: T): Assertion<T>;
export function expect<T>(actual: unknown): Assertion<unknown> | PromiseAssertion<T> {
  if (isPromise<T>(actual)) {
    return new PromiseAssertion(actual);
  }

  if (actual instanceof Date) {
    return new DateAssertion(actual);
  }

  switch (typeof actual) {
    case "boolean": return new BooleanAssertion(actual);
    case "string": return new StringAssertion(actual);
    case "number": return new NumberAssertion(actual);
    case "function": return new FunctionAssertion(actual);
    case "object": return actual === null
      ? new Assertion(actual)
      : new ObjectAssertion(actual);

    default: return new Assertion(actual);
  }
}
