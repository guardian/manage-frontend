import React from "react";
import palette from "../colours";
import { Roundel } from "./svgs/roundel";
import { UserNav } from "./userNav";

const Header = () => (
  <header
    css={{
      backgroundColor: palette.blue.header,
      padding: "0.15625rem 0 0",
      minHeight: "48px",
      maxHeight: "48px",
      overflow: "visible",
      position: "relative",
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
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%"
      }}
    >
      <UserNav />
      <Roundel size={42} fillMain={palette.white} fillG={palette.blue.header} />
    </div>
  </header>
);

export default Header;
