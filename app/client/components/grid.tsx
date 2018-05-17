import React from "react";
import { minWidth } from "../styles/breakpoints";
import { css } from "../styles/emotion";
import { cell, row, spanBreakpoints } from "../styles/grid";
export interface ContainerProps {
  readonly children: ReadonlyArray<JSX.Element> | JSX.Element;
}

export const Container: React.SFC<ContainerProps> = ({ children }) => (
  <div
    className={css({
      position: "relative",
      margin: "auto",
      ...spanBreakpoints({ mobile: 1, wide: 10 }, minWidth),
      ...row,
      ["&>*"]: cell
    })}
  >
    {children}
  </div>
);
