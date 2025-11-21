import assert from "assert";

import { prettify } from "../../../src/lib/helpers/messages";

describe("[Unit] messages.test.ts", () => {
  describe(".prettify", () => {
    context("when the value is an object", () => {
      context("and the value is null", () => {
        it("returns a null string representation", () => {
          const result = prettify(null);

          assert.deepStrictEqual(result, "null");
        });
      });

      context("and the value has a specific string representation", () => {
        it("returns its string representation", () => {
          const result = prettify(Error("Something went wrong..."));

          assert.deepStrictEqual(result, "Error: Something went wrong...");
        });
      });

      context("and the value does not have a specific string representation", () => {
        it("returns a JSON stringified representation", () => {
          const result = prettify([1, { x: "foo", y: true }, undefined]);

          assert.deepStrictEqual(result, '[1,{"x":"foo","y":true},undefined]');
        });
      });
    });

    context("when the value is a function", () => {
      it("returns its string representation", () => {
        const result = prettify(() => 3);

        assert.deepStrictEqual(result, "() => 3");
      });
    });

    context("when the value is nor an object or a function", () => {
      const variants = [
        [null, "null"],
        [undefined, "undefined"],
        [NaN, "NaN"],
        [false, "false"],
        [true, "true"],
        [1593, "1593"],
        ["foo", '"foo"'],
        [Symbol("bar"), "Symbol(bar)"],
        [BigInt(1300), "1300"],
      ] as const;

      variants.forEach(([value, text]) => {
        it(`[value: ${text}] returns a JSON stringified representation`, () => {
          const result = prettify(value);

          assert.deepStrictEqual(result, text);
        });
      });
    });
  });
});
