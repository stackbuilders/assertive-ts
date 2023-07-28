<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-10-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![CI](https://github.com/stackbuilders/assertive-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/stackbuilders/assertive-ts/actions/workflows/ci.yml)
[![Release](https://github.com/stackbuilders/assertive-ts/actions/workflows/release.yml/badge.svg)](https://github.com/stackbuilders/assertive-ts/actions/workflows/release.yml)
[![Pages](https://github.com/stackbuilders/assertive-ts/actions/workflows/pages.yml/badge.svg)](https://github.com/stackbuilders/assertive-ts/actions/workflows/pages.yml)
[![NPM version](https://img.shields.io/npm/v/@stackbuilders/assertive-ts?logo=npm)](https://www.npmjs.com/package/@stackbuilders/assertive-ts)
[![NPM bundle size](https://img.shields.io/bundlephobia/min/@stackbuilders/assertive-ts)](https://www.npmjs.com/package/@stackbuilders/assertive-ts)
[![NPM downloads](https://img.shields.io/npm/dm/@stackbuilders/assertive-ts)](https://www.npmjs.com/package/@stackbuilders/assertive-ts)
[![NPM license](https://img.shields.io/npm/l/@stackbuilders/assertive-ts)](./LICENSE)
[![GitHub Release Date](https://img.shields.io/github/release-date/stackbuilders/assertive-ts)](https://github.com/stackbuilders/assertive-ts/releases)
[![Known Vulnerabilities](https://snyk.io/test/github/stackbuilders/assertive-ts/badge.svg)](https://snyk.io/test/github/stackbuilders/assertive-ts)

# AssertiveTS

A type-safe fluent assertion library written in TypeScript and inspired by [Jest](https://jestjs.io/docs/expect) assertions and the popular [AssertJ](https://assertj.github.io/doc/).

This library is designed to work in the browser and in Node.js. It ships with a rich set of expressive and flexible matchers that allows chaining multiple assertions. AssertiveTS is framework agnostic and should be used with a test framework such as [Jest](/docs/jest-tutorial.md), [Mocha](/docs/mocha-tutorial.md), or Ava.

## Type-safe library

A distinctive feature of AssertiveTS with other assertion libraries is that it leverages the TypeScript compiler to avoid type coercions and mismatches. It also infers the static type of the value you want to assert and provides you with intelligent matcher completion and signature help so that you can write code more quickly and correctly.

### Features

- Type safety and intelligent matcher completion 
- Rich set of expressive and flexible matchers
- Concise, chainable interface inspired by AssertJ
- Works with any test runner and framework such as [Jest](/docs/jest-tutorial.md), [Mocha](/docs/mocha-tutorial.md), or Ava
- Well tested: more than 300 tests!

## Install

```sh
npm install --save-dev @stackbuilders/assertive-ts
```

Or:

```sh
yarn add --dev @stackbuilders/assertive-ts
```

## Usage

Import the library in your test script:

```ts
import { expect } from "@stackbuilders/assertive-ts"
```

Use the `expect` function along with a "matcher" function on the value you want to assert:

```ts
expect(sum(1, 2)).toBeEqual(3);
```

To assert the opposite, just add `.not` before a matcher:

```ts
expect(sum(1, 2)).not.toBeNull();
```

With `assertive-ts` you can use **fluent assertions**, which means you can chain multiple matcher functions to the same value under test:

```ts
expect("assertive-ts is awesome!")
  .toStartWith("assertive-ts")
  .not.toContain("unsafe")
  .toEndWith("awesome!");
```

The matcher functions depend on the type of the value on the `expect`. If you're using TypeScript, the compiler will let you know if something is not available for that assertion:

```ts
// Boolean assertion
expect(isEven(2)).toBeTrue();

// String assertion
expect("foobar").toStartWith("foo");

// Number assertion
expect(sum(1, 2)).toBePositive();

expect(14).toEndWith("4");
           ^ ? type error: `toEndWith` does not exist in `NumberAssertion`
```

For a list of all matchers and extended documentation, please refer to the [API documentation](https://stackbuilders.github.io/assertive-ts/docs/build/).

### Type Factory 🏭

A great feature of AssertiveTS is the type safety across the API. But, what should you do if you want to check the value under test is of some specific type during runtime? The answer is simple, AssertiveTS provides a `.asType(TypeFactory)` method, where the [TypeFactory](https://stackbuilders.github.io/assertive-ts/docs/build/interfaces/TypeFactory.html) parameter lets you check for the specific type and narrow the assertion instance to a more specific one. To make things simpler, AssertiveTS provides [TypeFactories](https://stackbuilders.github.io/assertive-ts/docs/build/interfaces/StaticTypeFactories.html) for the basic types:

```ts
import { expect, TypeFactories } from "@stackbuilders/assertive-ts";

expect(value)
  .asType(TypeFactories.String)
  .toBeEmpty();

expect(list)
  .asType(TypeFactories.array(TypeFactories.Number))
  .toHaveSameMembers([1, 2, 3, 4, 5]);
```

If the built-in type factories are not enough to assert your specific type, you can always create your own factory. A `TypeFactory<S, A>` is nothing more than an object with 3 properties:

- `Factory: new(actual: S) => A` - The specific assertion constructor to return if the predicate is true. Where `S` is the actual value type, and `A` is the type of the assertion to return (`A` should extend from `Assertion<S>`).
- `predicate(value: unknown): value is S` - A predicate function that checks if the value is of the expected type.
- `typeName: string` - The name of the checked type. Used to make the assertion error message clearer.

So, using a custom `TypeFactory` can look like the following:

```ts
interface Point3D {
  x: number;
  y: number;
  z: number;
}

expect(maybePoint).asType({
  Factory: ObjectAssertion<Point3D>,
  predicate: (value): value is Point3D => {
    return typeof value === "object"
      && value !== null
      && "x" in value
      && "y" in value
      && "z" in value
      && Object.values(value).every(v => typeof v === "number");
  },
  typeName: "Point3D"
});
```

### Handling TypeScript Unions

[Union types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) are a TypeScript concept that is only applicable at type level. During runtime, the value can only be one of the types. For instance, if we say `const foo: number | string = ...`, at runtime `foo` will be either a `number` or a `string`. If you want to use a more specific assertion on a union type, you can use `.asType(..)` to first assert the expected type, and then move forward with more assertions:

```ts
const foo: number | string = 5;

expect(foo)
  .asType(TypeFactories.Number)
  .toBePositive();
```

### Help! The value can also be `null` or `undefined`

When a value can be also `null` or `undefined`, we're going over the same concept as [Union types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types). So if you want to make more specific assertions over a value that can be `null | undefined`, just use `.asType(..)` first:

```ts
const bar: string | null | undefined = "   ";

expect(bar)
  .asType(TypeFactories.String)
  .toBeBlank();
```

## Test Runner Integration

- [Jest Integration](docs/jest-tutorial.md)
- [Mocha Integration](docs/mocha-tutorial.md)

## API Reference

You can find the full API reference [here](https://stackbuilders.github.io/assertive-ts/docs/build/)

## Extension mechanism ⚙️

This feature allows you to extend the `expect(..)` function to return additional `Assertion<T>` instances depending on the value under test. This opens the door to add additional assertion matchers for more specific cases. An `Assertion<T>` can be added in the form of a `Plugin`:
```ts
interface Plugin<T, A extends Assertion<T>> {
  Assertion: new(actual: T) => A;
  insertAt: "top" | "bottom";
  predicate: (actual: unknown) => actual is T;
}
```

Where `Assertion` is the class you want to add, `insertAt` determines if the logic is inserted before or after all the primitives, and `predicate` is the logical code used to determine if value matches the `Assertion` type.

Once you have a plugin object, you can add it to assertive-ts with the `usePlugin(..)` helper function. Calls to this function should go on the setup file of your test runner or in a `beforeAll()` hook, so the extension is applied to all your tests.
```ts
// test/setup.ts
import { usePlugin } from "@stackbuilders/assertive-ts";

import { FilePlugin, HTMLElementPlugin } from "./plugins"; // your custom (or 3rd-party) plugins

usePlugin(FilePlugin);
usePlugin(HTMLElementPlugin);
// ...
```

### What about the types?

Each new plugin should add an additional overload to the `expect(..)` function to maintain type safety. To do that, you can extend the `Expect` interface to add the additional overloads. For example:
```ts
import { FileAssertion } from "./FileAssertion";
import { HTMLElementAssertion } from "./HTMLElementAssertion";

declare module "@stackbuilders/assertive-ts" {

  export interface Expect {
    (actual: File): FileAssertion;
    (actual: HTMLElement): HTMLElementAssertion;
    // ...
  }
}
```

> **Note:** 3rd-party libraries should do this on their types entry point (index.d.ts), this way the interface is automatically extended when their plugin is passed to the `usePlugin(..)` function.

### How to...

If you're looking to write a plugin, you can find a simple example [here](./examples/symbolPlugin/). The example plugin is used in the [Jest](./examples/jest/test/plugins.test.ts) and [Mocha](./examples/mocha/test/plugins.test.ts) examples too, so you can also take a look at them to see how to apply and use plugins.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JoseLion"><img src="https://avatars.githubusercontent.com/u/3087228?v=4?s=100" width="100px;" alt="Jose Luis Leon"/><br /><sub><b>Jose Luis Leon</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=JoseLion" title="Code">💻</a> <a href="#infra-JoseLion" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoseLion" title="Maintenance">🚧</a> <a href="#platform-JoseLion" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=JoseLion" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/byrpatrick"><img src="https://avatars.githubusercontent.com/u/37427699?v=4?s=100" width="100px;" alt="Byron Motoche"/><br /><sub><b>Byron Motoche</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=byrpatrick" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=byrpatrick" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alejo0o"><img src="https://avatars.githubusercontent.com/u/60680371?v=4?s=100" width="100px;" alt="Alejandro Vivanco"/><br /><sub><b>Alejandro Vivanco</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=alejo0o" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=alejo0o" title="Tests">⚠️</a> <a href="https://github.com/stackbuilders/assertive-ts/pulls?q=is%3Apr+reviewed-by%3Aalejo0o" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dalejo96"><img src="https://avatars.githubusercontent.com/u/77456654?v=4?s=100" width="100px;" alt="David Villamarin"/><br /><sub><b>David Villamarin</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=dalejo96" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=dalejo96" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Alex0jk"><img src="https://avatars.githubusercontent.com/u/22301755?v=4?s=100" width="100px;" alt="Alexander Mejía"/><br /><sub><b>Alexander Mejía</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=Alex0jk" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=Alex0jk" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ChristianSama"><img src="https://avatars.githubusercontent.com/u/43491324?v=4?s=100" width="100px;" alt="Christian Samaniego"/><br /><sub><b>Christian Samaniego</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=ChristianSama" title="Documentation">📖</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=ChristianSama" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=ChristianSama" title="Tests">⚠️</a> <a href="https://github.com/stackbuilders/assertive-ts/pulls?q=is%3Apr+reviewed-by%3AChristianSama" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sestrella"><img src="https://avatars.githubusercontent.com/u/2049686?v=4?s=100" width="100px;" alt="Sebastián Estrella"/><br /><sub><b>Sebastián Estrella</b></sub></a><br /><a href="#infra-sestrella" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nieled"><img src="https://avatars.githubusercontent.com/u/20074796?v=4?s=100" width="100px;" alt="Daniel Calle"/><br /><sub><b>Daniel Calle</b></sub></a><br /><a href="#infra-nieled" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/NeoLight1010"><img src="https://avatars.githubusercontent.com/u/58057324?v=4?s=100" width="100px;" alt="Anthony Suárez"/><br /><sub><b>Anthony Suárez</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=NeoLight1010" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sebas1208"><img src="https://avatars.githubusercontent.com/u/5571870?v=4?s=100" width="100px;" alt="Sebastian Avalos"/><br /><sub><b>Sebastian Avalos</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/pulls?q=is%3Apr+reviewed-by%3Asebas1208" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT, see [the LICENSE file](LICENSE).

## Contributing

Do you want to contribute to this project? Please take a look at our [contributing guideline](/docs/CONTRIBUTING.md) to know how you can help us build it.

---
<img src="https://www.stackbuilders.com/media/images/Sb-supports.original.png" alt="Stack Builders" width="50%" />

[Check out our libraries](https://github.com/stackbuilders/) | [Join our team](https://www.stackbuilders.com/join-us/)
