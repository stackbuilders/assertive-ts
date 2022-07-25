# AssertiveTS
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

A type-safe fluent assertion library inspired by [Jest](https://jestjs.io/docs/expect) assertions and the popular [AssertJ](https://assertj.github.io/doc/).

## Install
```
npm install --save-dev @stackbuilders/assertive-ts
```
Or:
```
yarn add --dev @stackbuilders/assertive-ts
```

## Usage

Import the library in your test script:
```typescript
import { expect } from "@stackbuilders/assertive-ts"
```

Use the `expect` function along with a "matcher" function on the value you want to assert:
```typescript
expect(sum(1, 2)).toBeEqual(3);
```

To assert the opposite, just add `.not` before a matcher:
```typescript
expect(sum(1, 2)).not.toBeNull();
```

With `assertive-ts` you can use **fluent assertions**, which means you can chain multiple matcher functions to the same value under test:
```typescript
expect("assertive-ts is awesome!")
  .toStartWith("assertive-ts")
  .not.toContain("unsafe")
  .toEndWith("awesome!");
```

The matcher functions depend on the type of the value on the `expect`. If you're using TypeScript, the compiler will let you know if something is not available for that assertion:
```typescript
// Boolean assertion
expect(isEven(2)).toBeTrue();

// String assertion
expect("foobar").toStartWith("foo");

// Number assertion
expect(sum(1, 2)).toBePositive();

expect(14).toEndWith("4");
           ^ ? type error: `toEndWith` does not exist in `NumberAssertion`
```

For a list of all matchers and extended documentation, please refer to the API documentation.

## Test Runner Integration

- [Jest Integration](docs/jest-tutorial.md)
- [Mocha Integration](docs/mocha-tutorial.md)

## API Reference
You can find the full API reference [here](/docs/pages/index.html)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/JoseLion"><img src="https://avatars.githubusercontent.com/u/3087228?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jose Luis Leon</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=JoseLion" title="Code">💻</a> <a href="#infra-JoseLion" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoseLion" title="Maintenance">🚧</a> <a href="#platform-JoseLion" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=JoseLion" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/byrpatrick"><img src="https://avatars.githubusercontent.com/u/37427699?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Byron Motoche</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=byrpatrick" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=byrpatrick" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/alejo0o"><img src="https://avatars.githubusercontent.com/u/60680371?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alejandro Vivanco</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=alejo0o" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=alejo0o" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/dalejo96"><img src="https://avatars.githubusercontent.com/u/77456654?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Villamarin</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=dalejo96" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=dalejo96" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Alex0jk"><img src="https://avatars.githubusercontent.com/u/22301755?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexander Mejía</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=Alex0jk" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=Alex0jk" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ChristianSama"><img src="https://avatars.githubusercontent.com/u/43491324?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Christian Samaniego</b></sub></a><br /><a href="https://github.com/stackbuilders/assertive-ts/commits?author=ChristianSama" title="Documentation">📖</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=ChristianSama" title="Code">💻</a> <a href="https://github.com/stackbuilders/assertive-ts/commits?author=ChristianSama" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT License](https://github.com/stackbuilders/assertive-ts/blob/master/LICENSE)
