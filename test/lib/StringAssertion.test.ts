import assert from "assert";

import { StringAssertion } from "../../src/lib/StringAssertion";

const ASSERTION_ERROR: string = "AssertionError";

describe("[Unit] StringAssertion.test.ts", () => {
  describe(".toBeEmpty", () => {
    context("when the value is an empty string", () => {
      it("returns the assertion instance", () => {
        const test = new StringAssertion("");

        assert.deepStrictEqual(test.toBeEmpty(), test);
        assert.throws(() => test.not.toBeEmpty(), {
          message: "Expected the value NOT to be empty",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the value NOT an empty string", () => {
      it("throws an assertion error", () => {
        const test = new StringAssertion("Hello World!");

        assert.throws(() => test.toBeEmpty(), {
          message: "Expected <Hello World!> to be empty",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toBeEmpty(), test.not);
      });
    });
  });

  describe(".toBeBlank", () => {
    context("when the value has only whitespaces", () => {
      it("returns the assertion instance", () => {
        const test = new StringAssertion("   ");

        assert.deepStrictEqual(test.toBeBlank(), test);
        assert.throws(() => test.not.toBeBlank(), {
          message: "Expected the value NOT to be blank",
          name: ASSERTION_ERROR
        });
      });
    });
    context("when the value does NOT have only whitespaces", () => {
      it("throws an assertion error", () => {
        const test = new StringAssertion("  x y z  ");

        assert.throws(() => test.toBeBlank(), {
          message: "Expected <  x y z  > to be blank",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toBeBlank(), test.not);
      });
    });
  });

  describe(".toBeEqualIgnoringCase", () => {
    context("when both values are equal ignoring cases", () => {
      it("returns the assertion instance", () => {
        const test = new StringAssertion("MiXeD TeXt");

        assert.deepStrictEqual(test.toBeEqualIgnoringCase("mIxEd tExT"), test);
        assert.throws(() => test.not.toBeEqualIgnoringCase("mIxEd tExT"), {
          message: "Expected both strings NOT to be equal ignoring case",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when both values are NOT equal ignoring cases", () => {
      it("throws an assertion error", () => {
        const test = new StringAssertion("MiXeD TeXt");

        assert.throws(() => test.toBeEqualIgnoringCase("mIxEd sTrInG"), {
          message: "Expected both string to be equal ignoring case",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toBeEqualIgnoringCase("mIxEd sTrInG"), test.not);
      });
    });
  });

  describe(".toContain", () => {
    context("when the value contains the passed string", () => {
      it("returns the assertion instance", () => {
        const test = new StringAssertion("Hello World!");

        assert.deepStrictEqual(test.toContain("Hello"), test);
        assert.throws(() => test.not.toContain("Hello"), {
          message: "Expected <Hello World!> NOT to contain <Hello>",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the value does NOT contain the passed string", () => {
      it("throws an assertion error", () => {
        const test = new StringAssertion("Hello World!");

        assert.throws(() => test.toContain("Bye"), {
          message: "Expected <Hello World!> to contain <Bye>",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toContain("Bye"), test.not);
      });
    });
  });

  describe(".toContainIgnoringCase", () => {
    context("when the value contains the passed string ignoring case", () => {
      it("returns the assertion instance", () => {
        const test = new StringAssertion("Hello World!");

        assert.deepStrictEqual(test.toContainIgnoringCase("hello"), test);
        assert.throws(() => test.not.toContainIgnoringCase("hello"), {
          message: "Expected <Hello World!> NOT to contain <hello> (ignoring case)",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the value does NOT contain the passed string ignoring case", () => {
      it("throws an assertion error", () => {
        const test = new StringAssertion("Hello World!");

        assert.throws(() => test.toContainIgnoringCase("bye"), {
          message: "Expected <Hello World!> to contain <bye> (ignoring case)",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toContainIgnoringCase("bye"), test.not);
      });
    });
  });

  describe(".toStartWith", () => {
    context("when the value starts with the passed text", () => {
      it("returns the assertion instance", () => {
        const test = new StringAssertion("Hello World!");

        assert.deepStrictEqual(test.toStartWith("Hello"), test);
        assert.throws(() => test.not.toStartWith("Hello"), {
          message: "Expected <Hello World!> NOT to start with <Hello>",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the value does NOT start with the passed text", () => {
      it("throws an assertion error", () => {
        const test = new StringAssertion("Hello World!");

        assert.throws(() => test.toStartWith("Goodbye"), {
          message: "Expected <Hello World!> to start with <Goodbye>",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toStartWith("Goodbye"), test.not);
      });
    });
  });

  describe(".toEndWith", () => {
    context("when the value ends with the passed text", () => {
      it("returns the assertion instance", () => {
        const test = new StringAssertion("Hello World!");

        assert.deepStrictEqual(test.toEndWith("!"), test);
        assert.throws(() => test.not.toEndWith("!"), {
          message: "Expected <Hello World!> NOT to end with <!>",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the value does NOT end with the passed text", () => {
      it("throws an assertion error", () => {
        const test = new StringAssertion("Hello World!");

        assert.throws(() => test.toEndWith("Moon!"), {
          message: "Expected <Hello World!> to end with <Moon!>",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toStartWith("Moon!"), test.not);
      });
    });
  });

  describe(".toMatchRegex", () => {
    context("when the value matches the regular expression", () => {
      it("returns the assertion instance", () => {
        const test = new StringAssertion("1234567890");

        assert.deepStrictEqual(test.toMatchRegex(/^[0-9]+$/), test);
        assert.throws(() => test.not.toMatchRegex(/^[0-9]+$/), {
          message: "Expected <1234567890> NOT to match the regular expression </^[0-9]+$/>",
          name: ASSERTION_ERROR
        });
      });
    });

    context("when the value does NOT match the regular expression", () => {
      it("throws an assertion error", () => {
        const test = new StringAssertion("1234567890x");

        assert.throws(() => test.toMatchRegex(/^[0-9]+$/), {
          message: "Expected <1234567890x> to match the regular expression </^[0-9]+$/>",
          name: ASSERTION_ERROR
        });
        assert.deepStrictEqual(test.not.toMatchRegex(/^[0-9]+$/), test.not);
      });
    });
  });
});
