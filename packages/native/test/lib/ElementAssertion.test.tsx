import { render } from "@testing-library/react-native";
import { TextInput, View } from "react-native";

import { ElementAssertion } from "../../src/lib/ElementAssertion";

import assert, { AssertionError } from "assert";

describe("[Unit] ElementAssertion.test.ts", () => {
    describe(".toBeDisabled", () => {
      context("when the component is disabled", () => {
        it("returns the assertion instance", () => {
          const element = render(
            <View disabled={true} testID="id">
              <TextInput />
            </View>,
          );
          const test = new ElementAssertion(element.getByTestId("id"));

          assert.deepStrictEqual(test.toBeDisabled(), test);
          assert.throws(() => test.not.toBeDisabled(), {
            message: "Expected the value NOT to be disabled",
            name: AssertionError.name,
          });
        });
      });
    });
  });
