import { ReactElement } from "react";

export function TestComponentElement(): ReactElement {
    return (
      <button role="button" type="submit" className="btn primary" disabled>
        click me
      </button>
    );
}
