import { Assertion, AssertionError } from "@assertive-ts/core";
import { ReactTestInstance } from "react-test-renderer";

// Elements that support 'disabled'
const DISABLE_TYPES = [
    "Button",
    "Slider",
    "Switch",
    "Text",
    "TouchableHighlight",
    "TouchableOpacity",
    "TouchableWithoutFeedback",
    "TouchableNativeFeedback",
    "View",
    "TextInput",
    "Pressable",
  ];
export class ElementAssertion extends Assertion<ReactTestInstance> {
    public constructor(actual: ReactTestInstance) {
        super(actual);
    }

    public toBeDisabled(): this {
        const error = new AssertionError({
            actual: this.actual,
            message: `Expected <${this.actual}> to be disabled`,
          });
          const invertedError = new AssertionError({
            actual: this.actual,
            message: "Expected the value NOT to be empty",
          });

          return this.execute({
            assertWhen: this.isElementDisabled(this.actual) || this.isAncestorDisabled(this.actual),
            error,
            invertedError,
          });
    }

    private isElementDisabled(element: ReactTestInstance): boolean {
        if (this.getType(element) === "TextInput" && element?.props?.editable === false) {
          return true;
        }

        if (!DISABLE_TYPES.includes(this.getType(element))) {
          return false;
        }

        return (
          !!element?.props?.disabled ||
          !!element?.props?.accessibilityState?.disabled ||
          !!element?.props?.accessibilityStates?.includes("disabled")
        );
      }

    private isAncestorDisabled(element: ReactTestInstance): boolean {
        const parent = element.parent;
        return parent !== null && (this.isElementDisabled(element) || this.isAncestorDisabled(parent));
      }
    private getType({ type }: ReactTestInstance): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return type.displayName || type.name || type;
      }

}
