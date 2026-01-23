import type { ReactElement } from "react";

interface HaveClassTestComponentProps {
  className?: string;
}

export function HaveClassTest({ className }: HaveClassTestComponentProps): ReactElement {
  return (
    <div className={className}>
      {"Test text inside a div"}
    </div>
  );
}
