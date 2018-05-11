import React from "react";
import palette from "../colours";
import { css } from "../styles/emotion";

const Footer = () => (
  <footer>
    <div
      className={css({
        backgroundColor: palette.neutral.header,
        color: palette.neutral["1"],
        height: "42px",
        "text-align": "right"
      })}
    >
      <div
        className={css({
          "max-width": "71.25rem",
          margin: "auto",
          "line-height": "42px",
          "padding-right": "2rem"
        })}
      >
        <a href={"#top"} className={css({ color: palette.neutral["1"] })}>
          back to top
        </a>
      </div>
    </div>
    <div>
      <div
        className={css({
          backgroundColor: "#333",
          color: "#bdbdbd",
          padding: "0.25rem",
          "font-size": "0.75rem"
        })}
      >
        <div
          className={css({
            "max-width": "71.25rem",
            margin: "auto"
          })}
        >
          © 2018 Guardian News and Media Limited or its affiliated companies.
          All&nbsp;rights&nbsp;reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
