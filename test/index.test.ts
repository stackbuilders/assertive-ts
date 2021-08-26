import assert from "assert";

import expect, { assertThat } from "../src";

describe("[Unit] index.test.ts", () => {
  context("expect", () => {
    it("is exposed to the API", () => {
      assert.ok(expect);
    });
  });

  context("assertThat", () => {
    it("is an alias of expect", () => {
      assert.deepStrictEqual(assertThat, expect);
    });
  });
});
