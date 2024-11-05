import { ReactElement } from "react";

export function NestedElementsTestComponent(): ReactElement {
  return (
    <span data-testid="grandparent">
      <span data-testid="parent">
        <span data-testid="child">
          <span>
            <span>
              <span>
                <span data-testid="deep-child" />
              </span>
            </span>
          </span>
        </span>
      </span>
      <svg data-testid="svg-element" />
    </span>
  );
}
