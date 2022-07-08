# Step by step guide

Let's setup a project with Jest and assertive-ts to write our first assertion.

First, let's install our dependencies

Using npm:
```
npm install --save-dev typescript ts-jest jest @types/jest assertive-ts
```

Using yarn:
```
yarn add -D typescript ts-jest jest @types/jest assertive-ts
```

Let's create a tsconfig.json file
```
npx tsc -init
```

Let's also create a jest config file named jest.config.js at the root directory by running the following command:
```
npx ts-jest config:init
```

We are going to test a simple function:

*src/script.ts*
```javascript
export const sum = (a: number, b: number): number => {
  return a + b;
}
```

Let's write our first test inside the `tests` directory. Make sure to import the `assert` function from the assertive-ts module.

*tests/script.test.ts*
```javascript
import { assert } from "assertive-ts";
import { sum } from "../src/script";

describe("sum", () => {
  it("adds two numbers", () => {
    assert(sum(1, 2)).toBeEqual(3);
  })
});
```

Last thing is to create a `package.json` test script:
```javascript
//...
scripts: {
  "test": "jest"
}
```

Now you can run `npm test` and your test suite should run!

# Usage

You can call `assert` on the object you wish to test. 
```javascript
assert(sum(1, 2)).toBeEqual(3);
```

assertive-ts allows the use of fluent assertions, which means you can chain multiple matchers on an assertion:
```javascript
assert(sum(1, 2)).toBeEqual(3)
                 .toBeTruthy()
                 .toBeFinite();
```

To assert the opposite, just add `.not` before a matcher.
```javascript
assert(sum(1, 2)).not.toBeNull();
```

The matchers will depend on the type of the object passed to the `assert` function:

### Boolean Assertions
```javascript
assert(isEven(2)).toBeTrue()
                 .not.toBeFalse();
```

### Number Assertions
```javascript
assert(sum(1, 2)).toBePositive()
                 .toBeFinite()
                 .toBeGreaterThan(2)
                 .toBeLessThan(4);
```

### String Assertions
```javascript
assert("foobar").toStartWith("foo")
                .toEndWith("bar")
                .toContain("ob")
                .toMatchRegex(/bar/)
                .toBeEqualCaseInsensitive("FOOBAR")
                .not.toBeBlank()
                .not.toBeEmpty();
```

### Array Assertions
```javascript
const animals = [
  "sea sponge",
  "starfish",
  "squid"
];

assert(animals).toContainAny("starfish")
                .toContainAt(2, "squid")
                .toContainAll("starfish", "sea sponge", "squid")
                .toHaveSize(3)
                .not.toBeEmpty();
```

### Function Assertions
``` javascript
assert(throwingFunction)
      .toThrowError()
      .toHaveMessage("Oops! Something went wrong...")
```
