import { AssertionError, expect } from "@assertive-ts/core";
import { render } from "@testing-library/react-native";
import { View, Text } from "react-native";

import { ToBeEmptyElementAssertion } from "../../src/lib/ToBeEmptyElementAssertion";

describe("[Unit] ToBeEmptyElementAssertion.test.ts", () => {
  describe(".toBeEmptyElement", () => {
    context("when the element is empty", () => {
      it("returns the assertion instance", () => {
        const element = render(<View testID="id" />);
        const test = new ToBeEmptyElementAssertion(element.getByTestId("id"));

        expect(test.toBeEmptyElement()).toBe(test);
        expect(() => test.not.toBeEmptyElement())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> to NOT be empty.");
      });
    });

    context("when the element is NOT empty", () => {
      it("throws an error", () => {
        const element = render(
          <View testID="id">
            <Text>{"Not empty"}</Text>
          </View>,
        );
        const test = new ToBeEmptyElementAssertion(element.getByTestId("id"));

        expect(test.not.toBeEmptyElement()).toBeEqual(test);
        expect(() => test.toBeEmptyElement())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> to be empty.");
      });
    });
  });
});
