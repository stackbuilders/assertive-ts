import assert from "assert";

import {
  isAnyFunction,
  isHighInclusiveOptions,
  isInclusiveOptions,
  isJSObject,
  isKeyOf,
  isLowInclusiveOptions,
  isPromise
} from "../../../src/lib/helpers/guards";

describe("[Unit] guards.test.ts", () => {
  describe(".isJSObject", () => {
    context("when the value is an object", () => {
      context("and the value is a JS object", () => {
        it("returns true", () => {
          assert.equal(isJSObject({ x: 1 }), true);
        });
      });

      context("and the value is a function", () => {
        it("returns false", () => {
          assert.equal(isJSObject(() => undefined), false);
        });
      });

      context("and the value is null", () => {
        it("returns false", () => {
          assert.equal(isJSObject(null), false);
        });
      });
    });

    context("when the value in not an object", () => {
      it("returns false", () => {
        assert.equal(isJSObject("foo"), false);
      });
    });
  });

  describe(".isKeyOf", () => {
    const s = Symbol("s");
    const target = {
      x: "foo",
      5: "bar",
      [s]: "baz"
    };

    context("when the value is a key of the target", () => {
      [
        ...Object.keys(target),
        ...Object.getOwnPropertySymbols(target)
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

  describe(".isInclusiveOptions", () => {
    context("when inclusive is included", () => {
      it("returns true", () => {
        assert.equal(isInclusiveOptions({ range: [0, 1], inclusive: true }), true);
      });
    });

    context("when inclusive is not included", () => {
      it("returns false", () => {
        assert.equal(isInclusiveOptions({ range: [0, 1], lowInclusive: true }), false);
      });
    });
  });

  describe(".isHighInclusiveOptions", () => {
    context("when highInclusive is included", () => {
      it("returns true", () => {
        assert.equal(isHighInclusiveOptions({ range: [0, 1], highInclusive: true }), true);
      });
    });

    context("when highInclusive is not included", () => {
      it("returns false", () => {
        assert.equal(isHighInclusiveOptions({ range: [0, 1], lowInclusive: true }), false);
      });
    });
  });

  describe(".isLowInclusiveOptions", () => {
    context("when lowInclusive is included", () => {
      it("returns true", () => {
        assert.equal(isLowInclusiveOptions({ range: [0, 1], lowInclusive: true }), true);
      });
    });

    context("when lowInclusive is not included", () => {
      it("returns false", () => {
        assert.equal(isLowInclusiveOptions({ range: [0, 1], highInclusive: true }), false);
      });
    });
  });
});
