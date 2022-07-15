# Usage with Mocha

Let's setup a project with Mocha and assertive-ts.

First, let's install the dependencies:
```
npm install --save-dev typescript mocha @types/mocha ts-node
```

This library is meant to be used with TypeScript, so to have better results we encourage you to use TypeScript in your project. 

Let's create a `tsconfig.json` file:
```
npx tsc -init
```

Let's also create a mocha configuration file:

*.mocharc.json*
```json
{
  "extension": ["ts"],
  "spec": "tests/**/*.test.ts",
  "require": [
    "ts-node/register"
  ]
}
```

As the config includes the Typescript transpilation hook `ts-node/register` it does not require pre-compilation before running.

>For more information about mocha configuration please refer to the [official documentation](https://mochajs.org/#configuring-mocha-nodejs)

We are going to test a simple function:

*src/mathUtils.ts*
```typescript
export const sum = (a: number, b: number): number => {
  return a + b;
}
```

Now let's write a test for that function. Make sure to import `expect` from the `@stackbuilders/assertive-ts` module.

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