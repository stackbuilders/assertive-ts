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
   * Check if a given container element contains a specified child element.
   *
   * @param element the child expected to be contained.
   * @returns the assertion instance.
   */
  public toContainElement(element: Element): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected the container to contain the element",
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the container to NOT contain the element",
    });

    return this.execute({
      assertWhen: this.actual.contains(element),
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

  public toHaveClass(classNames: string | string[], options: { exact?: boolean } = {}): this {
    const actualClassList = this.actual.className.split(/\s+/).filter(Boolean);
    const expectedClassList = Array.isArray(classNames) ? classNames : [classNames];
    const { exact = false } = options;

    const error = new AssertionError({
      actual: actualClassList,
      expected: expectedClassList,
      message: exact
        ? `Expected the element to have exactly these classes: "${expectedClassList.join(' ')}"`
        : `Expected the element to have class(es): "${expectedClassList.join(' ')}"`,
    });

    const invertedError = new AssertionError({
      actual: actualClassList,
      expected: expectedClassList,
      message: exact
        ? `Expected the element to NOT have exactly these classes: "${expectedClassList.join(' ')}"`
        : `Expected the element to NOT have class(es): "${expectedClassList.join(' ')}"`,
    });

    const assertWhen = exact
      ? actualClassList.length === expectedClassList.length && expectedClassList.every(cls => actualClassList.includes(cls))
      : expectedClassList.every(cls => actualClassList.includes(cls));

    return this.execute({
      assertWhen,
      error,
      invertedError,
    });
  }
}
