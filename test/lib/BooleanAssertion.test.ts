import assert from "assert";

import { BooleanAssertion } from "../../src/lib/BooleanAssertion";

describe("Lib.BoolAssertion", () => {
  describe(".isTrue", () => {
    context("when the value is NOT true", () => {
      it("throws an assertion error", () => {
        const test = new BooleanAssertion(false);

        assert.throws(() => test.isTrue(), {
          message: "Expected <false> to be true",
          name: "AssertionError"
        });
      });
    });

    context("when the value is true", () => {
      it("returns the assertion instance", () => {
        const test = new BooleanAssertion(true);

        assert.deepStrictEqual(test.isTrue(), test);
      });
    });
  });

  describe(".isFlase", () => {
    context("when the value is NOT false", () => {
      it("throws an assertion error", () => {
        const test = new BooleanAssertion(true);

        assert.throws(() => test.isFalse(), {
          message: "Expected <true> to be false",
          name: "AssertionError"
        });
      });
    });

    context("when the value is false", () => {
      it("returns the assertion instance", () => {
        const test = new BooleanAssertion(false);

        assert.deepStrictEqual(test.isFalse(), test);
      });
    });
  });
});
