import { ArrayAssertion } from "../ArrayAssertion";
import { Assertion } from "../Assertion";
import { BooleanAssertion } from "../BooleanAssertion";
import { DateAssertion } from "../DateAssertion";
import { AnyFunction, FunctionAssertion } from "../FunctionAssertion";
import { NumberAssertion } from "../NumberAssertion";
import { JSObject, ObjectAssertion } from "../ObjectAssertion";
import { StringAssertion } from "../StringAssertion";

import { isJSObject } from "./guards";

export type AssertionFactory<S, A extends Assertion<S>> = new(actual: S) => A;

export interface TypeFactory<S, A extends Assertion<S>> {
  Factory: AssertionFactory<S, A>;
  predicate(value: unknown): value is S;
  typeName: string;
}

export interface StaticTypeFactories {
  Boolean: TypeFactory<boolean, BooleanAssertion>;
  Date: TypeFactory<Date, DateAssertion>;
  Function: TypeFactory<AnyFunction, FunctionAssertion<AnyFunction>>;
  Number: TypeFactory<number, NumberAssertion>;
  String: TypeFactory<string, StringAssertion>;
  array<T>(innerType?: TypeFactory<T, Assertion<T>>): TypeFactory<T[], ArrayAssertion<T>>;
  instanceOf<T extends Function>(type: T): TypeFactory<T, Assertion<T>>; // tslint:disable-line: ban-types
  object<T extends JSObject>(): TypeFactory<T, ObjectAssertion<T>>;
}

export const TypeFactories: Readonly<StaticTypeFactories> = {
  Boolean: {
    Factory: BooleanAssertion,
    predicate: (value): value is boolean => typeof value === "boolean",
    typeName: "boolean"
  },
  Date: {
    Factory: DateAssertion,
    predicate: (value): value is Date => value instanceof Date,
    typeName: Date.name
  },
  Function: {
    Factory: FunctionAssertion,
    predicate: (value): value is AnyFunction => typeof value === "function",
    typeName: "function"
  },
  Number: {
    Factory: NumberAssertion,
    predicate: (value): value is number => typeof value === "number",
    typeName: "number"
  },
  String: {
    Factory: StringAssertion,
    predicate: (value): value is string => typeof value === "string",
    typeName: "string"
  },
  array<T>(innerType?: TypeFactory<T, Assertion<T>>) {
    return {
      Factory: ArrayAssertion,
      predicate: (value): value is T[] =>
        innerType !== undefined
          ? Array.isArray(value) && value.every(innerType.predicate)
          : Array.isArray(value),
      typeName: "array"
    };
  },
  instanceOf(type) {
    return {
      Factory: Assertion,
      predicate: (value): value is typeof type => value instanceof type,
      typeName: type.name
    };
  },
  object<T extends JSObject>() {
    return {
      Factory: ObjectAssertion,
      predicate: (value): value is T => isJSObject(value),
      typeName: "object"
    };
  }
};
