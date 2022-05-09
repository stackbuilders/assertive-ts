import assert, { AssertionError } from "assert";

import { ErrorAssertion } from "../../src/lib/ErrorAssertion";

class CustomError extends Error {

  public constructor(message?: string) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

describe("[Unit] ErrorAssertion.test.ts", () => {
  describe(".toHaveMessage", () => {
    context("when the error message is equal to the passed text", () => {
      it("returns the assertion instance", () => {
        const test = new ErrorAssertion(new Error("foo"));

        assert.deepStrictEqual(test.toHaveMessage("foo"), test);
        assert.throws(() => test.not.toHaveMessage("foo"), {
          message: "Expected error to NOT contain the message: foo",
          name: AssertionError.name
        });
      });
    });

    context("when the error message is not equal to the passed text", () => {
      it("throws and assertion error", () => {
        const test = new ErrorAssertion(new Error("foo"));

        assert.throws(() => test.toHaveMessage("bar"), {
          message: "Expected error to contain the message: bar",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toHaveMessage("bar"), test);
      });
    });
  });

  describe(".toMatchMessage", () => {
    context("when the error message matches the regular expression", () => {
      it("returns the assertion instance", () => {
        const test = new ErrorAssertion(new Error("123"));

        assert.deepStrictEqual(test.toMatchMessage(/\d/g), test);
        assert.throws(() => test.not.toMatchMessage(/\d/g), {
          message: "Expected the error message NOT to match the regex <\\d>",
          name: AssertionError.name
        });
      });
    });

    context("when the error message does not matche the regular expression", () => {
      it("throws and assertion error", () => {
        const test = new ErrorAssertion(new Error("foo"));

        assert.throws(() => test.toMatchMessage(/\d/g), {
          message: "Expected the error message to match the regex <\\d>",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toMatchMessage(/\d/g), test);
      });
    });
  });

  describe(".toHaveName", () => {
    context("when the error name is equal to the passed text", () => {
      it("returns the assertion instance", () => {
        const test = new ErrorAssertion(new CustomError("foo"));

        assert.deepStrictEqual(test.toHaveName("CustomError"), test);
        assert.throws(() => test.not.toHaveName("CustomError"), {
          message: "Expected the error name NOT to be <CustomError>",
          name: AssertionError.name
        });
      });
    });

    context("when the error name is not equal to the passed text", () => {
      it("throws an assertion error", () => {
        const test = new ErrorAssertion(new CustomError("foo"));

        assert.throws(() => test.toHaveName("foo"), {
          message: "Expected the error name to be <foo>",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toHaveName("foo"), test);
      });
    });
  });
});
