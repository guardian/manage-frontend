import React from "react";
import palette from "../colours";
import { css } from "../styles/emotion";

const backToTopArrow = css({
  position: "absolute",
  top: "0.375rem",
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  border: "0.125rem solid #ffffff",
  borderBottom: 0,
  borderRight: 0,
  height: "0.7rem",
  width: "0.7rem",
  transform: "rotate(45deg)"
});

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
          paddingRight: "2rem",
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <a
          href={"#top"}
          css={{
            color: palette.neutral["1"],
            display: "flex"
          }}
        >
          back to top
          <span
            css={{
              display: "inline-block",
              backgroundColor: palette.neutral["1"],
              height: "48px",
              minWidth: "48px",
              position: "relative",
              borderRadius: "50%",
              marginLeft: "10px",
              transform: "translateY(-6px)"
            }}
          >
            <i className={backToTopArrow} />
          </span>
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
