import { palette } from "@guardian/src-foundations";
import React from "react";
import { minWidth } from "../styles/breakpoints";
import { Roundel } from "./svgs/roundel";
import { UserNav } from "./userNav";

const Header = () => (
  <header
    css={{
      backgroundColor: palette.brand.main,
      padding: "0.15625rem 0 0",
      minHeight: "50px",
      maxHeight: "50px",
      overflow: "visible",
      position: "relative",
      borderBottom: `solid 1px ${palette.brand.pastel}`,
      zIndex: 1070
    }}
  >
    <div
      css={{
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        maxWidth: "calc(940px + 2.5rem)",
        margin: "auto",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%"
      }}
    >
      <span
        css={{
          display: "none",
          color: "white",
          marginRight: "auto",
          [minWidth.desktop]: {
            display: "block"
          }
        }}
      >
        Hi there
      </span>
      <UserNav />
      <Roundel
        size={39}
        fillMain={palette.neutral["100"]}
        fillG={palette.brand.main}
      />
    </div>
  </header>
);

export default Header;
