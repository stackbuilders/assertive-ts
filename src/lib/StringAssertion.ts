import { AssertionError } from "assert";

import { Assertion } from "./Assertion";

export class StringAssertion extends Assertion<string> {

  constructor(actual: string) {
    super(actual);
  }

  /**
   * Check if the string is empty. That is, when the string does not contain
   * any characters.
   *
   * @returns the assertion instance
   */
  public toBeEmpty(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be empty`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be empty"
    });

    return this.execute({
      assertWhen: this.actual === "",
      error,
      invertedError
    });
  }

  /**
   * Check if the string is blank. That is, when the string consists of one or
   * more whitespaces only.
   *
   * @returns the assertion instance
   */
  public toBeBlank(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to be blank`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be blank"
    });

    return this.execute({
      assertWhen: this.actual.trimStart().trimEnd() === "",
      error,
      invertedError
    });
  }

  /**
   * Check if the string value is equal to another string. The comparison is
   * not case sensitive, i.e. it ignores the cases of both string values.
   *
   * @returns the assertion instance
   */
  public toBeEqualIgnoringCase(text: string): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: text,
      message: "Expected both string to be equal ignoring case"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected both strings NOT to be equal ignoring case"
    });

    return this.execute({
      assertWhen: this.actual.toLowerCase() === text.toLowerCase(),
      error,
      invertedError
    });
  }

  /**
   * Check if the string value contains the passed string. This check compares
   * both strings in a case sensitive fashion.
   *
   * @param text the text the value should contain
   * @returns the assertion instance
   */
  public toContain(text: string): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: text,
      message: `Expected <${this.actual}> to contain <${text}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to contain <${text}>`
    });

    return this.execute({
      assertWhen: this.actual.includes(text),
      error,
      invertedError
    });
  }

  /**
   * Check if the string value contains the passed string. This check compares
   * both strings ignoring their cases.
   *
   * @param text the text the value should contain (ignoring case)
   * @returns the assertion instance
   */
  public toContainIgnoringCase(text: string): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: text,
      message: `Expected <${this.actual}> to contain <${text}> (ignoring case)`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to contain <${text}> (ignoring case)`
    });

    return this.execute({
      assertWhen: this.actual.toLowerCase().includes(text.toLowerCase()),
      error,
      invertedError
    });
  }

  /**
   * Check if the string value starts with the passed string
   *
   * @param text the text he value should start with
   * @returns the assertion instance
   */
  public toStartWith(text: string): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: text,
      message: `Expected <${this.actual}> to start with <${text}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      expected: text,
      message: `Expected <${this.actual}> NOT to start with <${text}>`
    });

    return this.execute({
      assertWhen: this.actual.startsWith(text),
      error,
      invertedError
    });
  }

  /**
   * Check if the string value ends with the passed string
   *
   * @param text the text he value should end with
   * @returns the assertion instance
   */
  public toEndWith(text: string): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: text,
      message: `Expected <${this.actual}> to end with <${text}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      expected: text,
      message: `Expected <${this.actual}> NOT to end with <${text}>`
    });

    return this.execute({
      assertWhen: this.actual.endsWith(text),
      error,
      invertedError
    });
  }

  /**
   * Check if the string value matches a regular expression.
   *
   * @param regex the regular expression to match
   * @returns the assertion instance
   */
  public toMatchRegex(regex: RegExp): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> to match the regular expression <${regex}>`
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected <${this.actual}> NOT to match the regular expression <${regex}>`
    });

    return this.execute({
      assertWhen: regex.test(this.actual),
      error,
      invertedError
    });
  }
}
