import assert from "assert";

import { expect } from "../../src";
import { ArrayAssertion } from "../../src/lib/ArrayAssertion";
import { Assertion } from "../../src/lib/Assertion";
import { BooleanAssertion } from "../../src/lib/BooleanAssertion";
import { DateAssertion } from "../../src/lib/DateAssertion";
import { ErrorAssertion } from "../../src/lib/ErrorAssertion";
import { FunctionAssertion } from "../../src/lib/FunctionAssertion";
import { NumberAssertion } from "../../src/lib/NumberAssertion";
import { ObjectAssertion } from "../../src/lib/ObjectAssertion";
import { PromiseAssertion } from "../../src/lib/PromiseAssertion";
import { StringAssertion } from "../../src/lib/StringAssertion";

class CustomError extends Error {

  public constructor(message?: string) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

describe("[Unit] expect.test.ts", () => {
  context("when the actual value is a boolean", () => {
    it("returns a BooleanAssertion instance", () => {
      const test = expect(true);

      assert(test instanceof BooleanAssertion);
    });
  });

  context("when the actual value is a number", () => {
    it("returns a NumberAssertion instance", () => {
      const test = expect(1);

      assert(test instanceof NumberAssertion);
    });
  });

  context("when the actual value is a string", () => {
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

  context("when the actual value is an array", () => {
    it("returns an ArrayAssertion instance", () => {
      const test = expect([1, 2, 3]);

      assert(test instanceof ArrayAssertion);
    });
  });

  context("when the actual value is a promise", () => {
    it("returns a PromiseAssertion instance", () => {
      const test = expect(Promise.resolve("foo"));

      assert(test instanceof PromiseAssertion);
    });
  });

  context("when the actual value is a function", () => {
    it("returns a FunctionAssertion instance", () => {
      const test = expect(() => 0);

      assert(test instanceof FunctionAssertion);
    });
  });

  context("when the actual value is an error", () => {
    [
      new Error("classic"),
      new CustomError("custom")
    ]
    .forEach(error => {
      it(`[${error.name}] returns an ErrorAssertion`, () => {
        const test = expect(error);

        assert(test instanceof ErrorAssertion);
      });
    });
  });

  context("when the actual value is an Object", () => {
    it("returns an ObjectAssertion instance", () => {
      const test = expect({ foo: "some value", bar: "other value" });

      assert(test instanceof ObjectAssertion);
    });
  });

  context("when the actual value type is null", () => {
    it("returns an Assertion instance", () => {
      const test = expect(null);

      assert(test instanceof Assertion);
    });
  });

  context("when actual value is none of the specific implementations", () => {
    it("returns am Assertion instance", () => {
      const test = expect({ name: "foo" });

      assert(test instanceof Assertion);
    });
  });
});
