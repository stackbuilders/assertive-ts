/**
 * Utility type that represents any kind of structured object.
 */
export type Struct = Record<keyof unknown, unknown>;

/**
 * Mapped type which transforms an structured object `<T>` to entries., i.e. a
 * key-value tuples.
 *
 * @param T an structured object which extends {@link Struct}
 */
export type Entry<T extends Struct> = { [K in keyof T]: [K, T[K]]; }[keyof T];

/**
 * Utility type that represents a predicate function, i.e. a function that
 * takes a value of type `<T>` and returns a boolean.
 *
 * @param T the type of the value to be evaluated by the predicate
 */
export type Predicate<T> = (value: T) => boolean;
