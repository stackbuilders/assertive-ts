import assert from "assert";

import {
  isHighInclusiveOptions,
  isInclusiveOptions,
  isLowInclusiveOptions,
  isPromise
} from "../../../src/lib/helpers/guards";

describe("[Unit] guards.test.ts", () => {
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
