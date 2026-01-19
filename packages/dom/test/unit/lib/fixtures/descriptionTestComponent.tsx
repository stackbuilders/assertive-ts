import { ReactElement } from "react";

export function DescriptionTestComponent(): ReactElement {
  return (
    <div>
      <div id="description-1">{"This is a description"}</div>
      <div id="description-2">{"Additional info"}</div>
      <div id="description-3">{"More details here"}</div>

      <button aria-describedby="description-1" data-testid="button-single">
        {"Button with single description"}
      </button>

      <button aria-describedby="description-1 description-2" data-testid="button-multiple">
        {"Button with multiple descriptions"}
      </button>

      <button data-testid="button-no-description">
        {"Button without description"}
      </button>

      <input
        type="text"
        aria-describedby="description-3"
        data-testid="input-with-description"
      />
    </div>
  );
}
