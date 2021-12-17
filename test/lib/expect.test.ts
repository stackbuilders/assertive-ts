import assert from "assert";

import expect from "../../src";
import { Assertion } from "../../src/lib/Assertion";
import { BooleanAssertion } from "../../src/lib/BooleanAssertion";
import { DateAssertion } from "../../src/lib/DateAssertion";
import { PromiseAssertion } from "../../src/lib/PromiseAssertion";
import { StringAssertion } from "../../src/lib/StringAssertion";

describe("[Unit] expect.test.ts", () => {
  context("when the actual value is a promise", () => {
    it("returns a PromiseAssertion instance", () => {
      const test = expect(Promise.resolve("foo"));

      assert(test instanceof PromiseAssertion);
    });
  });

  context("when the actual value is a boolean", () => {
    it("returns a BooleanAssertion instance", () => {
      const test = expect(true);

      assert(test instanceof BooleanAssertion);
    });
  });

  context("when the actual value is a String", () => {
    it("returns a StringAssertion instance", () => {
      const test = expect("Hello World!");

      assert(test instanceof StringAssertion);
    });
  });

  context("when the actual value is a Date", () => {
    it("returns a DateAssertion instance ", () => {
      const test = expect(new Date());

      assert(test instanceof DateAssertion);
    });
  });

  context("when actual value is none of the specific implementations", () => {
    it("returns am Assertion instance", () => {
      const test = expect({ name: "foo" });

      assert(test instanceof Assertion);
    });
  });
});
