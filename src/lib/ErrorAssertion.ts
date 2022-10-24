import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

/**
 * Encapsulates assertion methods applicable to Error instances.
 *
 * @param T the Error constructor type
 */
export class ErrorAssertion<T extends Error> extends Assertion<T> {

  public constructor(actual: T) {
    super(actual);
  }

  /**
   * Check if the error has exactly the passed error.
   *
   * @example
   * ```
   * const myError = new Error("This is bad!");
   * expect(myError).toHaveMessage("This is bad!");
   * ```
   *
   * @param message the message the error should contain
   * @returns the assertion instance
   */
  public toHaveMessage(message: string): this {
    const error = new AssertionError({
      actual: this.actual.message,
      expected: message,
      message: `Expected error to have the message: ${message}`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected error NOT to have the message: ${message}`
    });

    return this.execute({
      assertWhen: this.actual.message === message,
      error,
      invertedError
    });
  }

  /**
   * Check if the error has a message that starts with the provided fragment
   *
   * @example
   * ```
   * const myError = new Error("404: Not found");
   * expect(myError).toHaveMessageStartingWith("404");
   * ```
   *
   * @param fragment the fragment the message should start with
   * @returns the assertion instance
   */
  public toHaveMessageStartingWith(fragment: string): this {
    const error = new AssertionError({
      actual: this.actual.message,
      message: `Expected error to have a message starting with: ${fragment}`
    });
    const invertedError = new AssertionError({
      actual: this.actual.message,
      message: `Expected error NOT to have a message starting with: ${fragment}`
    });

    return this.execute({
      assertWhen: this.actual.message.startsWith(fragment),
      error,
      invertedError
    });
  }

  /**
   * Check if the error has a message that contains the provided fragment
   *
   * @example
   * ```
   * const myError = new Error("404: Page not found");
   * expect(myError).toHaveMessageContaining("not found");
   * ```
   *
   * @param fragment the fragment the message should contain
   * @returns the assertion instance
   */
   public toHaveMessageContaining(fragment: string): this {
    const error = new AssertionError({
      actual: this.actual.message,
      message: `Expected error to have a message containing: ${fragment}`
    });
    const invertedError = new AssertionError({
      actual: this.actual.message,
      message: `Expected error NOT to have a message containing: ${fragment}`
    });

    return this.execute({
      assertWhen: this.actual.message.includes(fragment),
      error,
      invertedError
    });
  }

  /**
   * Check if the error has a message that ends with the provided fragment
   *
   * @example
   * ```
   * const myError = new Error("502: Internal server error");
   * expect(myError).toHaveMessageEndingWith("server error");
   * ```
   *
   * @param fragment the fragment the message should end with
   * @returns the assertion instance
   */
   public toHaveMessageEndingWith(fragment: string): this {
    const error = new AssertionError({
      actual: this.actual.message,
      message: `Expected error to have a message ending with: ${fragment}`
    });
    const invertedError = new AssertionError({
      actual: this.actual.message,
      message: `Expected error NOT to have a message ending with: ${fragment}`
    });

    return this.execute({
      assertWhen: this.actual.message.endsWith(fragment),
      error,
      invertedError
    });
  }

  /**
   * Check if the error has a message that matches the provided regular
   * expression.
   *
   * @example
   * ```
   * const myError = new Error("404: Page not found");
   * expect(myError).toHaveMessageMatching(/^\d{3}:/);
   * ```
   *
   * @param regex the regular expression to match the error message
   * @returns the assertion error
   */
  public toHaveMessageMatching(regex: RegExp): this {
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
   * @example
   * ```
   * expect(new Error("This is an error!")).toHaveName("Error");
   *
   * class Error404 extends Error {
   *   constructor(message?: string) {
   *     super(message);
   *
   *     this.name = "404 Error";
   *   }
   * }
   *
   * expect(new Error404()).toHaveName("404 Error");
   * ```
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
