import { usePlugin } from "@assertive-ts/core";
import { SymbolPlugin } from "@examples/symbol-plugin";

beforeAll(() => {
  usePlugin(SymbolPlugin);
});
