import { expect } from "@assertive-ts/core";

import { getTextContent, textMatches } from "../../../src/lib/helpers/text";

import type { ReactTestInstance } from "react-test-renderer";

function fakeInstance(props: Record<string, unknown>, children?: unknown): ReactTestInstance {
  return { children, props } as unknown as ReactTestInstance;
}

describe("[Unit] text.test.ts", () => {
  describe(".getTextContent", () => {
    context("when the element is missing", () => {
      it("returns an empty string", () => {
        expect(getTextContent(null as unknown as ReactTestInstance)).toBeEqual("");
      });
    });

    context("when the element is a string", () => {
      it("returns the string itself", () => {
        expect(getTextContent("hello" as unknown as ReactTestInstance)).toBeEqual("hello");
      });
    });

    context("when the element has a string value prop", () => {
      it("returns the value", () => {
        expect(getTextContent(fakeInstance({ value: "typed" }))).toBeEqual("typed");
      });
    });

    context("when the element has nested children", () => {
      it("joins the text of every child", () => {
        const element = fakeInstance({
          children: [
            "first",
            fakeInstance({ value: "second" }),
            fakeInstance({ children: "third" }),
            fakeInstance({}, [fakeInstance({ children: ["fourth", "fifth"] })]),
            ["sixth", ["seventh"]],
            fakeInstance({}),
            42,
          ],
        });

        expect(getTextContent(element)).toBeEqual("first second third fourth fifth sixth seventh");
      });
    });
  });

  describe(".textMatches", () => {
    context("when the matcher is a string", () => {
      it("checks for a substring", () => {
        expect(textMatches("hello world", "lo wo")).toBeTrue();
        expect(textMatches("hello world", "bye")).toBeFalse();
      });
    });

    context("when the matcher is a RegExp", () => {
      it("tests the pattern", () => {
        expect(textMatches("hello world", /^hello/)).toBeTrue();
        expect(textMatches("hello world", /^world/)).toBeFalse();
      });
    });

    context("when the matcher is a function", () => {
      it("calls the function with the text", () => {
        expect(textMatches("hello", text => text.length === 5)).toBeTrue();
        expect(textMatches("hello", text => text.length === 4)).toBeFalse();
      });
    });

    context("when the matcher is of an unsupported type", () => {
      it("throws an error", () => {
        expect(() => textMatches("hello", 42 as unknown as string))
          .toThrowError(Error)
          .toHaveMessage("Matcher must be a string, RegExp, or function.");
      });
    });
  });
});
