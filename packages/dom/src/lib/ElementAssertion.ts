import { Assertion, AssertionError } from "@assertive-ts/core";

export class ElementAssertion<T extends Element> extends Assertion<T> {

  public constructor(actual: T) {
    super(actual);
  }

  /**
   * Check if the element is in the document.
   *
   * @returns the assertion instance.
   */
  public toBeInTheDocument(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected the element to be in the document",
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the element to NOT be in the document",
    });

    return this.execute({
      assertWhen: (
        this.actual.ownerDocument.defaultView !== null
        && this.actual.ownerDocument === this.actual.getRootNode({ composed: true })
      ),
      error,
      invertedError,
    });
  }

  /**
   * Check if the element has a specific attribute.
   *
   * @param name - The attribute name.
   * @param expectedValue - The expected attribute value (Optional).
   * @returns the assertion instance.
   */
  public toHaveAttribute(name: string, expectedValue?: string): this {
    const hasAttribute = this.actual.hasAttribute(name);
    const receivedValue = this.actual.getAttribute(name);
    const isExpectedValuePresent = expectedValue !== undefined;

    const error = new AssertionError({
      actual: receivedValue,
      expected: expectedValue,
      message: isExpectedValuePresent
        ? `Expected to have attribute "${name}" with value "${expectedValue}", but received "${receivedValue}"`
        : `Expected to have attribute "${name}"`,
    });

    const invertedError = new AssertionError({
      actual: receivedValue,
      expected: expectedValue,
      message: isExpectedValuePresent
        ? `Expected to NOT have attribute "${name}" with value "${expectedValue}", but received "${receivedValue}"`
        : `Expected to NOT have attribute "${name}"`,
    });

    return this.execute({
      assertWhen: (isExpectedValuePresent
        ? hasAttribute && receivedValue === expectedValue
        : hasAttribute),
      error,
      invertedError,
    });
  }

}
