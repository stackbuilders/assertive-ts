import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

export class ErrorAssertion<T extends Error> extends Assertion<T> {

  public constructor(actual: T) {
    super(actual);
  }

  /**
   * Check if the error contains exactly the passed error.
   *
   * @param message the message the error should contain
   * @returns the assertion instance
   */
  public toHaveMessage(message: string): this {
    const error = new AssertionError({
      actual: this.actual.message,
      expected: message,
      message: `Expected error to contain the message: ${message}`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected error to NOT contain the message: ${message}`
    });

    return this.execute({
      assertWhen: this.actual.message === message,
      error,
      invertedError
    });
  }

  /**
   * Check if the error matches the provided regular expression.
   *
   * @param regex the regular expression to match the error message
   * @returns the assertion error
   */
  public toMatchMessage(regex: RegExp): this {
    const error = new AssertionError({
      actual: this.actual.message,
      message: `Expected the error message to match the regex <${regex.source}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the error message NOT to match the regex <${regex.source}>`
    });

    return this.execute({
      assertWhen: regex.test(this.actual.message),
      error,
      invertedError
    });
  }

  /**
   * Check if the name of the error is the passed name.
   *
   * @param name the name of the error
   * @returns the assertion instance
   */
  public toHaveName(name: string): this {
    const error = new AssertionError({
      actual: this.actual.message,
      message: `Expected the error name to be <${name}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the error name NOT to be <${name}>`
    });

    return this.execute({
      assertWhen: this.actual.name === name,
      error,
      invertedError
    });
  }
}
