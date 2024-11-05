<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![CI](https://github.com/stackbuilders/assertive-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/stackbuilders/assertive-ts/actions/workflows/ci.yml)
[![Release](https://github.com/stackbuilders/assertive-ts/actions/workflows/release.yml/badge.svg)](https://github.com/stackbuilders/assertive-ts/actions/workflows/release.yml)
[![Pages](https://github.com/stackbuilders/assertive-ts/actions/workflows/pages.yml/badge.svg)](https://github.com/stackbuilders/assertive-ts/actions/workflows/pages.yml)
[![NPM Core version](https://img.shields.io/npm/v/@assertive-ts/core?logo=npm&label=core)](https://www.npmjs.com/package/@assertive-ts/core)
[![NPM Sinon version](https://img.shields.io/npm/v/@assertive-ts/sinon?logo=npm&label=sinon)](https://www.npmjs.com/package/@assertive-ts/sinon)
[![NPM license](https://img.shields.io/npm/l/@assertive-ts/core)](https://github.com/stackbuilders/assertive-ts/blob/main/LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/stackbuilders/assertive-ts/badge.svg)](https://snyk.io/test/github/stackbuilders/assertive-ts)

# Assertive.ts

A type-safe fluent assertion library written in TypeScript and inspired by [Jest](https://jestjs.io/docs/expect) assertions and the popular [AssertJ](https://assertj.github.io/doc/).

This library is designed to work in the browser and in Node.js. It ships with a rich set of expressive and flexible matchers that allows chaining multiple assertions. Assertive.ts is framework agnostic and should be used with a test framework such as [Jest](/docs/jest-tutorial.md), [Mocha](/docs/mocha-tutorial.md), or Ava.

**🚨 BREAKING CHANGES:** Since v2, the `@stackbuilders/assertive-ts` package has been renamed to `@assertive-ts/core` so we can group other packages, such as plugins, into the same namespace. Check the [packages](#packages) section for more info.

## Type-safe library

A distinctive feature of Assertive.ts with other assertion libraries is that it leverages the TypeScript compiler to avoid type coercions and mismatches. It also infers the static type of the value you want to assert and provides you with intelligent matcher completion and signature help so that you can write code more quickly and correctly.

### Features

- Type safety and intelligent matcher completion
- Rich set of expressive and flexible matchers
- Concise, chainable interface inspired by AssertJ
- Works with any test runner and framework such as [Jest](/docs/jest-tutorial.md), [Mocha](/docs/mocha-tutorial.md), or Ava
- Well tested: more than 300 tests!

## Packages

For convenience, this library is split into packages grouped within the same namespace:

- **[assertive-ts/core](https://github.com/stackbuilders/assertive-ts/blob/main/packages/core/README.md):** Core functionalities, assertions applicable for any kind of application. This package is required for the [extension mechanism](https://github.com/stackbuilders/assertive-ts/blob/main/packages/core/README.md#extension-mechanism-%EF%B8%8F) (plugins). This package replaces the deprecated `stackbuilders/assertive-ts` package.
- **[assertive-ts/sinon](https://github.com/stackbuilders/assertive-ts/blob/main/packages/sinon/README.md):** Plugin to add matchers for [Sinon.js](https://sinonjs.org/) spies, stubs, mocks, and fakes.

## Usage

Using you favorite test runner, you just need to import the `expect` and test away! If you don't really agree with `expect` as the name of the assertion function, we provide a couple aliases, such as `assert` and `assertThat`.

```ts
import { expect } from "@assertive-ts/core";

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

// Error assertion
expect(new Error(errorMessage)).toHaveMessage(expectedError);

// Array assertion
const data = [1, 2, 3, 4]
expect(data).toMatchAll(x => x < 5);
expect(data).toBeEmpty()

// Date assertion
const date = new Date(2023, 12, 31);
expect(date).toBeAfter(new Date(2023, 12, 1));
expect(date).toBeBefore(new Date(2024, 1, 1));

// Object assertion
const objectData = {
  key1: "test1",
  key2: "test2",
};
expect(objectData).toContainKey("key1");
expect(objectData).toContainEntry(["key1", "test1"]);

expect(14).toEndWith("4");
           ^ ? type error: `toEndWith` does not exist in `NumberAssertion`
```

You can also assert over functions and asynchronous code, for example:

```ts
function verifyEnvVar(): void {
  const { MY_ENV_VAR } = process.env;

  if (!MY_ENV_VAR) {
    throw new Error("Missing MY_ENV_VAR environment variable");
  }
};

// assertion
expect(() => verifyEnvVar())
  .toThrowError(Error)
  .toHaveMessage("Missing MY_ENV_VAR environment variable");

expect(() => verifyEnvVar()).not.toThrow();

async function getData(): Promise<DataType> {
  const data = await requestApi();

  if (!data) {
    throw new Error("Data was not found");
  }

  return data;
}

// assertion
await expect(getData()).toBeRejected();

await expect(getData()).toBeResolved();
```

For a list of all [Core](https://github.com/stackbuilders/assertive-ts/blob/main/packages/core/README.md) matchers and extended documentation, you can refer to the [Core API documentation](https://stackbuilders.github.io/assertive-ts/docs/core/build/).

## Test Runner Integration

Assertive.ts works on any JavaScript test runner, both on Node.js and browser environments. Below you can find some example of how to use it on some of the most common test runners:

- [Jest Integration](https://github.com/stackbuilders/assertive-ts/blob/main/docs/jest-tutorial.md)
- [Mocha Integration](https://github.com/stackbuilders/assertive-ts/blob/main/docs/mocha-tutorial.md)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JoseLion"><img src="https://avatars.githubusercontent.com/u/3087228?v=4?s=100" width="100px;" alt="Jose Luis Leon"/><br /><sub><b>Jose Luis Leon</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=JoseLion" title="Code">💻</a> <a href="#infra-JoseLion" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoseLion" title="Maintenance">🚧</a> <a href="#platform-JoseLion" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=JoseLion" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/byrpatrick"><img src="https://avatars.githubusercontent.com/u/37427699?v=4?s=100" width="100px;" alt="Byron Motoche"/><br /><sub><b>Byron Motoche</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=byrpatrick" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=byrpatrick" title="Tests">⚠️</a> <a href="https://github.com/stackbuilders/assertive-ts/pulls?q=is%3Apr+reviewed-by%3Abyrpatrick" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alejo0o"><img src="https://avatars.githubusercontent.com/u/60680371?v=4?s=100" width="100px;" alt="Alejandro Vivanco"/><br /><sub><b>Alejandro Vivanco</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=alejo0o" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=alejo0o" title="Tests">⚠️</a> <a href="https://github.com/stackbuilders/assertive-ts/pulls?q=is%3Apr+reviewed-by%3Aalejo0o" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dalejo96"><img src="https://avatars.githubusercontent.com/u/77456654?v=4?s=100" width="100px;" alt="David Villamarin"/><br /><sub><b>David Villamarin</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=dalejo96" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=dalejo96" title="Tests">⚠️</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=dalejo96" title="Documentation">📖</a> <a href="https://github.com/stackbuilders/assertive-ts/pulls?q=is%3Apr+reviewed-by%3Adalejo96" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Alex0jk"><img src="https://avatars.githubusercontent.com/u/22301755?v=4?s=100" width="100px;" alt="Alexander Mejía"/><br /><sub><b>Alexander Mejía</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=Alex0jk" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=Alex0jk" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ChristianSama"><img src="https://avatars.githubusercontent.com/u/43491324?v=4?s=100" width="100px;" alt="Christian Samaniego"/><br /><sub><b>Christian Samaniego</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=ChristianSama" title="Documentation">📖</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=ChristianSama" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=ChristianSama" title="Tests">⚠️</a> <a href="https://github.com/stackbuilders/assertive-ts/pulls?q=is%3Apr+reviewed-by%3AChristianSama" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sestrella"><img src="https://avatars.githubusercontent.com/u/2049686?v=4?s=100" width="100px;" alt="Sebastián Estrella"/><br /><sub><b>Sebastián Estrella</b></sub></a><br /><a href="#infra-sestrella" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nieled"><img src="https://avatars.githubusercontent.com/u/20074796?v=4?s=100" width="100px;" alt="Daniel Calle"/><br /><sub><b>Daniel Calle</b></sub></a><br /><a href="#infra-nieled" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/NeoLight1010"><img src="https://avatars.githubusercontent.com/u/58057324?v=4?s=100" width="100px;" alt="Anthony Suárez"/><br /><sub><b>Anthony Suárez</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=NeoLight1010" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sebas1208"><img src="https://avatars.githubusercontent.com/u/5571870?v=4?s=100" width="100px;" alt="Sebastian Avalos"/><br /><sub><b>Sebastian Avalos</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/pulls?q=is%3Apr+reviewed-by%3Asebas1208" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://wavee.world/invitation/b96d00e6-b802-4a1b-8a66-2e3854a01ffd"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=100" width="100px;" alt="Ikko Eltociear Ashimine"/><br /><sub><b>Ikko Eltociear Ashimine</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=eltociear" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fonsiher"><img src="https://avatars.githubusercontent.com/u/67283172?v=4?s=100" width="100px;" alt="Edwin Hernández"/><br /><sub><b>Edwin Hernández</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=fonsiher" title="Code">💻</a></td>
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

Do you want to contribute to this project? Please take a look at our [contributing guidelines](/docs/CONTRIBUTING.md) to know how you can help us build it. You can also check the [development guide](/docs/development.md) for information about local setup and the release process.

---

<img src="https://www.stackbuilders.com/media/images/Sb-supports.original.png" alt="Stack Builders" width="50%" />

[Check out our libraries](https://github.com/stackbuilders/) | [Join our team](https://www.stackbuilders.com/join-us/)
