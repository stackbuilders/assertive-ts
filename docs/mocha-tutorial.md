# Usage with Mocha

Let's setup a project with Mocha and Assertive-ts

First, let's install our dependencies
```
npm install --save-dev typescript mocha @types/mocha 
```

This library is meant to be used with TypeScript, so to have better results we encourage you to use TypeScript in your project. 

Let's create a `tsconfig.json` file:
```
npx tsc -init
```

We are going to test a simple function

*src/mathUtils.ts*
```typescript
export const sum = (a: number, b: number): number => {
  return a + b;
}
```

Let's write our first test inside the `tests` directory. Make sure to import the `expect` function from the assertive-ts module.

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

Now you can run your tests as usual with your test script, and that's it!