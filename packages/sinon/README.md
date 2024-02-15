# Assertive.ts Sinon

An Assertive.ts plugin to match over [Sinon.js](https://sinonjs.org/) spies, stubs, mocks, and fakes.

## Requirements

- **@assertive-ts/core:** >=2.0.0
- **sinon:** >=15.2.0

## Install

```sh
npm install --save-dev @assertive-ts/sinon
```

Or:

```sh
yarn add --dev @assertive-ts/sinon
```

## API Reference

You can find the full API reference [here](https://stackbuilders.github.io/assertive-ts/docs/sinon/build/) 📚

## Usage

You just need to load the plugin in a file that runs before the tests execution, like a `setup.ts` or something like that:

```ts
// setup.ts

import { usePlugin } from "@assertive-ts/core";
import { SinonPlugin } from "@assertive-ts/sinon";

usePlugin(SinonPlugin);

// ...rest of your setup
```

And that's it! The extra types will be automatically added as well so you won't need to change anything on TypeScript's side. Now you can use the `expect(..)` function to assert over Sinon spies, stubs, mocks, and fakes.

```ts
import { expect } from "@assertive-ts/core";
import Sinon from "sinon";

const spy = Sinon.spy(launchRockets);

expect(spy).toBeCalled(3); // exactly 3 times

expect(spy).toBeCalledTwice();

expect(spy).toBeCalledAtLeast(2);

expect(spy).toBeCalledAtMost(3);

expect(spy).toHaveArgs(10, "long-range");

expect(spy).toThrow();
```

The assertions above act over any of the calls made to the spy. You can get more specific matchers if you assert over a single spy call:

```ts
import { expect } from "@assertive-ts/core";
import Sinon from "sinon";

const spy = Sinon.spy(launchRockets);

expect(spy.firstCall).toHaveArgs(5, "short-range");

expect(spy.firstCall).toReturn({ status: "ok" });

expect(spy.firstCall) // more specific matchers over a single call
  .toThrowError(InvarianError)
  .toHaveMessage("Something went wrong...");

// or...

expect(spy)
  .call(1)
  .toThrowError(InvarianError)
  .toHaveMessage("Something went wrong...");

// or even better...

expect(spy)
  .toBeCalledOnce()
  .toThrowError(InvarianError)
  .toHaveMessage("Something went wrong...");
```

Notice how `call(..)` and `.toBeCalledOnce()` methods return an assertion over the single call, this way you can chain matchers instead of writing more statements.

## License

MIT, see [the LICENSE file](https://github.com/stackbuilders/assertive-ts/blob/main/packages/sinon/LICENSE).

## Contributing

Do you want to contribute to this project? Please take a look at our [contributing guideline](https://github.com/stackbuilders/assertive-ts/blob/main/docs/CONTRIBUTING.md) to know how you can help us build it.

---

<img src="https://www.stackbuilders.com/media/images/Sb-supports.original.png" alt="Stack Builders" width="50%" />

[Check out our libraries](https://github.com/stackbuilders/) | [Join our team](https://www.stackbuilders.com/join-us/)
