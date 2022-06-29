import { ArrayAssertion } from "./ArrayAssertion";
import { Assertion } from "./Assertion";
import { BooleanAssertion } from "./BooleanAssertion";
import { DateAssertion } from "./DateAssertion";
import { ErrorAssertion } from "./ErrorAssertion";
import { AnyFunction, FunctionAssertion } from "./FunctionAssertion";
import { isAnyFunction, isJSObject, isPromise } from "./helpers/guards";
import { NumberAssertion } from "./NumberAssertion";
import { JSObject, ObjectAssertion } from "./ObjectAssertion";
import { PromiseAssertion } from "./PromiseAssertion";
import { StringAssertion } from "./StringAssertion";

type PromiseType<T> = T extends Promise<infer X> ? X : never;

type ArrayType<T> = T extends Array<infer X> ? X : never;

export function expect<T extends boolean>(actual: T): BooleanAssertion;
export function expect<T extends number>(actual: T): NumberAssertion;
export function expect<T extends string>(actual: T): StringAssertion;
export function expect<T extends Date>(actual: T): DateAssertion;
export function expect<T extends unknown[]>(actual: T): ArrayAssertion<ArrayType<T>>;
export function expect<T extends Promise<any>>(actual: T): PromiseAssertion<PromiseType<T>>;
export function expect<T extends AnyFunction>(actual: T): FunctionAssertion<T>;
export function expect<T extends Error>(actual: T): ErrorAssertion<T>;
export function expect<T extends JSObject>(actual: T): ObjectAssertion<T>;
export function expect<T>(actual: T): Assertion<T>;
export function expect<T>(actual: T) {
  switch (typeof actual) {
    case "boolean": return new BooleanAssertion(actual);
    case "number": return new NumberAssertion(actual);
    case "string": return new StringAssertion(actual);
  }

  if (actual instanceof Date) {
    return new DateAssertion(actual);
  }

  if (Array.isArray(actual)) {
    return new ArrayAssertion(actual);
  }

  if (isPromise<T>(actual)) {
    return new PromiseAssertion(actual);
  }

  if (isAnyFunction(actual)) {
    return new FunctionAssertion(actual);
  }

  if (actual instanceof Error) {
    return new ErrorAssertion(actual);
  }

  if (isJSObject(actual)) {
    return new ObjectAssertion(actual);
  }

  return new Assertion(actual);
}
