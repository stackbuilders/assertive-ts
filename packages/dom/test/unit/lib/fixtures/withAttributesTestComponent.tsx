import { ReactElement } from "react";

export function WithAttributesTestComponent(): ReactElement {
    return (
      <button role="button" type="submit" className="btn primary" disabled={true}>
        {"click me"}
      </button>
    );
}
