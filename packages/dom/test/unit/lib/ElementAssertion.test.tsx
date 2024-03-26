import { AssertionError, expect } from "@assertive-ts/core";
import { render } from "@testing-library/react";

import { ElementAssertion } from "../../../src/lib/ElementAssertion";

import { NestedElementsTestComponent } from "./fixtures/nestedElementsTestComponent";
import { SimpleTestComponent } from "./fixtures/simpleTestComponent";
import { WithAttributesTestComponent } from "./fixtures/withAttributesTestComponent";

describe("[Unit] ElementAssertion.test.ts", () => {
  describe(".toBeInTheDocument", () => {
    context("when the element is in the document", () => {
      it("returns the assertion instance", async () => {
        const { findByRole } = render(<SimpleTestComponent />);
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
        it("returns the assertion instance", async () => {
          const { findByTestId } = render(<NestedElementsTestComponent />);
          const grandparent = await findByTestId("grandparent");
          const parent = await findByTestId("parent");
          const child = await findByTestId("child");
          const svgElement = await findByTestId("svg-element");
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
        it("returns the assertion instance", async () => {
          const { findByTestId } = render(<NestedElementsTestComponent />);
          const grandparent = await findByTestId("grandparent");
          const child = await findByTestId("child");
          const grandparentTest = new ElementAssertion(grandparent);

          expect(grandparentTest.toContainElement(child));

          expect(() => grandparentTest.not.toContainElement(child))
            .toThrowError(AssertionError)
            .toHaveMessage("Expected the container to NOT contain the element");
        });
      });

      context("and it is a deeply nested child", () => {
        it("returns the assertion instance", async () => {
          const { findByTestId } = render(<NestedElementsTestComponent />);
          const grandparent = await findByTestId("grandparent");
          const deepChild = await findByTestId("deep-child");
          const grandparentTest = new ElementAssertion(grandparent);

          expect(grandparentTest.toContainElement(deepChild));

          expect(() => grandparentTest.not.toContainElement(deepChild))
            .toThrowError(AssertionError)
            .toHaveMessage("Expected the container to NOT contain the element");
        });
      });
    });

    context("when element is NOT contained in ancestor element", () => {
      it("throws an assertion error", async () => {
        const notChildElement = document.createElement("span");
        const { findByTestId } = render(<NestedElementsTestComponent />);
        const grandparent = await findByTestId("grandparent");
        const grandparentTest = new ElementAssertion(grandparent);

        expect(() => grandparentTest.toContainElement(notChildElement))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the container to contain the element");

        expect(grandparentTest.not.toContainElement(notChildElement)).toBeEqual(grandparentTest);
      });
    });
  });

  describe(".toHaveAttribute", () => {
    context("when the element has the attribute with the expected value", () => {
      it("returns the assertion instance", async () => {
        const { findByRole } = render(<WithAttributesTestComponent />);
        const button = await findByRole("button", { name: "click me" });
        const test = new ElementAssertion(button);

        expect(test.toHaveAttribute("type", "submit")).toBeEqual(test);

        expect(() => test.not.toHaveAttribute("type", "submit"))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected to NOT have attribute \"type\" with value \"submit\", but received \"submit\"");
      });
    });

    context("when the element has the attribute with a not expected value", () => {
      it("throws an assertion error", async () => {
        const { findByRole } = render(<WithAttributesTestComponent />);
        const button = await findByRole("button", { name: "click me" });
        const test = new ElementAssertion(button);

        expect(() => test.toHaveAttribute("type", "different value"))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected to have attribute \"type\" with value \"different value\", but received \"submit\"",
          );

        expect(test.not.toHaveAttribute("type", "different value")).toBeEqual(test);
      });
    });

    context("when the element has the attribute without checking value", () => {
      it("returns the assertion instance", async () => {
        const { findByRole } = render(<WithAttributesTestComponent />);
        const button = await findByRole("button", { name: "click me" });
        const test = new ElementAssertion(button);

        expect(test.toHaveAttribute("disabled")).toBeEqual(test);

        expect(() => test.not.toHaveAttribute("disabled"))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected to NOT have attribute \"disabled\"");
      });
    });

    context("when the element does not have the attribute", () => {
      it("throws an assertion error", async () => {
        const { findByRole } = render(<WithAttributesTestComponent />);
        const button = await findByRole("button", { name: "click me" });
        const test = new ElementAssertion(button);

        expect(() => test.toHaveAttribute("non-existent"))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected to have attribute \"non-existent\"");

        expect(test.not.toHaveAttribute("non-existent")).toBeEqual(test);
      });
    });
  });
});
