import { expect } from "@assertive-ts/core";

describe("plugins", () => {
  it("can use the symbol plugin", () => {
    const foo = Symbol("foo");

    expect(foo)
      .toBeSymbol()
      .toHaveDescription("foo");
  });
});
