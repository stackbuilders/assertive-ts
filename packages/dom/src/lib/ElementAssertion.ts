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
   * Check if a given ancestor element contains a specified child element.
   * 
   * @param element - the child element.
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
      assertWhen: (
        this.actual.contains(element)
      ),
      error,
      invertedError,
    });
  }
}
