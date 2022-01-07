import { AssertionError } from "assert";

import { Assertion } from "./Assertion";
import { KeyOf, ValueOf } from "./ObjectAssertion.types";

export class ObjectAssertion<T extends object> extends Assertion<T> {
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
  public toContainKey(key: KeyOf<T>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain the provided key <${key}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain the provided key <${key}>`
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
  public toContainAllKeys(keys: KeyOf<T>[]): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain all the provided keys <${keys}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain all the provided keys <${keys}>`
    });
    return this.execute({
      assertWhen: keys
        .map(key => this.actual.hasOwnProperty(key))
        .every(Boolean),
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
  public toContainAnyKeys(keys: KeyOf<T>[]): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain at least one of the provided keys <${keys}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain any of the provided keys <${keys}>`
    });
    return this.execute({
      assertWhen: keys
        .map(key => this.actual.hasOwnProperty(key))
        .some(Boolean),
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
  public toContainValue(value: ValueOf<T>): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain the provided value <${value}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain the provided value <${value}>`
    });
    return this.execute({
      assertWhen: Object.values(this.actual).includes(value),
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
  public toContainAllValues(values: ValueOf<T>[]): this {
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
        .map(value => Object.values(this.actual).includes(value))
        .every(Boolean),
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
  public toContainAnyValues(values: ValueOf<T>[]): this {
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
        .map(value => Object.values(this.actual).includes(value))
        .some(Boolean),
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
  public toContainEntry(entry: [KeyOf<T>, ValueOf<T>]): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain the provided entry <${JSON.stringify(
        entry
      )}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain the provided entry <${JSON.stringify(
        entry
      )}>`
    });
    return this.execute({
      assertWhen:
        this.actual.hasOwnProperty(entry[0]) &&
        Object.getOwnPropertyDescriptor(this.actual, entry[0])?.value ===
          entry[1],
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
  public toContainAllEntries(entries: [KeyOf<T>, ValueOf<T>][]): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain all the provided entries <${JSON.stringify(
        entries
      )}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain all the provided entries <${JSON.stringify(
        entries
      )}>`
    });
    return this.execute({
      assertWhen: entries
        .map(
          entry =>
            this.actual.hasOwnProperty(entry[0]) &&
            Object.getOwnPropertyDescriptor(this.actual, entry[0])?.value ===
              entry[1]
        )
        .every(Boolean),
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
  public toContainAnyEntries(entries: [KeyOf<T>, ValueOf<T>][]): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to contain at least one of the provided entries <${JSON.stringify(
        entries
      )}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to contain any of the provided entries <${JSON.stringify(
        entries
      )}>`
    });
    return this.execute({
      assertWhen: entries
        .map(
          e =>
            this.actual.hasOwnProperty(e[0]) &&
            Object.getOwnPropertyDescriptor(this.actual, e[0])?.value === e[1]
        )
        .some(Boolean),
      error,
      invertedError
    });
  }

  /**
   * Check if the object match the provided object.
   *
   * @param obj the object that the object should match
   * @returns the assertion instance
   */
  public toMatchObject<O extends object>(obj: O): this {
    const error = new AssertionError({
      actual: this.actual,
      message: `Expected the object to match the provided object <${JSON.stringify(
        obj
      )}>`
    });

    const invertedError = new AssertionError({
      actual: this.actual,
      message: `Expected the object NOT to match the provided object <${JSON.stringify(
        obj
      )}>`
    });
    return this.execute({
      assertWhen: Object.keys(obj)
        .map(
          key =>
            this.actual.hasOwnProperty(key) &&
            Object.getOwnPropertyDescriptor(this.actual, key)?.value ===
              Object.getOwnPropertyDescriptor(obj, key)?.value
        )
        .every(Boolean),
      error,
      invertedError
    });
  }
}
