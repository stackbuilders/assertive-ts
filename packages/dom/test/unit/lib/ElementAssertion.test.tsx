import { AssertionError, expect } from "@assertive-ts/core";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

import { ElementAssertion } from "../../../src/lib/ElementAssertion";

function TestComponent(): ReactElement {
  return (
    <div>
      <button>click me</button>
    </div>
  );
}

function ContainsTestComponent(): ReactElement {
  return (
    <span data-testid="grandparent">
      <span data-testid="parent">
        <span data-testid="child"></span>
      </span>
      <svg data-testid="svg-element"></svg>
    </span>
  );
}

describe("[Unit] ElementAssertion.test.ts", () => {
  describe(".toBeInTheDocument", () => {
    context("when the element is in the document", () => {
      it("returns the assertion instance", async () => {
        const { findByRole } = render(<TestComponent />);
        const button = await findByRole("button", { name: "click me" });
        const test = new ElementAssertion(button);

        expect(test.toBeInTheDocument()).toBeEqual(test);

        expect(() => test.not.toBeInTheDocument())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the element to NOT be in the document");
      });
    });

    context("when the element is not in the document", () => {
      it("throws an assertion error", () => {
        const detachedElement = document.createElement("div");

        const test = new ElementAssertion(detachedElement);

        expect(() => test.toBeInTheDocument())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the element to be in the document");

        expect(test.not.toBeInTheDocument()).toBeEqual(test);
      });
    });
  });

  describe(".toContainElement", () => {
    context("when the ancestor element contains the descendant element", () => {
      it("returns the assertion instance", () => {
        const { getByTestId } = render(<ContainsTestComponent/>);

        const grandparent = getByTestId("grandparent");
        const parent = getByTestId("parent");
        const child = getByTestId("child");
        const svgElement = getByTestId("svg-element");

        const grandparentTest = new ElementAssertion(grandparent);
        const parentTest = new ElementAssertion(parent);

        expect(grandparentTest.toContainElement(parent));
        expect(grandparentTest.toContainElement(child));
        expect(grandparentTest.toContainElement(svgElement));
        expect(parentTest.toContainElement(child));

        expect(() => grandparentTest.not.toContainElement(parent))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to NOT contain the element");

        expect(() => grandparentTest.not.toContainElement(child))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to NOT contain the element");

        expect(() => grandparentTest.not.toContainElement(svgElement))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to NOT contain the element");

        expect(() => parentTest.not.toContainElement(child))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to NOT contain the element");
      });
    });

    context("when the descendant element does not contain the ancestor element", () => {
      it("returns the assertion instance", () => {
        const { getByTestId } = render(<ContainsTestComponent/>);

        const grandparent = getByTestId("grandparent");
        const parent = getByTestId("parent");
        const child = getByTestId("child");
        const svgElement = getByTestId("svg-element");

        const parentTest = new ElementAssertion(parent);
        const childTest = new ElementAssertion(child);

        expect(parentTest.not.toContainElement(grandparent));
        expect(parentTest.not.toContainElement(svgElement));
        expect(childTest.not.toContainElement(grandparent));
        expect(childTest.not.toContainElement(parent));
        expect(childTest.not.toContainElement(svgElement));

        expect(() => parentTest.toContainElement(grandparent))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to contain the element");

        expect(() => parentTest.toContainElement(svgElement))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to contain the element");

        expect(() => childTest.toContainElement(grandparent))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to contain the element");

        expect(() => childTest.toContainElement(parent))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to contain the element");

        expect(() => childTest.toContainElement(svgElement))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to contain the element");
      });
    });
  });
});
