import assert, { AssertionError } from "assert";

import { BoolAssertion } from "../../src/lib/BoolAssertion";

describe("Lib.BoolAssertion", () => {
  describe(".isTrue", () => {
    context("when the value is NOT true", () => {
      it("throws an assertion error", () => {
        const test = new BoolAssertion(false);

        assert.throws(() => test.isTrue(), {
          message: "Expected <false> to be true",
          name: "AssertionError"
        });
      });
    });

    context("when the value is true", () => {
      it("does NOT throw an assertion error", () => {
        const test = new BoolAssertion(true);

        assert.doesNotThrow(() => test.isTrue(), AssertionError);
      });
    });
  });

  describe(".isFlase", () => {
    context("when the value is NOT false", () => {
      it("throws an assertion error", () => {
        const test = new BoolAssertion(true);

        assert.throws(() => test.isFalse(), {
          message: "Expected <true> to be false",
          name: "AssertionError"
        });
      });
    });

    context("when the value is false", () => {
      it("does NOT throw an assertion error", () => {
        const test = new BoolAssertion(false);

        assert.doesNotThrow(() => test.isFalse(), AssertionError);
      });
    });
  });
});
