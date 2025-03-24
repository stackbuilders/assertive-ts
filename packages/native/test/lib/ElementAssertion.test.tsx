import { AssertionError, expect } from "@assertive-ts/core";
import { fireEvent, render } from "@testing-library/react-native";
import { useState, useCallback, ReactElement } from "react";
import {
  View,
  TextInput,
  Text,
  Modal,
  Button,
} from "react-native";

import { ElementAssertion } from "../../src/lib/ElementAssertion";

function SimpleToggleText(): ReactElement {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = useCallback((): void => {
    setIsVisible(prev => !prev);
  }, []);

  return (
    <View>
      <Text style={{ display: isVisible ? "flex" : "none" }}>
        {"Toggle me!"}
      </Text>
      <Button
        title="Toggle Text"
        onPress={handleToggle}
      />
    </View>
  );
}

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

  describe (".toBeVisible", () => {
    context("when the modal is visible", () => {
      it("returns the assertion instance", () => {
        const { getByTestId } = render(
          <Modal testID="id" visible={true} />,
        );
        const test = new ElementAssertion(getByTestId("id"));

        expect(test.toBeVisible()).toBe(test);
        expect(() => test.not.toBeVisible())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <Modal ... /> NOT to be visible.");
      });
    });

    context("when the element contains 'display' property", () => {
      context("and display = none", () => {
        it("throws an error", () => {
          const { getByText, getByRole } = render(
            <SimpleToggleText />,
          );
          const textElement = new ElementAssertion(getByText("Toggle me!"));

          expect(textElement.toBeVisible()).toBeEqual(textElement);

          const toggleButton = getByRole("button", { name: "Toggle Text" });
          fireEvent.press(toggleButton);

          expect(textElement.not.toBeVisible()).toBeEqual(textElement);
        });
      });

      context("and display = flex", () => {
        it("returns the assertion instance", () => {
          const { getByTestId } = render(
            <View testID="id" style={{ display: "flex" }} />,
          );
          const test = new ElementAssertion(getByTestId("id"));

          expect(test.toBeVisible()).toBe(test);
          expect(() => test.not.toBeVisible())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> NOT to be visible.");
        });
      });
    });

    context("when the element contains 'accessibilityElementsHidden' property", () => {
      it("returns the assertion instance", () => {
        const { getByTestId } = render(
          <View testID="id" accessibilityElementsHidden={false} />,
        );
        const test = new ElementAssertion(getByTestId("id"));

        expect(test.toBeVisible()).toBe(test);
        expect(() => test.not.toBeVisible())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> NOT to be visible.");
      });
    });

    context("when the element contains 'importantForAccessibility' property", () => {
      it("returns the assertion instance", () => {
        const { getByTestId } = render(
          <View testID="id" importantForAccessibility={"yes"} />,
        );
        const test = new ElementAssertion(getByTestId("id"));

        expect(test.toBeVisible()).toBe(test);
        expect(() => test.not.toBeVisible())
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> NOT to be visible.");
      });
    });

    context("when the parent element contains 'opacity' property", () => {
      context("and parent opacity = 0", () => {
        const { getByTestId } = render(
          <View testID="parentId" style={{ opacity: 0 }} >
            <View testID="childId" style={{ opacity: 1 }} />
          </View>,
        );

        const parent = new ElementAssertion(getByTestId("parentId"));
        const child = new ElementAssertion(getByTestId("childId"));

        it("returns assertion instance for NOT visible elements", () => {
          expect(parent.not.toBeVisible()).toBeEqual(parent);
          expect(child.not.toBeVisible()).toBeEqual(child);
        });

        it("throws an error for visible elements", () => {
          expect(() => parent.toBeVisible())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be visible.");
          expect(() => child.toBeVisible())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be visible.");
        });
      });

      context("and child opacity = 0", () => {
        const { getByTestId } = render(
          <View testID="parentId" style={{ opacity: 1 }} >
            <View testID="childId" style={{ opacity: 0 }} />
          </View>,
        );

        const parent = new ElementAssertion(getByTestId("parentId"));
        const child = new ElementAssertion(getByTestId("childId"));

        it("returns assertion instance for visible parent and NOT visible child", () => {
          expect(parent.toBeVisible()).toBeEqual(parent);
          expect(child.not.toBeVisible()).toBeEqual(child);
        });

        it("throws an error for NOT visible parent and visible child", () => {
          expect(() => parent.not.toBeVisible())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> NOT to be visible.");
          expect(() => child.toBeVisible())
            .toThrowError(AssertionError)
            .toHaveMessage("Expected element <View ... /> to be visible.");
        });
      });
    });
  });

  describe (".toContainElement", () => {
    const element = render(
      <View testID="grandParentId">
        <View testID="parentId">
          <View testID="childId" />
        </View>
        <Text testID="textId" />
      </View>,
    );

    const container = element.getByTestId("grandParentId");
    const containerElementAssertion = new ElementAssertion(container);
    const parent = element.getByTestId("parentId");
    const parentElementAssertion = new ElementAssertion(parent);
    const child = element.getByTestId("childId");
    const text = element.getByTestId("textId");

    context("when the container element contains the target element", () => {
      it("returns the assertion instance", () => {
        expect(containerElementAssertion.toContainElement(parent)).toBe(containerElementAssertion);
        expect(containerElementAssertion.toContainElement(child)).toBe(containerElementAssertion);
        expect(containerElementAssertion.toContainElement(text)).toBe(containerElementAssertion);
        expect(parentElementAssertion.toContainElement(child)).toBe(parentElementAssertion);
      });

      it("returns the assertion instance for negated assertions when the target element is not contained", () => {
        expect(parentElementAssertion.not.toContainElement(text)).toBe(parentElementAssertion);
        expect(parentElementAssertion.not.toContainElement(container)).toBe(parentElementAssertion);
      });
    });

    context("when the container element does NOT contain the target element", () => {
      it("throws an error", () => {
        expect(() => containerElementAssertion.not.toContainElement(parent))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> NOT to contain element <View ... />.");
        expect(() => containerElementAssertion.not.toContainElement(text))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> NOT to contain element <Text ... />.");
        expect(() => parentElementAssertion.toContainElement(text))
          .toThrowError(AssertionError)
          .toHaveMessage("Expected element <View ... /> to contain element <Text ... />.");
      });
    });
  });
});
