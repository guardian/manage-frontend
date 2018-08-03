import React from "react";
import palette from "../colours";
import { UserNav } from "./userNav";
import Roundel from "./roundel";

const Header = () => (
  <header
    css={{
      backgroundColor: palette.neutral.header,
      color: palette.neutral["1"],
      borderBottomWidth: "0.8px",
      borderBottomColor: "rgba(0, 0, 0, 0.14)",
      borderBottomStyle: "solid",
      padding: "0.15625rem 0 0",
      height: "2.8125rem",
      overflow: "visible",
      position: "relative",
      zIndex: 1070
    }}
  >
    <div
      css={{
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        maxWidth: "940px",
        margin: "auto",
        fontSize: "0.875rem",
        lineHeight: "2.8125rem",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <UserNav />
      <Roundel size={56} />
    </div>
  </header>
);

export default Header;
