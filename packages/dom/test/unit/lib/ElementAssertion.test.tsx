import { AssertionError, expect } from "@assertive-ts/core";
import { render } from "@testing-library/react";

import { ElementAssertion } from "../../../src/lib/ElementAssertion";
import { TestComponent, ContainsTestComponent } from "../../../src/lib/resources/fixtures";

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
    context("when the descendant element is contained in the ancestor element", () => {
      context("and it is a direct child", () => {
        it("returns the assertion instance", () => {
          const { getByTestId } = render(<ContainsTestComponent/>);

          const grandparent = getByTestId("grandparent");
          const parent = getByTestId("parent");
          const child = getByTestId("child");
          const svgElement = getByTestId("svg-element");

          const grandparentTest = new ElementAssertion(grandparent);
          const parentTest = new ElementAssertion(parent);

          expect(grandparentTest.toContainElement(parent));
          expect(grandparentTest.toContainElement(svgElement));
          expect(parentTest.toContainElement(child));

          expect(() => grandparentTest.not.toContainElement(parent))
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

      context("and it is an indirect child", () => {
        it("returns the assertion instance", () => {
          const { getByTestId } = render(<ContainsTestComponent/>);

          const grandparent = getByTestId("grandparent");
          const child = getByTestId("child");

          const grandparentTest = new ElementAssertion(grandparent);

          expect(grandparentTest.toContainElement(child));

          expect(() => grandparentTest.not.toContainElement(child))
            .toThrowError(AssertionError)
            .toHaveMessage("Expected the container to NOT contain the element");
        });
      });

      context("and it is a deeply nested child", () => {
        it("returns the assertion instance", () => {
          const { getByTestId } = render(<ContainsTestComponent/>);

          const grandparent = getByTestId("grandparent");
          const deepChild = getByTestId("deep-child");

          const grandparentTest = new ElementAssertion(grandparent);

          expect(grandparentTest.toContainElement(deepChild));

          expect(() => grandparentTest.not.toContainElement(deepChild))
            .toThrowError(AssertionError)
            .toHaveMessage("Expected the container to NOT contain the element");
        });
      });
    });

    context("when element is NOT contained in ancestor element", () => {
      it("throws an assertion error", () => {
        const detachedElement = document.createElement("span") as Element;
        const { getByTestId } = render(<ContainsTestComponent/>);

          const grandparent = getByTestId("grandparent");

          const grandparentTest = new ElementAssertion(grandparent);

        expect(() => grandparentTest.toContainElement(detachedElement))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to contain the element");

        expect(grandparentTest.not.toContainElement(detachedElement)).toBeEqual(grandparentTest);
      });
    });
  });
});
