import React from "react";
import palette from "../colours";
import Roundel from "./roundel";
import { UserNav } from "./userNav";

const Header = () => (
  <header
    css={{
      backgroundColor: palette.neutral["7"],
      color: palette.neutral["1"],
      borderBottomWidth: "0.8px",
      borderBottomColor: "rgba(0, 0, 0, 0.14)",
      borderBottomStyle: "solid",
      padding: "0.15625rem 0 0",
      height: "47.5px",
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
        fontSize: "0.875rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%"
      }}
    >
      <UserNav />
      <Roundel size={56} />
    </div>
  </header>
);

export default Header;
