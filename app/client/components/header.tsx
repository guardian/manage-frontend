import React from "react";
import palette from "../colours";
import { css } from "../styles/emotion";
import Nav from "./nav";
import Roundel from "./roundel";

const Header = () => (
  <header
    className={css({
      backgroundColor: palette.neutral.header,
      color: palette.neutral["1"],
      height: "2.8125rem",
      "border-bottom-width": "0.8px",
      "border-bottom-color": "rgba(0, 0, 0, 0.14)",
      "border-bottom-style": "solid"
    })}
  >
    <div
      className={css({
        "padding-left": "1.25rem",
        "padding-right": "1.25rem",
        "max-width": "71.25rem",
        margin: "auto",
        "font-size": "0.875rem",
        "line-height": "2.8125rem"
      })}
    >
      <Nav />
      <Roundel size={56} />
    </div>
  </header>
);

export default Header;
