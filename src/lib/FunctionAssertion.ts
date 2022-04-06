import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

export type AnyFunction = (...args: any[]) => any;

function functionExecution<T extends AnyFunction>(func: T): Error | undefined {
  try {
    func();
    return undefined;
  } catch (error) {
    return error instanceof Error
      ? error
      : Error(`The function threw something that is not an Error: ${error}`);
  }
}

function assertion<E extends Error>(error: E | undefined , expectedError: E): boolean {
  return !!error
    && error?.name === expectedError.name
    && error?.message === expectedError.message;
}

export class FunctionAssertion<T extends AnyFunction> extends Assertion<T> {

  constructor(actual: T) {
    super(actual);
  }

  /**
   * Check if the value throws an error.
   *
   * @returns the assertion instance
   */
  public toThrowError<E extends Error>(expectedError?: E): this {
    const expected = expectedError || new Error();
    const errorExecution = functionExecution(this.actual);
    const error = new AssertionError({
      actual: this.actual,
      expected,
      message: `Expected to throw error <${expected.name}> with message <'${expected.message || ""}'>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected value to NOT throw error <${expected.name}> with message <'${expected.message || ""}'>`
    });

    return this.execute({
      assertWhen: expectedError
        ? assertion(errorExecution, expected)
        : errorExecution instanceof Error,
      error,
      invertedError
    });
  }
}
