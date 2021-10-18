import assert from "assert";

import { FunctionAssertion } from "../../src/lib/FunctionAssertion";

const testErrorFunction = () => { throw new TypeError("Error"); };
const testNormalFunction = () => { return 0; };

describe("[Unit] FunctionAssertion.test.ts", () => {
  describe(".toThrowException", () => {
    context("when the value throws an exception", () => {
      it("returns the assertion instance", () => {
        const test = new FunctionAssertion(testErrorFunction);

        assert.deepStrictEqual(test.toThrowError(TypeError, "Error"), test);
        assert.throws(() => test.not.toThrowError(TypeError, "Error"), {
          message: "Expected value to NOT throw error <TypeError> with message <'Error'>",
          name: "AssertionError"
        });
      });
    });

    context("when the value throws an exception, but no error is provided", () => {
      it("returns the assertion instance", () => {
        const test = new FunctionAssertion(testErrorFunction);

        assert.deepStrictEqual(test.toThrowError(), test);
        assert.throws(() => test.not.toThrowError(), {
          message: "Expected value to NOT throw error <Error> with message <''>",
          name: "AssertionError"
        });
      });
    });

    context("when the value does NOT throw error", () => {
      it("throws an assertion error", () => {
        const test = new FunctionAssertion(testNormalFunction);

        assert.throws(() => test.toThrowError(TypeError, "Error"), {
          message: "Expected to throw error <TypeError> with message <'Error'>",
          name: "AssertionError"
        });
        assert.deepStrictEqual(test.not.toThrowError(TypeError, "Error"), test.not);
      });
    });

    context("when the value does throw error, but with a different message", () => {
      it("throws an assertion error", () => {
        const test = new FunctionAssertion(testErrorFunction);

        assert.throws(() => test.toThrowError(TypeError, "Error 2"), {
          message: "Expected to throw error <TypeError> with message <'Error 2'>",
          name: "AssertionError"
        });
        assert.deepStrictEqual(test.not.toThrowError(TypeError, "Error 2"), test.not);
      });
    });

    context("when the value does throw error, but of a different type", () => {
      it("throws an assertion error", () => {
        const test = new FunctionAssertion(testErrorFunction);

        assert.throws(() => test.toThrowError(RangeError, "Error"), {
          message: "Expected to throw error <RangeError> with message <'Error'>",
          name: "AssertionError"
        });
        assert.deepStrictEqual(test.not.toThrowError(RangeError, "Error"), test.not);
      });
    });
  });
});
