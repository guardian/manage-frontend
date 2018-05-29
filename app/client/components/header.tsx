import React from "react";
import palette from "../colours";
import { css } from "../styles/emotion";
import Nav from "./nav";
import Roundel from "./roundel";

const Header = () => (
  <header
    css={{
      backgroundColor: palette.neutral.header,
      color: palette.neutral["1"],
      height: "2.8125rem",
      borderBottomWidth: "0.8px",
      borderBottomColor: "rgba(0, 0, 0, 0.14)",
      borderBottomStyle: "solid"
    }}
  >
    <div
      css={{
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        maxWidth: "71.25rem",
        margin: "auto",
        fontSize: "0.875rem",
        lineHeight: "2.8125rem"
      }}
    >
      <Nav />
      <Roundel size={56} />
    </div>
  </header>
);

export default Header;
