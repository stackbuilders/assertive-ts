import { expect } from "@assertive-ts/core";

import { instanceToString, isElementContained, isEmpty } from "../../../src/lib/helpers/utils";

import type { ReactTestInstance } from "react-test-renderer";

describe("[Unit] utils.test.ts", () => {
  describe(".isEmpty", () => {
    context("when the value is falsy", () => {
      it("returns true", () => {
        expect(isEmpty(undefined)).toBeTrue();
        expect(isEmpty(null)).toBeTrue();
        expect(isEmpty("")).toBeTrue();
      });
    });

    context("when the value is an array", () => {
      it("returns true only if it has no items", () => {
        expect(isEmpty([])).toBeTrue();
        expect(isEmpty([1])).toBeFalse();
      });
    });

    context("when the value is any other truthy value", () => {
      it("returns false", () => {
        expect(isEmpty("text")).toBeFalse();
        expect(isEmpty({})).toBeFalse();
      });
    });
  });

  describe(".instanceToString", () => {
    context("when the instance is null", () => {
      it("returns \"null\"", () => {
        expect(instanceToString(null)).toBeEqual("null");
      });
    });

    context("when the instance has a type", () => {
      it("returns a tag with the type name", () => {
        const instance = { type: "View" } as unknown as ReactTestInstance;

        expect(instanceToString(instance)).toBeEqual("<View ... />");
      });
    });
  });

  describe(".isElementContained", () => {
    const element = { findAll: () => [] } as unknown as ReactTestInstance;

    context("when the parent is null", () => {
      it("returns false", () => {
        expect(isElementContained(null as unknown as ReactTestInstance, element)).toBeFalse();
      });
    });

    context("when the child is null", () => {
      it("returns false", () => {
        expect(isElementContained(element, null as unknown as ReactTestInstance)).toBeFalse();
      });
    });
  });
});
