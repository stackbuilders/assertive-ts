import assert from "assert";

import { FunctionAssertion } from "../../src/lib/FunctionAssertion";

const testErrorFunction = () => {throw new TypeError("Error")}
const testNormalFunction = () => {}

describe("[Unit] FunctionAssertion.test.ts", () => {
  describe(".toThrowException", () => {
    context("when the value throws an exception", () => {
      it("returns the assertion instance", () => {
        const test = new FunctionAssertion(testErrorFunction);

        assert.deepStrictEqual(test.toThrowError(TypeError, "Error"), test);
        assert.throws(() => test.not.toThrowError(TypeError,"Error"), {
          message: "Expected value to NOT throw error",
          name: "AssertionError"
        });
      });
    });

    context("when the value does NOT throw error", () => {
      it("throws an assertion error", () => {
        const test = new FunctionAssertion(testNormalFunction);

        assert.throws(() => test.toThrowError(TypeError,"Error"), {
          message: "Expected to throw error",
          name: "AssertionError"
        });
        assert.deepStrictEqual(test.not.toThrowError(TypeError,"Error"), test.not);
      });
    });
  });
});
