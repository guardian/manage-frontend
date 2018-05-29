import React from "react";
import palette from "../colours";
import { css } from "../styles/emotion";

const Footer = () => (
  <footer>
    <div
      css={{
        backgroundColor: palette.neutral.header,
        color: palette.neutral["1"],
        height: "42px",
        "text-align": "right"
      }}
    >
      <div
        css={{
          maxWidth: "71.25rem",
          margin: "auto",
          lineHeight: "42px",
          paddingRight: "2rem"
        }}
      >
        <a href={"#top"} css={{ color: palette.neutral["1"] }}>
          back to top
        </a>
      </div>
    </div>
    <div>
      <div
        css={{
          backgroundColor: "#333",
          color: "#bdbdbd",
          padding: "0.25rem",
          fontSize: "0.75rem"
        }}
      >
        <div
          css={{
            maxWidth: "71.25rem",
            margin: "auto"
          }}
        >
          © 2018 Guardian News and Media Limited or its affiliated companies.
          All&nbsp;rights&nbsp;reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
