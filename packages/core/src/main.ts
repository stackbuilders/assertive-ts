import { Assertion } from "./lib/Assertion";
import { type Plugin, config } from "./lib/config/Config";
import { type Expect, expect } from "./lib/expect";

export { AssertionError } from "assert/strict";
export type { AssertionFactory, StaticTypeFactories, TypeFactory } from "./lib/helpers/TypeFactories";
export { TypeFactories } from "./lib/helpers/TypeFactories";

export type { Expect, Plugin };
export { Assertion, expect, expect as assert, expect as assertThat };

/**
 * Extends `@assertive-ts/core` with local or 3rd-party plugin(s).
 *
 * @param plugins a plugin or an array of plugins to use
 * @see {@link Plugin Plugin}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePlugin<P extends Plugin<any, Assertion<any>>>(plugins: P | P[]): void {
  Array.isArray(plugins)
    ? plugins.forEach(plugin => config.addPlugin(plugin))
    : config.addPlugin(plugins);
}
