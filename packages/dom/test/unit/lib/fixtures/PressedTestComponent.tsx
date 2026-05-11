import type { ReactElement } from "react";

export function PressedTestComponent(): ReactElement {
  return (
    <div>
      {/* <button> variants */}
      <button data-testid="button-pressed" aria-pressed="true">Pressed</button>
      <button data-testid="button-not-pressed" aria-pressed="false">Not pressed</button>
      <button data-testid="button-mixed" aria-pressed="mixed">Mixed</button>
      <button data-testid="button-no-aria-pressed">No aria-pressed</button>

      {/* <input type="button"> variants */}
      <input data-testid="input-button-pressed" type="button" aria-pressed="true" />
      <input data-testid="input-button-not-pressed" type="button" aria-pressed="false" />
      <input data-testid="input-button-mixed" type="button" aria-pressed="mixed" />

      {/* role="button" variants */}
      <div data-testid="role-button-pressed" role="button" aria-pressed="true">Pressed</div>
      <div data-testid="role-button-not-pressed" role="button" aria-pressed="false">Not pressed</div>
      <div data-testid="role-button-mixed" role="button" aria-pressed="mixed">Mixed</div>

      {/* invalid element – no button role/tag */}
      <div data-testid="non-button-element" aria-pressed="true">Not a button</div>
    </div>
  );
}
