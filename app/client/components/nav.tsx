import React from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { css } from "../styles/emotion";
import { serif } from "../styles/fonts";

const navCss = css({
  width: "100%",
  position: "relative",
  margin: 0,
  padding: 0,
  borderBottom: 0,
  listStyleType: "none",
  overflow: "hidden",
  zIndex: 2,
  background: "#fafafa",
  tableLayout: "fixed",
  gridTemplateColumns: "repeat(auto-fit, minmax(40%, 1fr))",
  gridColumnGap: "0.125rem",
  display: "grid",

  [minWidth.desktop]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(7.5rem, 1fr))"
  }
});

const navLinkCss = (local: boolean | undefined) =>
  css({
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.25rem",
    fontFamily: serif,
    display: "block",
    boxSizing: "border-box",
    minHeight: "35px",
    padding: "4px 6px 0",
    textAlign: "left",
    textDecoration: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    background: local ? palette.white : palette.neutral["6"],
    color: "inherit"
  });

const navItemCss = (local: boolean | undefined) =>
  css({
    margin: 0,
    borderBottom: `0.0625rem solid ${
      local ? palette.white : palette.neutral["5"]
    }`,
    borderTop: `0.1875rem solid ${palette.neutral["6"]}`,
    display: "table-cell",
    width: "100%"
  });

export interface NavItem {
  title: string;
  link: string;
  local?: boolean;
}

const navLinks: NavItem[] = [
  {
    title: "Public profile",
    link: "/public/edit"
  },
  {
    title: "Account details",
    link: "/account/edit"
  },
  {
    title: "Membership",
    link: "/",
    local: true
  },
  {
    title: "Digital Pack",
    link: "/digitalpack/edit"
  },
  {
    title: "Contributions",
    link: "/contribution/recurring/edit"
  },
  {
    title: "Emails & marketing",
    link: "/email-prefs"
  }
];

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

const profileHostName = `https://profile.${domain}`;

export const Nav = () => (
  <ul role="tablist" className={navCss}>
    {navLinks.map(({ title, link, local }) => (
      <li className={navItemCss(local)} key={title}>
        <a
          className={navLinkCss(local)}
          href={`${local ? "" : profileHostName}${link}`}
        >
          {title}
        </a>
      </li>
    ))}
  </ul>
);
