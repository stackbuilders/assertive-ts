import { Assertion, AssertionError } from "@assertive-ts/core";

export class ElementAssertion extends Assertion<Element> {

  public constructor(actual: Element) {
    super(actual);
  }

  /**
   * Check if the element is in the document.
   * @returns the assertion instance.
   */
  public toBeInTheDocument(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the element to be in the document`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the element to NOT be in the document`,
    })

    return this.execute({
      assertWhen: (this.actual.ownerDocument.defaultView !== null
        && this.actual.ownerDocument === this.actual.getRootNode({composed: true})),
      error,
      invertedError,
    })
  }
}