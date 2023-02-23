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
 * Extends `@stackbuilders/assertive-ts` with a local or 3rd-party plugin.
 *
 * @param plugin the plugin to use to extend assertive-ts
 * @see {@link Plugin Plugin}
 */
export function usePlugin<T, A extends Assertion<T>>(plugin: Plugin<T, A>): void {
  config.addPlugin(plugin);
}
