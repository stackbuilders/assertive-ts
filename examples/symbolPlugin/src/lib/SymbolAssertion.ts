import { Assertion, AssertionError } from "@assertive-ts/core";

export class SymbolAssertion extends Assertion<symbol> {

  public constructor(actual: symbol) {
    super(actual);
  }

  public toBeSymbol(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected ${String(this.actual)} to be a symbol`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected ${String(this.actual)} not to be a symbol`,
    });

    return this.execute({
      assertWhen: typeof this.actual === "symbol",
      error,
      invertedError,
    });
  }

  public toHaveDescription(expected: string): this {
    const error = new AssertionError({
      actual: this.actual.description,
      expected,
      message: `Expected ${String(this.actual)} to have the description: ${expected}`,
    });
    const invertedError = new AssertionError({
      actual: this.actual.description,
      message: `Expected ${String(this.actual)} not to have the description: ${expected}`,
    });

    return this.execute({
      assertWhen: this.actual.description === expected,
      error,
      invertedError,
    });
  }
}
