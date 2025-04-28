import { ReactElement } from "react";

export function HaveClassTestComponent({ className }: { className?: string; }): ReactElement {
  return (
    <div className={className}>
      {"Test text inside a div"}
    </div>
  );
}
