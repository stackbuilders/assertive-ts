import assert from "assert";

import { BooleanAssertion } from "../../src/lib/BooleanAssertion";

describe("[Unit] BooleanAssertion.test.ts", () => {
  describe(".isTrue", () => {
    context("when the value is true", () => {
      it("returns the assertion instance", () => {
        const test = new BooleanAssertion(true);

        assert.deepStrictEqual(test.isTrue(), test);
        assert.throws(() => test.not.isTrue(), {
          message: "Expected value to NOT be true",
          name: "AssertionError"
        });
      });
    });

    context("when the value is NOT true", () => {
      it("throws an assertion error", () => {
        const test = new BooleanAssertion(false);

        assert.throws(() => test.isTrue(), {
          message: "Expected value to be true",
          name: "AssertionError"
        });
        assert.deepStrictEqual(test.not.isTrue(), test.not);
      });
    });
  });

  describe(".isFlase", () => {
    context("when the value is false", () => {
      it("returns the assertion instance", () => {
        const test = new BooleanAssertion(false);

        assert.deepStrictEqual(test.isFalse(), test);
        assert.throws(() => test.not.isFalse(), {
          message: "Expected value to NOT be false",
          name: "AssertionError"
        });
      });
    });

    context("when the value is NOT false", () => {
      it("throws an assertion error", () => {
        const test = new BooleanAssertion(true);

        assert.throws(() => test.isFalse(), {
          message: "Expected value to be false",
          name: "AssertionError"
        });
        assert.deepStrictEqual(test.not.isFalse(), test.not);
      });
    });
  });
});
