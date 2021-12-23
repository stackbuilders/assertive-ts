import { Assertion } from "./Assertion";
import { BooleanAssertion } from "./BooleanAssertion";
import { FunctionAssertion } from "./FunctionAssertion";
import { isPromise } from "./helpers/guards";
import { NumberAssertion } from "./NumberAssertion";
import { PromiseAssertion } from "./PromiseAssertion";
import { StringAssertion } from "./StringAssertion";

export function expect(actual: boolean): BooleanAssertion;
export function expect(actual: number): NumberAssertion;
export function expect(actual: boolean): BooleanAssertion;
export function expect(actual: string): StringAssertion;
export function expect<T>(actual: Promise<T>): PromiseAssertion<T>; // tslint:disable-next-line: ban-types
export function expect(actual: Function): FunctionAssertion;
export function expect<T>(actual: T): Assertion<T>;
export function expect<T>(actual: unknown): Assertion<unknown> | PromiseAssertion<T> {
  if (isPromise<T>(actual)) {
    return new PromiseAssertion(actual);
  }

  switch (typeof actual) {
    case "boolean": return new BooleanAssertion(actual);
    case "string": return new StringAssertion(actual);
    case "number": return new NumberAssertion(actual);
    case "function": return new FunctionAssertion(actual);

    default: return new Assertion(actual);
  }
}
