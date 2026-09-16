import type { ReactElement } from "react";

export function DisabledTestComponent(): ReactElement {
  return (
    <div>
      <button data-testid="button-disabled" disabled={true}>{"Disabled"}</button>
      <button data-testid="button-enabled">{"Enabled"}</button>
      <input data-testid="input-disabled" disabled={true} />

      <div data-testid="div-disabled" {...{ disabled: true }}>{"Div Disabled"}</div>

      {/* @ts-expect-error - Custom element */}
      <custom-element data-testid="custom-disabled" disabled={true} />

      <fieldset data-testid="fieldset-disabled" disabled={true}>
        <button data-testid="fieldset-child-disabled">{"Disabled child"}</button>
        <legend>
          <button data-testid="fieldset-legend-first-child">{"Enabled child in first legend"}</button>
        </legend>
        <legend>
          <button data-testid="fieldset-legend-second-child-disabled">{"Disabled child in second legend"}</button>
        </legend>
        <div>
          <button data-testid="fieldset-nested-child-disabled">{"Nested disabled child"}</button>
        </div>
      </fieldset>
    </div>
  );
}
