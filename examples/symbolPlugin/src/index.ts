import { Plugin } from "@assertive-ts/core";

import { SymbolAssertion } from "./lib/SymbolAssertion";

declare module "@assertive-ts/core" {

  export interface Expect {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    (actual: symbol): SymbolAssertion;
  }
}

export const SymbolPlugin: Plugin<symbol, SymbolAssertion> = {
  Assertion: SymbolAssertion,
  insertAt: "top",
  predicate: (actual): actual is symbol => typeof actual === "symbol",
};
