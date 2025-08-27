import { Assertion, AssertionError } from "@assertive-ts/core";
import { parse } from "@adobe/css-tools";
import { CssAtRuleAST, getProps, isSameStyle, normalizeStylesObject, normalizeStylesString } from "./helpers/helpers";

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

  /**
   * Asserts that the element has the specified class.
   *
   * @param className The class name to check.
   * @returns the assertion instance.
   */
  public toHaveClass(className: string): this {
    const actualClassList = this.getClassList();

    return this.assertClassPresence(
      actualClassList.includes(className),
      [className],
      `Expected the element to have class: "${className}"`,
      `Expected the element to NOT have class: "${className}"`,
    );
  }

  /**
   * Asserts that the element has at least one of the specified classes.
   *
   * @param classNames - A variadic list of class names to check.
   * @returns the assertion instance.
   */
  public toHaveAnyClass(...classNames: string[]): this {
    const actualClassList = this.getClassList();

    return this.assertClassPresence(
      classNames.some(cls => actualClassList.includes(cls)),
      classNames,
      `Expected the element to have at least one of these classes: "${classNames.join(" ")}"`,
      `Expected the element to NOT have any of these classes: "${classNames.join(" ")}"`,
    );
  }

  /**
   * Asserts that the element has all of the specified classes.
   *
   * @param classNames - A variadic list of class names to check.
   * @returns the assertion instance.
   */
  public toHaveAllClasses(...classNames: string[]): this {
    const actualClassList = this.getClassList();

    return this.assertClassPresence(
      classNames.every(cls => actualClassList.includes(cls)),
      classNames,
      `Expected the element to have all of these classes: "${classNames.join(" ")}"`,
      `Expected the element to NOT have all of these classes: "${classNames.join(" ")}"`,
    );
  }

  /**
   * Check if the provided element is currently focused in the document.
   *
   * @example
   * const userNameInput = document.querySelector('#username');
   * userNameInput.focus();
   * expect(userNameInput).toHaveFocus(); // passes
   * expect(userNameInput).not.toHaveFocus(); // fails
   *
   * @returns The assertion instance.
   */
    public toHaveFocus(): this {

      const hasFocus = this.actual === document.activeElement;

      const error = new AssertionError({
        actual: this.actual,
        expected: document.activeElement,
        message: "Expected the element to be focused",
      });

      const invertedError = new AssertionError({
        actual: this.actual,
        expected: document.activeElement,
        message: "Expected the element NOT to be focused",
      });

      return this.execute({
        assertWhen: hasFocus,
        error,
        invertedError,
      });
    }

  private getClassList(): string[] {
    return this.actual.className.split(/\s+/).filter(Boolean);
  }

  /**
   * Asserts that the element has the specified CSS styles.
   *
   * @param css - The expected CSS styles.
   * @returns The assertion instance.
   */

  public toHaveStyle(css: Object | string): this {
    if (this.actual instanceof HTMLElement || this.actual["ownerDocument"]) {
      const parsedCSS =
        typeof css === "object"
          ? css
          : parse(`selector { ${css} }`, { silent: true }).stylesheet;

      const window = this.actual.ownerDocument.defaultView;
      const computedStyle = window?.getComputedStyle;

      const expected = parsedCSS as CssAtRuleAST;
      const received = computedStyle?.(this.actual) as CSSStyleDeclaration;
      
      
      const { props, expectedStyle } =
      typeof css === "object"
      ? normalizeStylesObject(css, window!)
      : normalizeStylesString(expected, window!);
      
      const receivedStyle = getProps(props, received);

      const error = new AssertionError({
        actual: this.actual,
        message: `Expected the element to have ${JSON.stringify(expectedStyle
        )} style`,
        expected: expectedStyle,
      });
      const invertedError = new AssertionError({
        actual: this.actual,
        message: `Expected the element to NOT have ${JSON.stringify(
          expectedStyle
        )} style`,
      });
      return this.execute({
        assertWhen: isSameStyle(expectedStyle, receivedStyle),
        error,
        invertedError,
      });
    }
    return this;
  }


  /**
   * Helper method to assert the presence or absence of class names.
   *
   * @param assertCondition - Boolean to determine assertion pass or fail.
   * @param classNames - Array of class names involved in the assertion.
   * @param message - Assertion error message.
   * @param invertedMessage - Inverted assertion error message.
   * @returns the assertion instance.
   */
  private assertClassPresence(
    assertCondition: boolean,
    classNames: string[],
    message: string,
    invertedMessage: string,
  ): this {
    const actualClassList = this.getClassList();

    const error = new AssertionError({
      actual: actualClassList,
      expected: classNames,
      message,
    });

    const invertedError = new AssertionError({
      actual: actualClassList,
      expected: classNames,
      message: invertedMessage,
    });

    return this.execute({
      assertWhen: assertCondition,
      error,
      invertedError,
    });
  }
}
