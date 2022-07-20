# Usage with Jest

Let's set up a project with Jest and assertive-ts to write our first assertion.

First, let's install the dependencies:

```
npm install --save-dev typescript ts-jest jest @types/jest @stackbuilders/assertive-ts
```

This library is meant to be used with TypeScript, so to have better results we encourage you to use TypeScript in your project. 

Let's create a `tsconfig.json` file:
```
npx tsc -init
```

Let's also create a jest configuration file at the root directory by running the following command:
```
npx ts-jest config:init
```

**For more information about Jest and its configuration please refer to the [official documentation](https://jestjs.io/docs/getting-started).**

We are going to test a simple function:

*src/mathUtils.ts*
```typescript
export const sum = (a: number, b: number): number => {
  return a + b;
}
```

Now let's write a test for that function. Make sure to import `expect` from the `@stackbuilders/assertive-ts` module:

*tests/mathUtils.test.ts*
```typescript
import { expect } from "@stackbuilders/assertive-ts";
import { sum } from "../src/mathUtils";

describe("sum", () => {
  it("adds two numbers", () => {
    expect(sum(1, 2)).toBeEqual(3);
  })
});
```

And that's it! Now you can run your tests as usual with your test script.

## Keeping Jest's `expect` function

You might want to use the `expect` function from Jest along with assertive-ts assertions. There are a couple ways to achieve this:

- Instead of importing `expect` from the `assertive-ts` module, you can import one of the available aliases: `assert` or `assertThat`:

```typescript
    import { expect } from "@jest/globals";
    import { assert } from "@stackbuilders/assertive-ts";
```

- Or use an explicit import to rename the `expect` function from Jest to something like `jestExpect`:

```typescript
    import { expect as jestExpect } from "@jest/globals";
    import { expect } from "@stackbuilders/assertive-ts";
```
