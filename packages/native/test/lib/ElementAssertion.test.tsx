import { AssertionError, expect } from "@assertive-ts/core";
import { render } from "@testing-library/react-native";
import {
  View,
  TextInput,
} from "react-native";

import { ElementAssertion } from "../../src/lib/ElementAssertion";

describe("[Unit] ElementAssertion.test.ts", () => {
    describe(".toBeDisabled", () => {
      it("returns the assertion instance when the component TextInput is not editable", () => {
        const element = render(
          <TextInput testID="id" editable={false} />,
        );
        const test = new ElementAssertion(element.getByTestId("id"));

        expect(test.toBeDisabled()).toBe(test);
        expect(() => test.not.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected the value NOT to be disabled");
      });

      it("checks aria-disabled prop for parent and child element", () => {
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
        expect(() => parent.not.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected the value NOT to be disabled");
        expect(() => child.not.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected the value NOT to be disabled");

      });

      it("checks aria-disabled prop for child element", () => {
        const element = render(
            <View testID="parentId">
              <View aria-disabled={true} testID="childId">
                <TextInput />
              </View>
            </View>,
        );

        const parent = new ElementAssertion(element.getByTestId("parentId"));
        const child = new ElementAssertion(element.getByTestId("childId"));

        expect(child.toBeDisabled()).toBeTruthy();
        expect(parent.not.toBeDisabled()).toBeTruthy();
        expect(() => child.not.toBeDisabled())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected the value NOT to be disabled");

      });
    });
  });
