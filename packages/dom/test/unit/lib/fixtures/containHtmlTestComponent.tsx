import { ReactElement } from "react";

export function ContainHtmlTestComponent(): ReactElement {
  return (
    <div data-testid="container">
      <span data-testid="child-span">Hello World</span>
      <div className="nested">
        <p>Nested content</p>
      </div>
    </div>
  );
}
