import { render } from "@testing-library/react-native";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  View,
  TextInput,
  Pressable,
} from "react-native";

import { ElementAssertion } from "../../src/lib/ElementAssertion";

import assert, { AssertionError } from "assert";

const ALLOWED_COMPONENTS = {
  Pressable,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
};

describe("[Unit] ElementAssertion.test.ts", () => {
    describe(".toBeDisabled", () => {
      context("when the component TextInput is disabled", () => {
        it("returns the assertion instance", () => {
          const element = render(
            <TextInput testID="id" editable={false} />,
          );
          const test = new ElementAssertion(element.getByTestId("id"));

          assert.deepStrictEqual(test.toBeDisabled(), test);
          assert.throws(() => test.not.toBeDisabled(), {
            message: "Expected the value NOT to be disabled",
            name: AssertionError.name,
          });
        });
      });

      Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
        it(`handle disabled prop for element ${name}`, () => {
          const element = render(
              // @ts-expect-error JSX element 'Component'
              <Component disabled={true} testID={name}>
                <TextInput />
              </Component>,
          );
          const test = new ElementAssertion(element.getByTestId(name));
          assert.deepStrictEqual(test.toBeDisabled(), test);
          assert.throws(() => test.not.toBeDisabled(), {
            message: "Expected the value NOT to be disabled",
            name: AssertionError.name,
          });
        });
      });
    });
  });
