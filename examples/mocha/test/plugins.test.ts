import { expect } from "@stackbuilders/assertive-ts";

describe("plugins", () => {
  it("can use the symbol plugin", () => {
    const foo = Symbol("foo");

    expect(foo)
      .toBeSymbol()
      .toHaveDescription("foo");
  });
});
