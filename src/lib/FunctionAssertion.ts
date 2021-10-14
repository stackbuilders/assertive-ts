import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

function functionExecution(func: Function): Error | undefined {
  try {
    func();
    return undefined;
  } catch (e) {
    return e as Error;
  }
}

function assertion(error: Error|undefined, type: ErrorConstructor, message?: string) {
  return !!error && error instanceof type && error.message === message
}

export class FunctionAssertion extends Assertion<Function> {

  constructor(actual: Function) {
    super(actual);
  }
  /**
   * Check if the value throws an error.
   *
   * @returns the assertion instance
   */
  public toThrowError(type?: ErrorConstructor, message?: string): this {
    const expected = type ? new type(message) : Error;
    const errorExecution = functionExecution(this.actual);
    const assert = type ? assertion(errorExecution, type, message) : errorExecution instanceof Error;
  
    const error = new AssertionError({
      actual: this.actual,
      expected,
      message: "Expected to throw error"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected value to NOT throw error"
    });


    return this.execute({
      assertWhen: !!assert,
      error,
      invertedError
    });
  }
}
