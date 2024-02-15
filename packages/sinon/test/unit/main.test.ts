import { expect } from "@assertive-ts/core";

import { SinonSpyAssertion } from "../../src/lib/SinonSpyAssertion";
import { SinonSpyCallAssertion } from "../../src/lib/SinonSpyCallAssertion";
import { SinonPlugin } from "../../src/main";

describe("[Unit] main.test.ts", () => {
  describe("SinonPlugin", () => {
    it("contains both SinonSpy and SinonSpyCall plugins", () => {
      expect(SinonPlugin).toHaveSize(2);
      expect(SinonPlugin[0]?.Assertion).toBe(SinonSpyAssertion);
      expect(SinonPlugin[1]?.Assertion).toBe(SinonSpyCallAssertion);
    });
  });
});
