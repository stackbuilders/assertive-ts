import { ReactElement } from "react";

export function TestComponent(): ReactElement {
    return (
      <div>
        <button>click me</button>
      </div>
    );
  }

  export function ContainsTestComponent(): ReactElement {
    return (
      <span data-testid="grandparent">
        <span data-testid="parent">
          <span data-testid="child">
            <span>
                <span>
                    <span>
                        <span data-testid="deep-child"></span>
                    </span>
                </span>
            </span>
          </span>
        </span>
        <svg data-testid="svg-element"></svg>
      </span>
    );
  }
