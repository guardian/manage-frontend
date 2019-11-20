import { breakpoints, palette } from "@guardian/src-foundations";
import React from "react";
import { minWidth } from "../styles/breakpoints";
import { gridBase, gridItemPlacement } from "../styles/grid";
import { Roundel } from "./svgs/roundel";
import { UserNav } from "./userNav";

const Header = () => (
  <header
    css={{
      backgroundColor: palette.brand.main,
      padding: "0.15625rem 0 0",
      minHeight: "50px",
      overflow: "visible",
      position: "relative",
      borderBottom: `solid 1px ${palette.brand.pastel}`,
      zIndex: 1070,
      [minWidth.desktop]: {
        minHeight: "82px"
      }
    }}
  >
    <div
      css={{
        ...gridBase,
        maxWidth: `calc(${breakpoints.wide}px + 2.5rem)`,
        alignItems: "center",
        margin: "auto"
      }}
    >
      <h1
        css={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          color: "white",
          display: "none",
          [minWidth.desktop]: {
            display: "block",
            ...gridItemPlacement(1, 8)
          }
        }}
      >
        My account
      </h1>
      <UserNav />
      <Roundel fillMain={palette.neutral["100"]} fillG={palette.brand.main} />
    </div>
  </header>
);

export default Header;
