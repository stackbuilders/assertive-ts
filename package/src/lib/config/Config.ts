import { Assertion } from "../Assertion";

export interface Plugin<T, A extends Assertion<T>> {
  /**
   * The `Assertion<T>` instance the plugin adds
   */
  Assertion: new(actual: T) => A;
  /**
   * The position were the predicate will test to return the `Assertion` or not:
   * - `top`: Test before all primitives and object-related types.
   * - `bottom`: Test after all primitives and object-related types.
   */
  insertAt: "top" | "bottom";
  /**
   * The predicate that tests if the actual value should returnt and instance of
   * the plugin's `Assertion`.
   */
  predicate: (actual: unknown) => actual is T;
}

/**
 * A configuration class used to share a `config` instance. Useful to expose
 * methods that can change global settings.
 */
export class Config {

  private pluginSet: Set<Plugin<any, Assertion<any>>>;

  public constructor() {
    this.pluginSet = new Set();
  }

  public plugins(): ReadonlyArray<Plugin<any, Assertion<any>>> {
    return Array.from(this.pluginSet.values());
  }

  public addPlugin<T, A extends Assertion<T>>(plugin: Plugin<T, A>): void {
    this.pluginSet.add(plugin);
  }
}

export const config = new Config();
