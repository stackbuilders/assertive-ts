import { ReactElement } from "react";

export function FocusTestComponent(): ReactElement {
  return (
    <div>
      <input data-testid="input1" />
      <input data-testid="input2" />
    </div>
  );
}
