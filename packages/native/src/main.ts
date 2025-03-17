import { Plugin } from "@assertive-ts/core";
import { ReactTestInstance } from "react-test-renderer";

import { ElementAssertion } from "./lib/ElementAssertion";

declare module "@assertive-ts/core" {

    export interface Expect {
      // eslint-disable-next-line @typescript-eslint/prefer-function-type
      (actual: ReactTestInstance): ElementAssertion;
    }
}

const ElementPlugin: Plugin<ReactTestInstance, ElementAssertion> = {
    Assertion: ElementAssertion,
    insertAt: "top",
    predicate: (actual): actual is ReactTestInstance =>
        typeof actual === "object"
        && actual !== null
        && "instance" in actual
        && typeof actual.instance === "object"
        && "type" in actual
        && typeof actual.type === "object"
        && "props" in actual
        && typeof actual.props === "object"
        && "parent" in actual
        && typeof actual.parent === "object"
        && "children" in actual
        && typeof actual.children === "object",
};

export const NativePlugin = [ElementPlugin];
