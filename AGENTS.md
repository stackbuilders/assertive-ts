# AGENTS.md

Instructions for coding agents. Setup, workflow, commit scopes and releases are in [docs/development.md](docs/development.md).

## Done condition

Set up per [Requirements](docs/development.md#requirements). A change is done when this exits 0 (~30 s from a cold cache):

```console
yarn compile && yarn lint && yarn test
```

For one package, run `yarn test` from `packages/<pkg>` (core takes ~1 s). `yarn lint` prints react-native parse warnings; the exit code is the signal.

## Where things live

- `expect()` dispatch: `packages/core/src/lib/expect.ts`.
- Plugins: `usePlugin()` in `packages/core/src/main.ts` registers them into `packages/core/src/lib/config/Config.ts`, which `expect()` consults.
- One `*Assertion.ts` per type, in `packages/<pkg>/src/lib/`. Tests live in each package's `test/`.

## Matcher pattern

Build both errors, then pass them to `this.execute`, which handles `.not`. Copy `toBeGreaterThan` in `packages/core/src/lib/NumberAssertion.ts`:

```ts
/**
 * Check if the number value is greater than the defined value.
 *
 * @example
 * ```
 * expect(5).toBeGreaterThan(3);
 * ```
 */
public toBeGreaterThan(value: number): this {
  const error = new AssertionError({
    actual: this.actual,
    message: `Expected <${this.actual}> to be greater than <${value}>`,
  });
  const invertedError = new AssertionError({
    actual: this.actual,
    message: `Expected <${this.actual}> NOT to be greater than <${value}>`,
  });

  return this.execute({ assertWhen: this.actual > value, error, invertedError });
}
```

Each test case asserts the direct and the `.not` path with exact messages (`packages/core/test/lib/NumberAssertion.test.ts`):

```ts
assert.deepStrictEqual(test.toBeGreaterThan(2), test);
assert.throws(() => test.not.toBeGreaterThan(2), {
  message: "Expected <3> NOT to be greater than <2>",
  name: AssertionError.name,
});
```

## Test rule

Give every comparison matcher an equal-value/boundary case and a negative-number case. JS `%` keeps the sign of the left operand, and the suite once let a `>` → `>=` mutation pass.

## Pull requests

The repo is squash-merge only: the PR title becomes the commit message and drives semantic-release. Write it as a Conventional Commit with a scope from [Scopes](docs/development.md#scopes).

## Dependency fixes

Add a `resolutions` entry in the root `package.json`, run `yarn dedupe`, then verify with `yarn why <pkg>` and `yarn npm audit --all --recursive --severity high` (exit 0 means clean).

## Release boundary

Only maintainers release, through `.github/workflows/release.yml`. Leave that workflow, `.yarn/releases/`, `yarn release` and `npm publish` alone.
