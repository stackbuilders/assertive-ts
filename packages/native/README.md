# Assertive.ts Native

An Assertive.ts plugin that provides assertion Matchers for React Native elements.

## Requirements

- **@assertive-ts/core:** >=2.0.0

## Install

```sh
npm install --save-dev @assertive-ts/native
```

Or:

```sh
yarn add --dev @assertive-ts/native
```

## API Reference

You can find the full API reference [here](https://stackbuilders.github.io/assertive-ts/docs/native/build/) 📚

## Usage

You just need to load the plugin in a file that runs before the test execution, like a `setup.ts` or something like that:

```ts
// setup.ts

import { usePlugin } from "@assertive-ts/core";
import { NativePlugin } from "@assertive-ts/native";

usePlugin(NativePlugin);

// ...rest of your setup
```

And that's it! The extra types will be automatically added as well so you won't need to change anything on TypeScript's side. Now you can use the `expect(..)` function to assert over `ReactTestInstance` elements, like the ones you get from [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) queries.

```tsx
import { expect } from "@assertive-ts/core";
import { render, screen } from "@testing-library/react-native";

render(<Greeting name="World" />);

const greeting = screen.getByTestId("greeting");

expect(greeting).toBeVisible();

expect(greeting).toHaveTextContent("Hello World");
```

Every matcher supports `.not` and can be chained. When an assertion fails, the error message names the element, e.g. `Expected element <Text ... /> to be disabled.` (or `NOT to be disabled.` under `.not`).

### State

```tsx
expect(button).toBeEnabled();

expect(button).toBeDisabled(); // also true when an ancestor is disabled

expect(container).toBeEmpty(); // the element has no children

expect(greeting).toBeVisible(); // not visible when an ancestor is hidden
```

### Structure

```tsx
expect(parent).toContainElement(child);

expect(parent).not.toContainElement(otherElement);
```

### Props

```tsx
expect(button).toHaveProp("accessibilityLabel"); // the prop is present

expect(button).toHaveProp("accessibilityLabel", "Submit"); // ...with this value
```

### Style

`toHaveStyle` accepts a style object or an array of style objects, the same as the `style` prop in React Native:

```tsx
expect(greeting).toHaveStyle({ backgroundColor: "red" });

expect(greeting).toHaveStyle([{ backgroundColor: "red" }, { color: "white" }]);
```

### Text content

`toHaveTextContent` accepts a string, a `RegExp`, or a predicate function:

```tsx
expect(greeting).toHaveTextContent("Hello World");

expect(greeting).toHaveTextContent(/Hello/);

expect(greeting).toHaveTextContent(text => text.startsWith("Hello"));
```

## License

MIT, see [the LICENSE file](https://github.com/stackbuilders/assertive-ts/blob/main/packages/native/LICENSE).

## Contributing

Do you want to contribute to this project? Please take a look at our [contributing guidelines](https://github.com/stackbuilders/assertive-ts/blob/main/docs/CONTRIBUTING.md) to know how you can help us build it.

---

<img src="https://www.stackbuilders.com/media/images/Sb-supports.original.png" alt="Stack Builders" width="50%" />

[Check out our libraries](https://github.com/stackbuilders/) | [Join our team](https://www.stackbuilders.com/join-us/)
