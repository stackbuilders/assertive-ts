import { AssertionError, expect } from "@assertive-ts/core";
import { render } from "@testing-library/react-native";
import { View, Text } from "react-native";

import { ToBeEmptyAssertion } from "../../src/lib/ToBeEmptyAssertion";

describe("[Unit] toBeEmptyAssertion.test.ts", () => {
  describe(".toBeEmpty", () => {
    context("when the element is empty", () => {
      it("returns the assertion instance", () => {
        const element = render(<View testID="id" />);
        const test = new ToBeEmptyAssertion(element.getByTestId("id"));

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
        const test = new ToBeEmptyAssertion(element.getByTestId("id"));

        expect(test.not.toBeEmpty()).toBeEqual(test);
        expect(() => test.toBeEmpty())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> to be empty.");
      });
    });
  });
});
