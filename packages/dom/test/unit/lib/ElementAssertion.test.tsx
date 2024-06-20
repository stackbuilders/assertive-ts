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
describe("[Unit] ElementAssertion.test.ts", () => {
  describe(".toBeInTheDocument", () => {
    context("when the element is in the document", () => {
      it("returns the assertion instance", async () => {
        const { findByRole } = render(<TestComponent />);
        const button = await findByRole("button", {
          name: "click me",
        });
        const test = new ElementAssertion(button);

        expect(test.toBeInTheDocument())
          .toBeEqual(test);

        expect(() => test.not.toBeInTheDocument())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the element to NOT be in the document");
      });
    });
    context("when the element is not in the document", () => {
      it("Throws an assertion error", () => {
        const detachedElement = document.createElement("div");

        const test = new ElementAssertion(detachedElement);

        expect(() => test.toBeInTheDocument())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected the element to be in the document");

        expect(test.not.toBeInTheDocument())
          .toBeEqual(test);
      });
    });
  });
});
