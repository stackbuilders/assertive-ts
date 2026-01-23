import assert from "assert";

import {
  isAnyFunction,
  isKeyOf,
  isPromise,
  isStruct,
} from "../../../src/lib/helpers/guards";

describe("[Unit] guards.test.ts", () => {
  describe(".isStruct", () => {
    context("when the value is an object", () => {
      const variants = [
        [() => undefined, false],
        [[{ x: 1 }], false],
        [{ x: 1 }, true],
        ["foo", false],
        [null, false],
        [{ }, true],
      ] as const;

      variants.forEach(([value, expected]) => {
        context(`and the value is ${JSON.stringify(value)}`, () => {
          it(`returns ${expected}`, () => {
            assert.equal(isStruct(value), expected);
          });
        });
      });
    });

    context("when the value in not an object", () => {
      it("returns false", () => {
        assert.equal(isStruct("foo"), false);
      });
    });
  });

  describe(".isKeyOf", () => {
    const s = Symbol("s");
    const target = {
      5: "bar",
      [s]: "baz",
      x: "foo",
    };

    context("when the value is a key of the target", () => {
      [
        ...Object.keys(target),
        ...Object.getOwnPropertySymbols(target),
      ]
        .forEach(key => {
          it(`[${key.toString()}] return true`, () => {
            const isKey = isKeyOf(target, key);

            assert.equal(isKey, true);
          });
        });
    });

    context("when the value is not a key of the target", () => {
      it("returns false", () => {
        assert.equal(isKeyOf(target, "y"), false);
        assert.equal(isKeyOf(target, { x: "foo" }), false);
      });
    });
  });

  describe(".isPromise", () => {
    context("when the value is a promise", () => {
      it("returns true", () => {
        assert.equal(isPromise(Promise.resolve("foo")), true);
      });
    });

    context("when the value is not a promise", () => {
      it("returns false", () => {
        assert.equal(isPromise({ then: "foo" }), false);
      });
    });
  });

  describe(".isAnyFunction", () => {
    context("when the value is a function", () => {
      it("returns true", () => {
        assert.equal(isAnyFunction(() => undefined), true);
      });
    });

    context("when the value is not a function", () => {
      it("returns false", () => {
        assert.equal(isAnyFunction({ }), false);
      });
    });
  });
});
