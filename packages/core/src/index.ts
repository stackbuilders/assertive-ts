import { Assertion } from "./lib/Assertion";
import { config, Plugin } from "./lib/config/Config";
import { expect, Expect } from "./lib/expect";

export { AssertionError } from "assert/strict";
export {
  AssertionFactory,
  StaticTypeFactories,
  TypeFactory,
  TypeFactories,
} from "./lib/helpers/TypeFactories";

export {
  Assertion,
  Expect,
  Plugin,
  expect,
  expect as assert,
  expect as assertThat,
};

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
