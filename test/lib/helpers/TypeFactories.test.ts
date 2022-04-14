import assert from "assert";

import { TypeFactories } from "../../../src/lib/helpers/TypeFactories";

describe("[Unit] TypeFactories.test.ts", () => {
  describe(".predicate", () => {
    describe("#Boolean", () => {
      context("when the value is a boolean", () => {
        [true, false].forEach(bool => {
          it(`[${bool}] returns true`, () => {
            const result = TypeFactories.Boolean.predicate(bool);

            assert.equal(result, true);
          });
        });
      });

      context("when the value is not a boolean", () => {
        it("returns false", () => {
          const result = TypeFactories.Boolean.predicate(0);

          assert.equal(result, false);
        });
      });
    });

    describe("#Date", () => {
      context("when the value is a Date", () => {
        it("returns true", () => {
          const result = TypeFactories.Date.predicate(new Date());

          assert.equal(result, true);
        });
      });

      context("when the value is not a Date", () => {
        it("returns false", () => {
          const result = TypeFactories.Date.predicate("foo");

          assert.equal(result, false);
        });
      });
    });

    describe("#Function", () => {
      context("when the value is a function", () => {
        it("returns true", () => {
          const result = TypeFactories.Function.predicate(() => undefined);

          assert.equal(result, true);
        });
      });

      context("when the value is not a function", () => {
        it("returns false", () => {
          const result = TypeFactories.Function.predicate({ });

          assert.equal(result, false);
        });
      });
    });

    describe("#Number", () => {
      context("when the value is a number", () => {
        [1, -1, NaN, Infinity, -Infinity].forEach(num => {
          it(`[${num}] returns true`, () => {
            const result = TypeFactories.Number.predicate(num);

            assert.equal(result, true);
          });
        });
      });

      context("when the value is not a number", () => {
        it("returns false", () => {
          const result = TypeFactories.Number.predicate("foo");

          assert.equal(result, false);
        });
      });
    });

    describe("#String", () => {
      context("when the value is a string", () => {
        it("returns true", () => {
          const result = TypeFactories.String.predicate("foo");

          assert.equal(result, true);
        });
      });

      context("when the value is not a string", () => {
        it("returns false", () => {
          const result = TypeFactories.String.predicate(1);

          assert.equal(result, false);
        });
      });
    });

    describe(".instanceOf", () => {
      context("when the value is an instance of the passed type", () => {
        it("returns true", () => {
          const result = TypeFactories.instanceOf(Error).predicate(Error("foo"));

          assert.equal(result, true);
        });
      });

      context("when the value is not an instance of the passed type", () => {
        it("returns false", () => {
          const result = TypeFactories.instanceOf(Error).predicate("foo");

          assert.equal(result, false);
        });
      });
    });

    describe(".object", () => {
      context("when the value is a JS object", () => {
        it("returns true", () => {
          const result = TypeFactories.object().predicate({ x: "foo" });

          assert.equal(result, true);
        });
      });

      context("when the value is not a JS object", () => {
        it("returns false", () => {
          const result = TypeFactories.object().predicate(() => undefined);

          assert.equal(result, false);
        });
      });
    });
  });
});
