import assert from "assert";

import { isPromise } from "../../../src/lib/helpers/guards";

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
});
