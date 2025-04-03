import { ArrayAssertion } from "../ArrayAssertion";
import { Assertion, Constructor } from "../Assertion";
import { BooleanAssertion } from "../BooleanAssertion";
import { DateAssertion } from "../DateAssertion";
import { ErrorAssertion } from "../ErrorAssertion";
import { type AnyFunction, FunctionAssertion } from "../FunctionAssertion";
import { NumberAssertion } from "../NumberAssertion";
import { ObjectAssertion } from "../ObjectAssertion";
import { StringAssertion } from "../StringAssertion";

import { isStruct } from "./guards";
import { Struct } from "./types";

export type AssertionFactory<S, A extends Assertion<S>> = new(actual: S) => A;

/**
 * Used to instantiate a specific assertion type.
 *
 * @typeParam S the type of the factory's value
 * @typeParam A the type of the assertion factory
 */
export interface TypeFactory<S, A extends Assertion<S>> {
  /**
   * Assertion constructor.
   */
  Factory: AssertionFactory<S, A>;
  /**
   * A predicate function to check the type of the factory's value.
   *
   * @param value the factory's value
   */
  predicate: (value: unknown) => value is S;
  /**
   * The type of this factory.
   */
  typeName: string;
}

/**
 * Encapsulates a set of predefined {@link TypeFactory} instances.
 */
export interface StaticTypeFactories {
  /**
   * A `boolean` TypeFactory.
   */
  Boolean: TypeFactory<boolean, BooleanAssertion>;
  /**
   * A `Date` TypeFactory.
   */
  Date: TypeFactory<Date, DateAssertion>;
  /**
   * An `Error` TypeFactory.
   */
  Error: TypeFactory<Error, ErrorAssertion<Error>>;
  /**
   * A `function` TypeFactory.
   */
  Function: TypeFactory<AnyFunction, FunctionAssertion<AnyFunction>>;
  /**
   * A `number` TypeFactory.
   */
  Number: TypeFactory<number, NumberAssertion>;
  /**
   * A `string` TypeFactory.
   */
  String: TypeFactory<string, StringAssertion>;
  /**
   * Creates an array TypeFactory of the given TypeFactory.
   *
   * @example
   * ```
   * TypeFactories.array(TypeFactories.String); // a `string[]` factory
   * TypeFactories.array(TypeFactories.Date); // a `Date[]` factory
   * ```
   * @typeParam T the type of the array
   * @param innerType the TypeFactory for the array type
   */
  array<T>(innerType?: TypeFactory<T, Assertion<T>>): TypeFactory<T[], ArrayAssertion<T>>;
  /**
   * Creates an `Error` TypeFactory for a specific error constructor.
   *
   * @example
   * ```
   * class CustomError extends Error { ... }
   *
   * TypeFactories.error(CustomError); // a `CustomError` error factory
   * ```
   *
   * @typeParam T the type of the error constructor
   * @param Type the error constructor
   */
  error<T extends Error>(Type: Constructor<T>): TypeFactory<T, ErrorAssertion<T>>;
  /**
   * Creates a TypeFactory for an instance of the given constructor.
   *
   * @example
   * ```
   * class Person { ... }
   *
   * TypeFactories.instanceOf(Person); // a `Person` instance factory
   * TypeFactories.instanceOf(Error); // an `Error` instance factory
   * ```
   *
   * @typeParam T the type of the instance constructor
   * @param Type the instance constructor
   */
  instanceOf<T>(Type: Constructor<T>): TypeFactory<T, Assertion<T>>;
  /**
   * Creates a TypeFactory for a Javascript Object.
   *
   * @example
   * ```
   * interface User {
   *   name: string;
   *   age: number;
   * }
   *
   * TypeFactories.object<User>(); // a `User` object factory
   * ```
   * @typeParam T the type of the object
   */
  object<T extends Struct>(): TypeFactory<T, ObjectAssertion<T>>;
}

export const TypeFactories: Readonly<StaticTypeFactories> = {
  Boolean: {
    Factory: BooleanAssertion,
    predicate: (value): value is boolean => typeof value === "boolean",
    typeName: "boolean",
  },
  Date: {
    Factory: DateAssertion,
    predicate: (value): value is Date => value instanceof Date,
    typeName: Date.name,
  },
  Error: {
    Factory: ErrorAssertion,
    predicate: (value): value is Error => value instanceof Error,
    typeName: Error.name,
  },
  Function: {
    Factory: FunctionAssertion,
    predicate: (value): value is AnyFunction => typeof value === "function",
    typeName: "function",
  },
  Number: {
    Factory: NumberAssertion,
    predicate: (value): value is number => typeof value === "number",
    typeName: "number",
  },
  String: {
    Factory: StringAssertion,
    predicate: (value): value is string => typeof value === "string",
    typeName: "string",
  },
  array<T>(innerType?: TypeFactory<T, Assertion<T>>) {
    return {
      Factory: ArrayAssertion,
      predicate: (value): value is T[] =>
        innerType !== undefined
          ? Array.isArray(value) && value.every(innerType.predicate)
          : Array.isArray(value),
      typeName: "array",
    };
  },
  error<T extends Error>(Type: Constructor<T>) {
    return {
      Factory: ErrorAssertion,
      predicate: (value): value is T => value instanceof Type,
      typeName: Type.name,
    };
  },
  instanceOf<T>(type: Constructor<T>) {
    return {
      Factory: Assertion,
      predicate: (value): value is T => value instanceof type,
      typeName: type.name,
    };
  },
  object<T extends Struct>() {
    return {
      Factory: ObjectAssertion,
      predicate: (value): value is T => isStruct(value),
      typeName: "object",
    };
  },
};
