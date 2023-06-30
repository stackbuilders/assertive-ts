import { ArrayAssertion } from "./ArrayAssertion";
import { Assertion } from "./Assertion";
import { BooleanAssertion } from "./BooleanAssertion";
import { DateAssertion } from "./DateAssertion";
import { ErrorAssertion } from "./ErrorAssertion";
import { AnyFunction, FunctionAssertion } from "./FunctionAssertion";
import { NumberAssertion } from "./NumberAssertion";
import { ObjectAssertion } from "./ObjectAssertion";
import { PromiseAssertion } from "./PromiseAssertion";
import { StringAssertion } from "./StringAssertion";
import { config } from "./config/Config";
import { isAnyFunction, isStruct, isPromise } from "./helpers/guards";
import { Struct } from "./helpers/types";

export interface Expect {
  (actual: boolean): BooleanAssertion;
  (actual: number): NumberAssertion;
  (actual: string): StringAssertion;
  (actual: Date): DateAssertion;
  <T>(actual: T[]): ArrayAssertion<T>;
  <T>(actual: Promise<T>): PromiseAssertion<T>;
  <T extends AnyFunction>(actual: T): FunctionAssertion<T>;
  <T extends Error>(actual: T): ErrorAssertion<T>;
  <T extends Struct>(actual: T): ObjectAssertion<T>;
  <T>(actual: T): Assertion<T>;
}

function expectMatcher<T>(actual: T): ReturnType<Expect> {
  const plugin = config.plugins().find(({ predicate }) => predicate(actual));

  if (plugin?.insertAt === "top") {
    return new plugin.Assertion(actual);
  }

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

  if (plugin?.insertAt === "bottom") {
    return new plugin.Assertion(actual);
  }

  if (isStruct(actual)) {
    return new ObjectAssertion(actual);
  }

  return new Assertion(actual);
}

export const expect: Expect = expectMatcher as Expect;
