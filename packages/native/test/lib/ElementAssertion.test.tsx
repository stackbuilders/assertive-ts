import { AssertionError, expect } from "@assertive-ts/core";
import { render } from "@testing-library/react-native";
import {
  View,
  TextInput,
  Text,
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
          expect(test.not.toBeEnabled()).toBeEqual(test);
          expect(() => test.toBeEnabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <TextInput ... /> to be enabled.");
        });
      });

      context("and the element is editable", () => {
        it("throws an error", () => {
          const reactElement = render(<TextInput editable={true} testID="id" />);
          const test = new ElementAssertion(reactElement.getByTestId("id"));

          expect(() => test.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <TextInput ... /> to be disabled.");
          expect(() => test.not.toBeEnabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <TextInput ... /> NOT to be enabled.");
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
          expect(() => parent.toBeEnabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be enabled.");
          expect(() => parent.not.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> NOT to be disabled.");
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
          expect(parent.not.toBeDisabled()).toBeEqual(parent);
          expect(() => parent.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be disabled.");
          expect(() => parent.not.toBeEnabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> NOT to be enabled.");
          expect(() => child.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be disabled.");
          expect(() => child.not.toBeEnabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> NOT to be enabled.");
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
            .toHaveMessage("Expected element <View ... /> to be enabled.");
          expect(() => child.not.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> NOT to be disabled.");
        });

        it("returns error for parent element", () => {
          expect(parent.toBeEnabled()).toBeEqual(parent);
          expect(() => parent.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be disabled.");
          expect(() => parent.not.toBeEnabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> NOT to be enabled.");
        });
      });
    });
  });

  describe(".toBeEmpty", () => {
    context("when the element is empty", () => {
      it("returns the assertion instance", () => {
        const element = render(<View testID="id" />);
        const test = new ElementAssertion(element.getByTestId("id"));

        expect(test.toBeEmpty()).toBe(test);
        expect(() => test.not.toBeEmpty())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> NOT to be empty.");
      });
    });

    context("when the element is NOT empty", () => {
      it("throws an error", () => {
        const element = render(
          <View testID="id">
            <Text>{"Not empty"}</Text>
          </View>,
        );
        const test = new ElementAssertion(element.getByTestId("id"));

        expect(test.not.toBeEmpty()).toBeEqual(test);
        expect(() => test.toBeEmpty())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> to be empty.");
      });
    });
  });
});
