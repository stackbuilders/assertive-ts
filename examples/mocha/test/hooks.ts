import { usePlugin } from "@assertive-ts/core";
import { SymbolPlugin } from "@examples/symbol-plugin";
import { RootHookObject } from "mocha";

export function mochaHooks(): RootHookObject {
  return {
    beforeAll() {
      usePlugin(SymbolPlugin);
    },
  };
}
