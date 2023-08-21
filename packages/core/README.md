[![CI](https://github.com/stackbuilders/assertive-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/stackbuilders/assertive-ts/actions/workflows/ci.yml)
[![Release](https://github.com/stackbuilders/assertive-ts/actions/workflows/release.yml/badge.svg)](https://github.com/stackbuilders/assertive-ts/actions/workflows/release.yml)
[![Pages](https://github.com/stackbuilders/assertive-ts/actions/workflows/pages.yml/badge.svg)](https://github.com/stackbuilders/assertive-ts/actions/workflows/pages.yml)
[![NPM version](https://img.shields.io/npm/v/@assertive-ts/core?logo=npm)](https://www.npmjs.com/package/@assertive-ts/core)
[![NPM bundle size](https://img.shields.io/bundlephobia/min/@assertive-ts/core)](https://www.npmjs.com/package/@assertive-ts/core)
[![NPM downloads](https://img.shields.io/npm/dm/@assertive-ts/core)](https://www.npmjs.com/package/@assertive-ts/core)
[![NPM license](https://img.shields.io/npm/l/@assertive-ts/core)](https://github.com/stackbuilders/assertive-ts/blob/main/LICENSE)
[![GitHub Release Date](https://img.shields.io/github/release-date/stackbuilders/assertive-ts)](https://github.com/stackbuilders/assertive-ts/releases)
[![Known Vulnerabilities](https://snyk.io/test/github/stackbuilders/assertive-ts/badge.svg)](https://snyk.io/test/github/stackbuilders/assertive-ts)

# Assertive.ts Core

The Assertive.ts Core package contains the main functionalities for the library. Namely, it provides assertions for basic types and all that's common in the JavaScript language, helpers to check and convert types, and an extension mechanism to use and create plugins that let us reach out to the whole JavaScript ecosystem.

## Install

```sh
npm install --save-dev @assertive-ts/core
```

Or:

```sh
yarn add --dev @assertive-ts/core
```

## API Reference

You can find the full API reference [here](https://stackbuilders.github.io/assertive-ts/docs/core/build/) 📚

## Usage

Using you favorite test runner, you just need to import the `expect` and test away! If you don't really agree with `expect` as the name of the assertion function, we provide a couple aliases, such as `assert` and `assertThat`.

```ts
import { expect } from "@assertive-ts/core"

describe("sum", () => {
  it("returns the sum of two numbers", () => {
    const result = sum(3, 2);

    expect(result).toBeEqual(5);
  });
});
```

To assert the opposite, you can simply use the `.not` modifier before the matcher:

```ts
expect(sum(1, 2)).not.toBeNull();
```

This library provides **fluent assertions**, which means you can chain multiple matcher functions to the same value under test:

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

For a list of all [Core](https://github.com/stackbuilders/assertive-ts/blob/main/packages/core/README.md) matchers and extended documentation, you can refer to the [Core API documentation](https://stackbuilders.github.io/assertive-ts/docs/core/build/).

### Type Factory 🏭

A great feature of Assertive.ts is the type safety across the API. But, what should you do if you want to check the value under test is of some specific type during runtime? The answer is simple, Assertive.ts provides a `.asType(TypeFactory)` method, where the [TypeFactory](https://stackbuilders.github.io/assertive-ts/docs/core/build/interfaces/TypeFactory.html) parameter lets you check for the specific type and narrow the assertion instance to a more specific one. To make things simpler, Assertive.ts provides [TypeFactories](https://stackbuilders.github.io/assertive-ts/docs/core/build/interfaces/StaticTypeFactories.html) for the basic types:

```ts
import { expect, TypeFactories } from "@assertive-ts/core";

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
import { usePlugin } from "@assertive-ts/core";

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

declare module "@assertive-ts/core" {

  export interface Expect {
    (actual: File): FileAssertion;
    (actual: HTMLElement): HTMLElementAssertion;
    // ...
  }
}
```

> **Note:** 3rd-party libraries should do this on their types entry point (index.d.ts), this way the interface is automatically extended when their plugin is passed to the `usePlugin(..)` function.

### How to...

If you're looking to write a plugin, you can find a simple example [here](https://github.com/stackbuilders/assertive-ts/blob/main/examples/symbolPlugin/). The example plugin is used in the [Jest](https://github.com/stackbuilders/assertive-ts/blob/main/examples/jest/test/plugins.test.ts) and [Mocha](https://github.com/stackbuilders/assertive-ts/blob/main/examples/mocha/test/plugins.test.ts) examples too, so you can also take a look at them to see how to apply and use plugins.

## License

MIT, see [the LICENSE file](https://github.com/stackbuilders/assertive-ts/blob/main/LICENSE).

## Contributing

Do you want to contribute to this project? Please take a look at our [contributing guideline](https://github.com/stackbuilders/assertive-ts/blob/main/docs/CONTRIBUTING.md) to know how you can help us build it.

---
<img src="https://www.stackbuilders.com/media/images/Sb-supports.original.png" alt="Stack Builders" width="50%" />

[Check out our libraries](https://github.com/stackbuilders/) | [Join our team](https://www.stackbuilders.com/join-us/)
