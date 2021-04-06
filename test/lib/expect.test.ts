import assert from "assert";

import expect from "../../src";
import { Assertion } from "../../src/lib/Assertion";
import { BooleanAssertion } from "../../src/lib/BooleanAssertion";

describe("Lib.Expect", () => {
  context("when the actual value is a boolean", () => {
    it("returns a BoolAssertion instance", () => {
      const test = expect(true);

      assert(test instanceof BooleanAssertion);
    });
  });

  context("when actual value is non of the specific implementations", () => {
    it("returns am Assertion instance", () => {
      const test = expect({ name: "foo" });

      assert(test instanceof Assertion);
    });
  });
});
