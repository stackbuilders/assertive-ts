import { Plugin } from "@assertive-ts/core";
import { SinonSpy, SinonSpyCall } from "sinon";

import { SinonSpyAssertion } from "./lib/SinonSpyAssertion";
import { SinonSpyCallAssertion } from "./lib/SinonSpyCallAssertion";

export type { SinonSpyAssertion } from "./lib/SinonSpyAssertion";
export type { SinonSpyCallAssertion } from "./lib/SinonSpyCallAssertion";

declare module "@assertive-ts/core" {

  export interface Expect {
    <A extends unknown[], R>(actual: SinonSpy<A, R>): SinonSpyAssertion<A, R>;
    <A extends unknown[], R>(actual: SinonSpyCall<A, R>): SinonSpyCallAssertion<A, R>;
  }
}

function isSinonSpy<A extends unknown[], R>(actual: unknown): actual is SinonSpy<A, R> {
  return typeof actual === "function"
    && "getCall" in actual
    && typeof actual.getCall === "function";
}

function isSinonSpyCall<A extends unknown[], R>(actual: unknown): actual is SinonSpyCall<A, R> {
  if (typeof actual === "object" && actual !== null) {
    const hasProxy = "proxy" in actual
      && typeof actual.proxy === "object"
      && actual.proxy !== null
      && "isSinonProxy" in actual.proxy
      && actual.proxy.isSinonProxy;

    return hasProxy
      ? isSinonSpyCall(actual.proxy)
      : isSinonSpy(actual);
  }

  return false;
}

function sinonSpyPlugin<A extends unknown[], R>(): Plugin<SinonSpy<A, R>, SinonSpyAssertion<A, R>> {
  return {
    Assertion: SinonSpyAssertion,
    insertAt: "top",
    predicate: isSinonSpy,
  };
}

function sinonSpyCallPlugin<A extends unknown[], R>(): Plugin<SinonSpyCall<A, R>, SinonSpyCallAssertion<A, R>> {
  return {
    Assertion: SinonSpyCallAssertion,
    insertAt: "top",
    predicate: isSinonSpyCall,
  };
}

export const SinonPlugin = [
  sinonSpyPlugin(),
  sinonSpyCallPlugin(),
];
