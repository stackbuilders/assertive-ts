import { usePlugin } from "@assertive-ts/core";
import { SymbolPlugin } from "@examples/symbol-plugin";

export function mochaHooks(): Mocha.RootHookObject {
  return {
    beforeAll() {
      usePlugin(SymbolPlugin);
    },
  };
}
