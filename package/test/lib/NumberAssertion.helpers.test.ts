import {
  isHighInclusiveOptions,
  isInclusiveOptions,
  isLowInclusiveOptions,
} from "../../src/lib/NumberAssertion.helpers";

import assert from "assert";

describe("[Unit] NumberAssertion.helpers.test.ts", () => {
  describe(".isInclusiveOptions", () => {
    context("when inclusive is included", () => {
      it("returns true", () => {
        assert.equal(isInclusiveOptions({ inclusive: true, range: [0, 1] }), true);
      });
    });

    context("when inclusive is not included", () => {
      it("returns false", () => {
        assert.equal(isInclusiveOptions({ lowInclusive: true, range: [0, 1] }), false);
      });
    });
  });

  describe(".isHighInclusiveOptions", () => {
    context("when highInclusive is included", () => {
      it("returns true", () => {
        assert.equal(isHighInclusiveOptions({ highInclusive: true, range: [0, 1] }), true);
      });
    });

    context("when highInclusive is not included", () => {
      it("returns false", () => {
        assert.equal(isHighInclusiveOptions({ lowInclusive: true, range: [0, 1] }), false);
      });
    });
  });

  describe(".isLowInclusiveOptions", () => {
    context("when lowInclusive is included", () => {
      it("returns true", () => {
        assert.equal(isLowInclusiveOptions({ lowInclusive: true, range: [0, 1] }), true);
      });
    });

    context("when lowInclusive is not included", () => {
      it("returns false", () => {
        assert.equal(isLowInclusiveOptions({ highInclusive: true, range: [0, 1] }), false);
      });
    });
  });
});
