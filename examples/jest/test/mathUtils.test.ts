import { expect as jestExpect } from "@jest/globals";
import { assert, expect } from "@stackbuilders/assertive-ts";

import { sum } from "../src/mathUtils";

describe("sum", () => {
  it("adds two numbers with assertive-ts' expect", () => {
    expect(sum(1, 2)).toBeEqual(3);
  });

  it("adds two numbers with assertive-ts' assert", () => {
    assert(sum(1, 2)).toBeEqual(3);
  });

  it("adds two numbers with jest's expect", () => {
    jestExpect(sum(1, 2)).toEqual(3);
  });
});
