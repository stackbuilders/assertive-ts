import { AssertionError, expect } from "@assertive-ts/core";
import { render } from "@testing-library/react-native";
import {
  View,
  TextInput,
} from "react-native";

import { ElementAssertion } from "../../src/lib/ElementAssertion";

describe("[Unit] ElementAssertion.test.ts", () => {
  describe(".toBeDisabled", () => {
    context("when the element is TextInput", () => {
      context("and the element is not editable", () => {
        it("returns the assertion instance", () => {
          const element = render(
              <TextInput testID="id" editable={false} />,
          );
          const test = new ElementAssertion(element.getByTestId("id"));
          expect(test.toBeDisabled()).toBe(test);
        });
      });

      context("and the element is editable", () => {
        it("throws an error", () => {
          const reactElement = render(<TextInput editable={true} testID="id" />);
          const test = new ElementAssertion(reactElement.getByTestId("id"));

          expect(() => test.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <TextInput ... /> to be disabled.");
        });
      });
    });

    context("when the parent has property aria-disabled", () => {
      context("if parent aria-disabled = true", () => {
        it("returns assertion instance for parent and child element", () => {
          const element = render(
            <View aria-disabled={true} testID="parentId">
              <View testID="childId">
                <TextInput />
              </View>
            </View>,
          );

          const parent = new ElementAssertion(element.getByTestId("parentId"));
          const child = new ElementAssertion(element.getByTestId("childId"));
          expect(parent.toBeDisabled()).toBe(parent);
          expect(child.toBeDisabled()).toBe(child);
        });
      });

      context("if parent aria-disabled = false", () => {
        it("throws an error for parent and child element", () => {
          const element = render(
            <View aria-disabled={false} testID="parentId">
              <View testID="childId">
                <TextInput />
              </View>
            </View>,
          );

          const parent = new ElementAssertion(element.getByTestId("parentId"));
          const child = new ElementAssertion(element.getByTestId("childId"));

          expect(parent.toBeEnabled()).toBeEqual(parent);
          expect(() => parent.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be disabled.");
          expect(() => child.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be disabled.");
        });
      });
    });

    context("when the element contains property aria-disabled", () => {
      const element = render(
        <View testID="parentId">
          <View aria-disabled={true} testID="childId">
            <TextInput />
          </View>
        </View>,
      );

      const parent = new ElementAssertion(element.getByTestId("parentId"));
      const child = new ElementAssertion(element.getByTestId("childId"));

      context("if child contains aria-disabled = true", () => {
        it("returns assertion instance for child element", () => {
          expect(child.toBeDisabled()).toBe(child);
          expect(() => child.toBeEnabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Received element <View ... /> not to be disabled.");
        });

        it("returns error for parent element", () => {
          expect(parent.toBeEnabled()).toBe(parent);
          expect(() => parent.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be disabled.");
        });
      });
    });
  });
});
