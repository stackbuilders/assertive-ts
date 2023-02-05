import { Plugin } from "@stackbuilders/assertive-ts";

import { SymbolAssertion } from "./lib/SymbolAssertion";

declare module "@stackbuilders/assertive-ts" {

  export interface Expect {
    // tslint:disable-next-line: callable-types
    (actual: symbol): SymbolAssertion;
  }
}

export const SymbolPlugin: Plugin<symbol, SymbolAssertion> = {
  Assertion: SymbolAssertion,
  insertAt: "top",
  predicate: (actual): actual is symbol => typeof actual === "symbol"
};
