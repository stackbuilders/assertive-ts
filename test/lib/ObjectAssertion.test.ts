import assert from "assert";

import { ObjectAssertion } from "../../src/lib/ObjectAssertion";

const ASSERTION_ERROR: string = "AssertionError";

describe("[Unit] ObjectAssertion.test.ts", () => {
  describe(".toBeEmptyObject", () => {
    context("when the object is an empty object", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({});

        assert.deepStrictEqual(test.toBeEmptyObject(), test);
        assert.throws(() => test.not.toBeEmptyObject(), {
          message: "Expected the value NOT to be an empty object",
          name: ASSERTION_ERROR,
        });
      });
    });

    context("when the object is NOT an empty object", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ prop1: "someValue" });

        assert.throws(() => test.toBeEmptyObject(), {
          message: "Expected the value to be an empty object",
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toBeEmptyObject(), test);
      });
    });
  });

  describe(".toContain", () => {
    context("when the object contains the provided value", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ foo: "someValue" });

        assert.deepStrictEqual(test.toContain("someValue"), test);
        assert.throws(() => test.not.toContain("someValue"), {
          message: `Expected the object NOT to contain the provided value <someValue>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context("when the object does NOT contain the provided value", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ foo: "someValue" });

        assert.throws(() => test.toContain("wrongValue"), {
          message: `Expected the object to contain the provided value <wrongValue>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toContain("wrongValue"), test);
      });
    });

    context("when the object contains the provided entry", () => {
      it("returns the assertion instance", () => {
        const test = new ObjectAssertion({ foo: "someValue" });

        assert.deepStrictEqual(test.toContain("someValue", "foo"), test);
        assert.throws(() => test.not.toContain("someValue", "foo"), {
          message: `Expected the object's key <foo> NOT to contain the provided value <someValue>`,
          name: ASSERTION_ERROR,
        });
      });
    });

    context("when the object does NOT contain the provided entry", () => {
      it("throws an assertion error", () => {
        const test = new ObjectAssertion({ foo: "someValue" });

        assert.throws(() => test.toContain("wrongValue", "foo"), {
          message: `Expected the object's key <foo> to contain the provided value <wrongValue>`,
          name: ASSERTION_ERROR,
        });
        assert.deepStrictEqual(test.not.toContain("wrongValue", "foo"), test);
      });
    });
  });
});
