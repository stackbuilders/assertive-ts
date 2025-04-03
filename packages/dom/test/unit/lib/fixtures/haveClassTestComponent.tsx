import { ReactElement } from "react";

export function HaveClassTestComponent(): ReactElement {
    return (
      <div data-testid="classTest">
        {"Test text inside a div"}
      </div>
    );
}
