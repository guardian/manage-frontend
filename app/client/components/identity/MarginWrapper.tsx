import React, { FC } from "react";
import { minWidth } from "../../styles/breakpoints";

export const MarginWrapper: FC<{}> = ({ children }) => {
  return (
    <div
      css={{
        boxSizing: "border-box",
        margin: "0 auto",
        maxWidth: "620px",
        [minWidth.desktop]: {
          maxWidth: "100%"
        }
      }}
    >
      {children}
    </div>
  );
};
