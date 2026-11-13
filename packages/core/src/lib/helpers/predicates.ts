import isDeepEqual from "fast-deep-equal/es6";

import type { Predicate } from "./types";

/**
 * Creates a predicate function that negates the result of the provided
 * `predicate` function.
 *
 * @param predicate - the predicate function to negate
 * @returns a predicate function that returns the opposite boolean result of
 *          the provided `predicate`
 */
export function not<A>(predicate: Predicate<A>): Predicate<A> {
  return value => !predicate(value);
}

/**
 * Creates a predicate function that checks if a given value is deeply equal
 * to the provided `second` value.
 *
 * @param second - the value to compare against
 * @returns a predicate function that takes a `first` value and returns `true`
 *          if it's deeply equal to `second`, `false` otherwise
 */
export function deepEquals<A, B>(second: B): Predicate<A> {
  return first => isDeepEqual(first, second);
}
