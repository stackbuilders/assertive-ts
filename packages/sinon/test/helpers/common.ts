/**
 * Calls a function that will sneak by any error thrown.
 *
 * @param fn a function to sneakily call
 */
export function sneakyCall(fn: () => unknown): void {
  try {
    fn();
  } catch {
    // continue...
  }
}
