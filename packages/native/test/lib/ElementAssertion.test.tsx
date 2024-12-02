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
      it("returns the assertion instance when is not editable", () => {
        const element = render(
            <TextInput testID="id" editable={false} />,
        );
        const test = new ElementAssertion(element.getByTestId("id"));
        expect(test.toBeDisabled()).toBe(test);
      });
      it("throws an error when it is editable", () => {
        const reactElement = render(<TextInput editable={true} testID="id" />);
        const test = new ElementAssertion(reactElement.getByTestId("id"));

        expect(() => test.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage('Received element <TextInput testID="id"... /> is enabled.');
      });
    });

    context("when the parent has property aria-disabled", () => {
      it("returns disable for parent and child element when aria-disabled=true", () => {
        const element = render(
            <View aria-disabled={true} testID="parentId">
              <View testID="childId">
                <TextInput />
              </View>
            </View>,
        );

        const parent = new ElementAssertion(element.getByTestId("parentId"));
        const child = new ElementAssertion(element.getByTestId("childId"));
        expect(parent.toBeDisabled()).toBeTruthy();
        expect(child.toBeDisabled()).toBeTruthy();
      });
      it("throws an error when aria-disabled=false", () => {
        const element = render(
            <View aria-disabled={false} testID="parentId">
              <View testID="childId">
                <TextInput />
              </View>
            </View>,
        );

        const parent = new ElementAssertion(element.getByTestId("parentId"));
        const child = new ElementAssertion(element.getByTestId("childId"));

        expect(parent.toBeEnabled()).toBeTruthy();
        expect(() => parent.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage('Received element <View testID="parentId"... /> is enabled.');
        expect(() => child.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage('Received element <View testID="childId"... /> is enabled.');
      });
    });

    context("when the child has property aria-disabled", () => {
      const element = render(
          <View testID="parentId">
            <View aria-disabled={true} testID="childId">
              <TextInput />
            </View>
          </View>,
      );

      const parent = new ElementAssertion(element.getByTestId("parentId"));
      const child = new ElementAssertion(element.getByTestId("childId"));

      it("returns disable for child element when aria-disabled=true", () => {
        expect(child.toBeDisabled()).toBeTruthy();
        expect(() => child.toBeEnabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Received element <View testID=\"childId\"... /> is disabled.");
      });
      it("returns enable for parent with disabled child", () => {
        expect(parent.toBeEnabled()).toBeTruthy();
        expect(() => parent.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Received element <View testID=\"parentId\"... /> is enabled.");

      });
    });
  });
});
