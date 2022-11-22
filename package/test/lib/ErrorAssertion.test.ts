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
          message: "Expected error NOT to have the message: foo",
          name: AssertionError.name
        });
      });
    });

    context("when the error message is not equal to the passed text", () => {
      it("throws and assertion error", () => {
        const test = new ErrorAssertion(new Error("foo"));

        assert.throws(() => test.toHaveMessage("bar"), {
          message: "Expected error to have the message: bar",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toHaveMessage("bar"), test);
      });
    });
  });

  describe(".toHaveMessageStartingWith", () => {
    context("when the error message starts with the passed text", () => {
      it("returns the assertion instance", () => {
        const test = new ErrorAssertion(new Error("Something went wrong"));

        assert.deepStrictEqual(test.toHaveMessageStartingWith("Something went"), test);
        assert.throws(() => test.not.toHaveMessageStartingWith("Something went"), {
          message: "Expected error NOT to have a message starting with: Something went",
          name: AssertionError.name
        });
      });
    });

    context("when the error message does not start with the passed text", () => {
      it("throws and assertion error", () => {
        const test = new ErrorAssertion(new Error("Something went wrong"));

        assert.throws(() => test.toHaveMessageStartingWith("went wrong"), {
          message: "Expected error to have a message starting with: went wrong",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toHaveMessageStartingWith("went wrong"), test);
      });
    });
  });

  describe(".toHaveMessageContaining", () => {
    context("when the error message contains the passed text", () => {
      it("returns the assertion instance", () => {
        const test = new ErrorAssertion(new Error("Something went wrong"));

        assert.deepStrictEqual(test.toHaveMessageContaining("went"), test);
        assert.throws(() => test.not.toHaveMessageContaining("went"), {
          message: "Expected error NOT to have a message containing: went",
          name: AssertionError.name
        });
      });
    });

    context("when the error message does not contain the passed text", () => {
      it("throws and assertion error", () => {
        const test = new ErrorAssertion(new Error("Something went wrong"));

        assert.throws(() => test.toHaveMessageContaining("foo"), {
          message: "Expected error to have a message containing: foo",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toHaveMessageContaining("foo"), test);
      });
    });
  });

  describe(".toHaveMessageEndingWith", () => {
    context("when the error message ends with the passed text", () => {
      it("returns the assertion instance", () => {
        const test = new ErrorAssertion(new Error("Something went wrong"));

        assert.deepStrictEqual(test.toHaveMessageEndingWith("went wrong"), test);
        assert.throws(() => test.not.toHaveMessageEndingWith("went wrong"), {
          message: "Expected error NOT to have a message ending with: went wrong",
          name: AssertionError.name
        });
      });
    });

    context("when the error message does not end with the passed text", () => {
      it("throws and assertion error", () => {
        const test = new ErrorAssertion(new Error("Something went wrong"));

        assert.throws(() => test.toHaveMessageEndingWith("Something"), {
          message: "Expected error to have a message ending with: Something",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toHaveMessageEndingWith("Something"), test);
      });
    });
  });

  describe(".toHaveMessageMatching", () => {
    context("when the error message matches the regular expression", () => {
      it("returns the assertion instance", () => {
        const test = new ErrorAssertion(new Error("123"));

        assert.deepStrictEqual(test.toHaveMessageMatching(/\d/g), test);
        assert.throws(() => test.not.toHaveMessageMatching(/\d/g), {
          message: "Expected the error message NOT to match the regex <\\d>",
          name: AssertionError.name
        });
      });
    });

    context("when the error message does not matche the regular expression", () => {
      it("throws and assertion error", () => {
        const test = new ErrorAssertion(new Error("foo"));

        assert.throws(() => test.toHaveMessageMatching(/\d/g), {
          message: "Expected the error message to match the regex <\\d>",
          name: AssertionError.name
        });
        assert.deepStrictEqual(test.not.toHaveMessageMatching(/\d/g), test);
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
