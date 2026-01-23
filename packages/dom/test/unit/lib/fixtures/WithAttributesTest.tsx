import type { ReactElement } from "react";

export function WithAttributesTest(): ReactElement {
  return (
    <button role="button" type="submit" className="btn primary" disabled={true}>
      {"click me"}
    </button>
  );
}
