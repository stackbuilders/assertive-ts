import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

// tslint:disable-next-line: ban-types
function functionExecution(func: Function): Error | undefined {
  try {
    func();
    return undefined;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    return new Error(`The function threw something that is not an Error: ${e}`);
  }
}

function assertion<E extends Error>(error: E | undefined , expectedError: E) {
  return !!error && error.name === expectedError.name && error.message === expectedError.message;
}

// tslint:disable-next-line: ban-types
export class FunctionAssertion extends Assertion<Function> {

  // tslint:disable-next-line: ban-types
  constructor(actual: Function) {
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
    const assert = expectedError ? assertion(errorExecution, expected) : errorExecution instanceof Error;
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
      assertWhen: !!assert,
      error,
      invertedError
    });
  }

  /**
   * Check if the value throws angit error with a specific message.
   *
   * @returns the assertion instance
   */
  public toThrowErrorMessage(errorMessage: string): this {
    const errorExecution = functionExecution(this.actual);
    const assert =  errorExecution && errorExecution.message === errorMessage;
    const error = new AssertionError({
      actual: this.actual,
      expected: errorMessage,
      message: `Expected to throw error with message <'${errorMessage}'>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected value to NOT throw error with message <'${errorMessage}'>`
    });

    return this.execute({
      assertWhen: !!assert,
      error,
      invertedError
    });
  }
}
