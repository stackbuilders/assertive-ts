import { SymbolPlugin } from "@examples/symbol-plugin";
import { usePlugin } from "@stackbuilders/assertive-ts";

beforeAll(() => {
  usePlugin(SymbolPlugin);
});
