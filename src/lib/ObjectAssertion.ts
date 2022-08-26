import { AssertionError } from "assert";
import { isDeepStrictEqual } from "util";

import { Assertion } from "./Assertion";

export type JSObject = Record<keyof any, any>;

export type Entry<T, K = keyof T> = K extends keyof T
  ? [K, T[K]]
  : never;

/**
 * Encapsulates assertion methods applicable to objects.
 *
 * @param T the object's definition type
 */
export class ObjectAssertion<T extends JSObject> extends Assertion<T> {

  constructor(actual: T) {
    super(actual);
  }

  /**
   * Check if the object is empty. That is, when the object doesn't have any properties.
   *
   * @returns the assertion instance
   */
  public toBeEmpty(): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected the value to be an empty object"
    });
    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the value NOT to be an empty object"
    });

    return this.execute({
      assertWhen: Object.keys(this.actual).length === 0,
      error,
      invertedError
    });
  }

  /**
   * Check if the object contains the provided key.
   *
   * @param key the key that the object should contain
   * @returns the assertion instance
   */
  public toContainKey(key: keyof T): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain the provided key <${String(key)}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain the provided key <${String(key)}>`
    });
    return this.execute({
      assertWhen: this.actual.hasOwnProperty(key),
      error,
      invertedError
    });
  }

  /**
   * Check if the object contains the all provided keys.
   *
   * @param keys the keys that the object should contain
   * @returns the assertion instance
   */
  public toContainAllKeys(keys: Array<keyof T>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain all the provided keys <${keys}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain all the provided keys <${keys}>`
    });
    return this.execute({
      assertWhen: keys.every(key => this.actual.hasOwnProperty(key)),
      error,
      invertedError
    });
  }

  /**
   * Check if the object contains at least one of the provided keys.
   *
   * @param keys the keys that the object may contain
   * @returns the assertion instance
   */
  public toContainAnyKeys(keys: Array<keyof T>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain at least one of the provided keys <${keys}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain any of the provided keys <${keys}>`
    });
    return this.execute({
      assertWhen: keys.some(key => this.actual.hasOwnProperty(key)),
      error,
      invertedError
    });
  }

  /**
   * Check if the object contains the provided value.
   *
   * @param value the property value that the object should contain in any of its keys
   * @returns the assertion instance
   */
  public toContainValue(value: T[keyof T]): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain the provided value <${value}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain the provided value <${value}>`
    });
    return this.execute({
      assertWhen: Object.values(this.actual).some(actualValue => isDeepStrictEqual(actualValue, value)),
      error,
      invertedError
    });
  }

  /**
   * Check if the object contains all the provided values.
   *
   * @param values the property values that the object should contain
   * @returns the assertion instance
   */
  public toContainAllValues(values: Array<T[keyof T]>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain all the provided values <${values}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain all the provided values <${values}>`
    });
    return this.execute({
      assertWhen: values
        .every(value =>
          Object.values(this.actual).some(actualValue => isDeepStrictEqual(actualValue, value))
        ),
      error,
      invertedError
    });
  }

  /**
   * Check if the object contains at least one of the provided values.
   *
   * @param values the property values that the object should contain
   * @returns the assertion instance
   */
  public toContainAnyValues(values: Array<T[keyof T]>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain at least one of the provided values <${values}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain any of the provided values <${values}>`
    });
    return this.execute({
      assertWhen: values
        .some(value =>
          Object.values(this.actual).some(actualValue => isDeepStrictEqual(actualValue, value))
        ),
      error,
      invertedError
    });
  }

  /**
   * Check if the object contains the provided entry.
   *
   * @param entry the entry that the object should contain
   * @returns the assertion instance
   */
  public toContainEntry(entry: Entry<T>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain the provided entry <${JSON.stringify(entry)}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain the provided entry <${JSON.stringify(entry)}>`
    });
    return this.execute({
      assertWhen:
        this.actual.hasOwnProperty(entry[0]) &&
        isDeepStrictEqual(Object.getOwnPropertyDescriptor(this.actual, entry[0])?.value, entry[1]),
      error,
      invertedError
    });
  }

  /**
   * Check if the object contains all the provided entries.
   *
   * @param entries the entries that the object should contain
   * @returns the assertion instance
   */
  public toContainAllEntries(...entries: Array<Entry<T>>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain all the provided entries <${JSON.stringify(entries)}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain all the provided entries <${JSON.stringify(entries)}>`
    });
    return this.execute({
      assertWhen: entries
        .every(entry =>
          this.actual.hasOwnProperty(entry[0]) &&
          isDeepStrictEqual(Object.getOwnPropertyDescriptor(this.actual, entry[0])?.value, entry[1])
        ),
      error,
      invertedError
    });
  }

  /**
   * Check if the object contains at least one of the provided entries.
   *
   * @param entries the entries that the object should contain
   * @returns the assertion instance
   */
  public toContainAnyEntries(...entries: Array<Entry<T>>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain at least one of the provided entries <${JSON.stringify(entries)}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain any of the provided entries <${JSON.stringify(entries)}>`
    });
    return this.execute({
      assertWhen: entries
        .some(entry =>
          this.actual.hasOwnProperty(entry[0]) &&
          isDeepStrictEqual(Object.getOwnPropertyDescriptor(this.actual, entry[0])?.value, entry[1])
        ),
      error,
      invertedError
    });
  }

  /**
   * Check if the object match the provided object.
   *
   * @param other the object that the object should match
   * @returns the assertion instance
   */
  public toPartiallyMatch(other: Partial<T>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: "Expected the object to be a partial match"
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: "Expected the object NOT to be a partial match"
    });
    return this.execute({
      assertWhen: Object.keys(other)
        .every(key =>
          this.actual.hasOwnProperty(key)
            ? isDeepStrictEqual(Object.getOwnPropertyDescriptor(this.actual, key)?.value, other[key])
            : false
        ),
      error,
      invertedError
    });
  }
}
