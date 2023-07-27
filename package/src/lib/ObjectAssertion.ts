import isDeepEqual from "fast-deep-equal/es6";

import { Assertion } from "./Assertion";
import { prettify } from "./helpers/messages";
import { Entry, Struct } from "./helpers/types";

import { AssertionError } from "assert";

/**
 * Encapsulates assertion methods applicable to objects.
 *
 * @param T the object's definition type
 */
export class ObjectAssertion<T extends Struct> extends Assertion<T> {

  public constructor(actual: T) {
    super(actual);
  }

  private hasOwnProp(prop: PropertyKey | undefined): boolean {
    return prop !== undefined
      ? Object.prototype.hasOwnProperty.call(this.actual, prop)
      : false;
  }

  /**
   * Check if the object is empty. That is, when the object doesn't have any
   * properties.
   *
   * @example
   * ```
   * expect({}).toBeEmpty();
   * ```
   *
   * @returns the assertion instance
   */
  public toBeEmpty(): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: { },
      message: "Expected the value to be an empty object",
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be an empty object",
    });

    return this.execute({
      assertWhen: Object.keys(this.actual).length === 0,
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains the provided key.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2 }).toContainKey("a");
   * ```
   *
   * @param key the key that the object should contain
   * @returns the assertion instance
   */
  public toContainKey(key: keyof T): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain the provided key <${String(key)}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain the provided key <${String(key)}>`,
    });

    return this.execute({
      assertWhen: this.hasOwnProp(key),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains the all provided keys.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 }).toContainAllKeys("a", "b");
   * ```
   *
   * @param keys the keys that the object should contain
   * @returns the assertion instance
   */
  public toContainAllKeys(...keys: Array<keyof T>): this {
    const error = new AssertionError({
      actual: Object.keys(this.actual),
      expected: keys,
      message: `Expected the object to contain all the provided keys <${prettify(keys)}>`,
    });
    const invertedError = new AssertionError({
      actual: Object.keys(this.actual),
      message: `Expected the object NOT to contain all the provided keys <${prettify(keys)}>`,
    });

    return this.execute({
      assertWhen: keys.every(key => this.hasOwnProp(key)),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains at least one of the provided keys.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 }).toContainAnyKeys("a", "b");
   * ```
   *
   * @param keys the keys that the object may contain
   * @returns the assertion instance
   */
  public toContainAnyKeys(...keys: Array<keyof T>): this {
    const error = new AssertionError({
      actual: Object.keys(this.actual),
      expected: keys,
      message: `Expected the object to contain at least one of the provided keys <${prettify(keys)}>`,
    });
    const invertedError = new AssertionError({
      actual: Object.keys(this.actual),
      message: `Expected the object NOT to contain any of the provided keys <${prettify(keys)}>`,
    });

    return this.execute({
      assertWhen: keys.some(key => this.hasOwnProp(key)),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object has exactly the provided keys.
   *
   * @example
   * ```
   * expect({ x: 1, y: 2, z: 3 }).toHaveKeys("x", "y", "z");
   * ```
   *
   * @param keys the keys the object should have
   * @returns the assertion instance
   */
  public toHaveKeys(...keys: Array<keyof T>): this {
    const sortedActual = Object.keys(this.actual).sort();
    const sortedKeys = [...keys].sort();

    const error = new AssertionError({
      actual: sortedActual,
      expected: sortedKeys,
      message: `Expected the object to have exactly the keys <${prettify(sortedKeys)}>`,
    });
    const invertedError = new AssertionError({
      actual: sortedActual,
      message: `Expected the object NOT to have the keys <${prettify(sortedKeys)}>`,
    });

    return this.execute({
      assertWhen: isDeepEqual(sortedActual, sortedKeys),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains the provided value.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 }).toContainValue(2);
   * ```
   *
   * @param value the property value that the object should contain in any of
   *              its keys
   * @returns the assertion instance
   */
  public toContainValue(value: T[keyof T]): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain the provided value <${prettify(value)}>`,
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain the provided value <${prettify(value)}>`,
    });

    return this.execute({
      assertWhen: Object.values(this.actual).some(actualValue => isDeepEqual(actualValue, value)),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains all the provided values.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 }).toContainAllValues(1, 2);
   * ```
   *
   * @param values the property values that the object should contain
   * @returns the assertion instance
   */
  public toContainAllValues(...values: Array<T[keyof T]>): this {
    const error = new AssertionError({
      actual: Object.values(this.actual),
      expected: values,
      message: `Expected the object to contain all the provided values <${prettify(values)}>`,
    });
    const invertedError = new AssertionError({
      actual: Object.values(this.actual),
      message: `Expected the object NOT to contain all the provided values <${prettify(values)}>`,
    });

    return this.execute({
      assertWhen: values
        .every(value =>
          Object.values(this.actual).some(actualValue => isDeepEqual(actualValue, value)),
        ),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains at least one of the provided values.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 }).toContainAnyValues(1, 5, 7);
   * ```
   *
   * @param values the property values that the object should contain
   * @returns the assertion instance
   */
  public toContainAnyValues(...values: Array<T[keyof T]>): this {
    const error = new AssertionError({
      actual: Object.values(this.actual),
      expected: values,
      message: `Expected the object to contain at least one of the provided values <${prettify(values)}>`,
    });
    const invertedError = new AssertionError({
      actual: Object.values(this.actual),
      message: `Expected the object NOT to contain any of the provided values <${prettify(values)}>`,
    });

    return this.execute({
      assertWhen: values
        .some(value =>
          Object.values(this.actual).some(actualValue => isDeepEqual(actualValue, value)),
        ),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object has exactly the provided values.
   *
   * @example
   * ```
   * expect({ x: 1, y: "a", z: true }).toHaveValues(1, "a", true);
   * ```
   *
   * @param values the values the object should have
   * @returns the assertion instance
   */
  public toHaveValues(...values: Array<T[keyof T]>): this {
    const sortedActual = Object.values(this.actual).sort();
    const sorterdValues = [...values].sort();

    const error = new AssertionError({
      actual: sortedActual,
      expected: sorterdValues,
      message: `Expected the object to have exactly the values <${prettify(sorterdValues)}>`,
    });
    const invertedError = new AssertionError({
      actual: sortedActual,
      message: `Expected the object NOT to have the values <${prettify(sorterdValues)}>`,
    });

    return this.execute({
      assertWhen: isDeepEqual(sortedActual, sorterdValues),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains the provided entry.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 }).toContainEntry(["a", 1]);
   * ```
   *
   * @param entry the entry that the object should contain
   * @returns the assertion instance
   */
  public toContainEntry(entry: Entry<T>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain the provided entry <${prettify(entry)}>`,
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain the provided entry <${prettify(entry)}>`,
    });
    return this.execute({
      assertWhen:
        this.hasOwnProp(entry[0]) &&
        isDeepEqual(Object.getOwnPropertyDescriptor(this.actual, entry[0])?.value, entry[1]),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains all the provided entries.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 }).toContainAllEntries(["a", 1], ["b", 2]);
   * ```
   *
   * @param entries the entries that the object should contain
   * @returns the assertion instance
   */
  public toContainAllEntries(...entries: Entry<T>[]): this {
    const error = new AssertionError({
      actual: Object.entries(this.actual),
      expected: entries,
      message: `Expected the object to contain all the provided entries <${prettify(entries)}>`,
    });

    const invertedError = new AssertionError({
      actual: Object.entries(this.actual),
      message: `Expected the object NOT to contain all the provided entries <${prettify(entries)}>`,
    });
    return this.execute({
      assertWhen: entries
        .every(entry =>
          this.hasOwnProp(entry[0]) &&
          isDeepEqual(Object.getOwnPropertyDescriptor(this.actual, entry[0])?.value, entry[1]),
        ),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object contains at least one of the provided entries.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 })
   *   .toContainAnyEntries(["a", 1], ["b", 9], ["c", 20]);
   * ```
   *
   * @param entries the entries that the object should contain
   * @returns the assertion instance
   */
  public toContainAnyEntries(...entries: Entry<T>[]): this {
    const error = new AssertionError({
      actual: Object.entries(this.actual),
      expected: entries,
      message: `Expected the object to contain at least one of the provided entries <${prettify(entries)}>`,
    });

    const invertedError = new AssertionError({
      actual: Object.entries(this.actual),
      message: `Expected the object NOT to contain any of the provided entries <${prettify(entries)}>`,
    });
    return this.execute({
      assertWhen: entries
        .some(entry =>
          this.hasOwnProp(entry[0]) &&
          isDeepEqual(Object.getOwnPropertyDescriptor(this.actual, entry[0])?.value, entry[1]),
        ),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object has exctly the provided entries.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 })
   *   .toHaveEntries(["a", 1], ["b", 2], ["c", 3]);
   * ```
   *
   * @param entries the entries the object should have
   * @returns the assertion instance
   */
  public toHaveEntries(...entries: Entry<T>[]): this {
    const sortedActual = Object.entries(this.actual).sort();
    const sortedEntries = [...entries].sort();
    const prettyEntries = sortedEntries.map(entry => `[${prettify(entry)}]`).join(",");
    const error = new AssertionError({
      actual: sortedActual,
      expected: sortedEntries,
      message: `Expected the object to have exactly the entries <${prettyEntries}>`,
    });
    const invertedError = new AssertionError({
      actual: Object.entries(this.actual),
      message: `Expected the object NOT to have the entries <${prettyEntries}>`,
    });

    return this.execute({
      assertWhen: isDeepEqual(sortedActual, sortedEntries),
      error,
      invertedError,
    });
  }

  /**
   * Check if the object match the provided object.
   *
   * @example
   * ```
   * expect({ a: 1, b: 2, c: 3 }).toPartiallyMatch({ b: 2, c: 3 });
   * ```
   *
   * @param other the object that the object should match
   * @returns the assertion instance
   */
  public toPartiallyMatch(other: Partial<T>): this {
    const error = new AssertionError({
      actual: this.actual,
      expected: other,
      message: "Expected the object to be a partial match",
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the object NOT to be a partial match",
    });
    return this.execute({
      assertWhen: Object.keys(other)
        .every(key =>
          this.hasOwnProp(key)
            ? isDeepEqual(Object.getOwnPropertyDescriptor(this.actual, key)?.value, other[key])
            : false,
        ),
      error,
      invertedError,
    });
  }
}
