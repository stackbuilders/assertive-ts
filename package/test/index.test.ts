import assert from "assert";

import { assert as libAssert, assertThat, expect, TypeFactories } from "../src";

describe("[Unit] index.test.ts", () => {
  context("expect", () => {
    it("is exposed to the API", () => {
      assert.ok(expect);
    });
  });

  context("assert", () => {
    it("is an alias of expect", () => {
      assert.deepStrictEqual(libAssert, expect);
    });
  });

  context("assertThat", () => {
    it("is an alias of expect", () => {
      assert.deepStrictEqual(assertThat, expect);
    });
  });

  context("TypeFactories", () => {
    it("is exposed to the API", () => {
      assert.ok(TypeFactories);
    });
  });
});
