import assert, { AssertionError } from "assert";

import { BooleanAssertion } from "../../src/lib/BooleanAssertion";

describe("[Unit] BooleanAssertion.test.ts", () => {
  describe(".toBeTrue", () => {
    context("when the value is true", () => {
      it("returns the assertion instance", () => {
        const test = new BooleanAssertion(true);

        assert.deepStrictEqual(test.toBeTrue(), test);
        assert.throws(() => test.not.toBeTrue(), {
          message: "Expected value to NOT be true",
          name: AssertionError.name,
        });
      });
    });

    context("when the value is NOT true", () => {
      it("throws an assertion error", () => {
        const test = new BooleanAssertion(false);

        assert.throws(() => test.toBeTrue(), {
          message: "Expected value to be true",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeTrue(), test);
      });
    });
  });

  describe(".toBeFalse", () => {
    context("when the value is false", () => {
      it("returns the assertion instance", () => {
        const test = new BooleanAssertion(false);

        assert.deepStrictEqual(test.toBeFalse(), test);
        assert.throws(() => test.not.toBeFalse(), {
          message: "Expected value to NOT be false",
          name: AssertionError.name,
        });
      });
    });

    context("when the value is NOT false", () => {
      it("throws an assertion error", () => {
        const test = new BooleanAssertion(true);

        assert.throws(() => test.toBeFalse(), {
          message: "Expected value to be false",
          name: AssertionError.name,
        });
        assert.deepStrictEqual(test.not.toBeFalse(), test);
      });
    });
  });
});
