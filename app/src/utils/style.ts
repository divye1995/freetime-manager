import { CSSProperties } from "react";

export const OnActiveClass =
  (className: string) =>
  ({ isActive }: { isActive: boolean }): CSSProperties =>
    (isActive ? className : "") as CSSProperties;
