import { Assertion } from "@assertive-ts/core";
import { ReactTestInstance } from "react-test-renderer";

export class ElementAssertion extends Assertion<ReactTestInstance> {
    public constructor(actual: ReactTestInstance) {
        super(actual);
    }

}
