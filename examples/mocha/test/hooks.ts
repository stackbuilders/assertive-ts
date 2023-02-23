import { SymbolPlugin } from "@examples/symbol-plugin";
import { usePlugin } from "@stackbuilders/assertive-ts";
import { RootHookObject } from "mocha";

export function mochaHooks(): RootHookObject {
  return {
    beforeAll() {
      usePlugin(SymbolPlugin);
    },
  };
}
