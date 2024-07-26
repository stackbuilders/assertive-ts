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

function TestComponentElement(): ReactElement {
  return (
    <button role="button" type="submit" className="btn primary" disabled>
      click me
    </button>
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

  describe(".toHaveAttribute", () => {
    context("when the element has the attribute with the expected value", () => {
      it("returns the assertion instance", async () => {
        const { findByRole } = render(<TestComponentElement />);
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
        const { findByRole } = render(<TestComponentElement />);
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
        const { findByRole } = render(<TestComponentElement />);
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
        const { findByRole } = render(<TestComponentElement />);
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
