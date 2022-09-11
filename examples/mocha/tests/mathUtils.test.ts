import { assert, expect } from "@stackbuilders/assertive-ts";
import { sum } from "../src/mathUtils";

describe("sum", () => {
    it("adds two numbers with expect", () => {
        expect(sum(1, 2)).toBeEqual(3);
    });

    it("adds two numbers with assert", () => {
        assert(sum(1, 2)).toBeEqual(3);
    });
});
