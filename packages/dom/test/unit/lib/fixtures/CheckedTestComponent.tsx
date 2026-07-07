import type { ReactElement } from "react";

export function CheckedTestComponent(): ReactElement {
  return (
    <div>
      {/* Native checkbox variants */}
      <input data-testid="checkbox-checked" type="checkbox" defaultChecked />
      <input data-testid="checkbox-unchecked" type="checkbox" />

      {/* Native radio variants */}
      <input data-testid="radio-checked" type="radio" defaultChecked />
      <input data-testid="radio-unchecked" type="radio" />

      {/* ARIA checkbox variants */}
      <div data-testid="aria-checkbox-checked" role="checkbox" aria-checked="true">{"Checked"}</div>
      <div data-testid="aria-checkbox-unchecked" role="checkbox" aria-checked="false">{"Unchecked"}</div>
      <div data-testid="aria-checkbox-mixed" role="checkbox" aria-checked="mixed">{"Mixed"}</div>

      {/* ARIA radio variants */}
      <div data-testid="aria-radio-checked" role="radio" aria-checked="true">{"Checked"}</div>
      <div data-testid="aria-radio-unchecked" role="radio" aria-checked="false">{"Unchecked"}</div>

      {/* ARIA switch variants */}
      <div data-testid="aria-switch-checked" role="switch" aria-checked="true">{"On"}</div>
      <div data-testid="aria-switch-unchecked" role="switch" aria-checked="false">{"Off"}</div>

      {/* Element for indeterminate test (set programmatically in test) */}
      <input data-testid="checkbox-indeterminate" type="checkbox" />

      {/* Invalid elements */}
      <div data-testid="non-checkable-element">{"Not checkable"}</div>
    </div>
  );
}
