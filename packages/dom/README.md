# Assertive.ts DOM

An Assertive.ts plugin that provides DOM-specific assertion Matchers.

## Requirements

- **@assertive-ts/core:** >=2.0.0

## Install

```sh
npm install --save-dev @assertive-ts/dom
```

Or:

```sh
yarn add --dev @assertive-ts/dom
```

## API Reference

You can find the full API reference [here](https://stackbuilders.github.io/assertive-ts/docs/dom/build/) 📚

## Usage

> **Plugin registration is pending.** The package's entry point (`src/main.ts`) does not export a plugin yet, so there is no `usePlugin(...)` setup to document. The matchers below are implemented in `ElementAssertion` and are documented here so the API is visible; the setup section will be added once the plugin export lands.

The matchers assert over DOM `Element` instances, like the ones returned by queries such as `document.querySelector` or [Testing Library](https://testing-library.com/docs/dom-testing-library/intro/). Every matcher supports `.not` and can be chained.

```ts
expect(element).toBeInTheDocument();

expect(element).toHaveClass("active");
```

### Presence and structure

```ts
expect(element).toBeInTheDocument();

expect(container).toContainElement(child);

expect(container).toContainHTML("<span>Hello</span>"); // a non-empty HTML string

expect(container).toBeEmpty(); // no child nodes, comments are ignored
```

### Attributes

```ts
expect(link).toHaveAttribute("href"); // the attribute is present

expect(link).toHaveAttribute("href", "/home"); // ...with this value
```

### Classes

```ts
expect(element).toHaveClass("active");

expect(element).toHaveAnyClass("primary", "secondary"); // at least one of them

expect(element).toHaveAllClasses("btn", "btn-primary"); // every one of them
```

### Style

Both matchers take a `Partial<CSSStyleDeclaration>`. `toHaveStyle` requires every given property to match, `toHaveSomeStyle` requires at least one:

```ts
expect(element).toHaveStyle({ display: "none", color: "red" });

expect(element).toHaveSomeStyle({ display: "none", color: "red" });
```

### State

```ts
expect(input).toHaveFocus();

expect(button).toBeEnabled();

expect(button).toBeDisabled(); // also true when an ancestor (e.g. a fieldset) is disabled

expect(checkbox).toBeChecked();

expect(checkbox).toBePartiallyChecked(); // an indeterminate checkbox or aria-checked="mixed"

expect(toggle).toBePressed(); // aria-pressed="true"

expect(toggle).toBePartiallyPressed(); // aria-pressed="mixed"
```

### Accessibility

`toHaveAccessibleDescription` accepts a string or a `RegExp`; with no argument it only checks that the element has a description:

```ts
expect(input).toHaveAccessibleDescription();

expect(input).toHaveAccessibleDescription("Your email address");

expect(input).toHaveAccessibleDescription(/email/i);
```

## License

MIT, see [the LICENSE file](https://github.com/stackbuilders/assertive-ts/blob/main/packages/dom/LICENSE).

## Contributing

Do you want to contribute to this project? Please take a look at our [contributing guidelines](https://github.com/stackbuilders/assertive-ts/blob/main/docs/CONTRIBUTING.md) to know how you can help us build it.

---

<img src="https://www.stackbuilders.com/media/images/Sb-supports.original.png" alt="Stack Builders" width="50%" />

[Check out our libraries](https://github.com/stackbuilders/) | [Join our team](https://www.stackbuilders.com/join-us/)
