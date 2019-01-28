import React from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { css } from "../styles/emotion";
import { serif } from "../styles/fonts";

const borderStyle = `1px solid ${palette.neutral["5"]}`;

const navCss = css({
  width: "100%",
  position: "relative",
  margin: 0,
  padding: 0,
  borderBottom: 0,
  listStyleType: "none",
  zIndex: 2,
  tableLayout: "fixed",
  gridTemplateColumns: "repeat(auto-fit, minmax(40%, 1fr))",
  display: "grid",
  borderRight: borderStyle,

  [minWidth.desktop]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(7.5rem, 1fr))"
  }
});

const navLinkCss = (isSelected: boolean | undefined) =>
  css({
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.25rem",
    fontFamily: serif,
    display: "block",
    boxSizing: "border-box",
    minHeight: "36px",
    padding: "4px 0 0 5px",
    letterSpacing: "-0.02rem",
    textAlign: "left",
    textDecoration: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    background: isSelected ? palette.white : undefined,
    color: "inherit",

    [minWidth.desktop]: {
      boxShadow: isSelected ? "0 1px 0 white" : undefined
    }
  });

const navItemCss = (isSelected: boolean | undefined) =>
  css({
    margin: 0,
    background: `0.0625rem solid ${
      isSelected ? palette.white : palette.neutral["5"]
    }`,
    borderLeft: borderStyle,
    borderTop: borderStyle,
    display: "table-cell",
    width: "100%",
    [minWidth.tablet]: {
      minWidth: "155.5px" // gross hack to make IE11 work
    }
  });

export interface NavItem {
  title: string;
  link: string;
  local?: boolean;
}

export interface NavLinks {
  publicProfile: NavItem;
  accountDetails: NavItem;
  membership: NavItem;
  subscriptions: NavItem;
  contributions: NavItem;
  emailPrefs: NavItem;
}

export const navLinks: NavLinks = {
  publicProfile: {
    title: "Public profile",
    link: "/public/edit"
  },
  accountDetails: {
    title: "Account details",
    link: "/account/edit"
  },
  membership: {
    title: "Membership",
    link: "/membership",
    local: true
  },
  subscriptions: {
    title: "Subscriptions",
    link: "/subscriptions",
    local: true
  },
  contributions: {
    title: "Contributions",
    link: "/contributions",
    local: true
  },
  emailPrefs: {
    title: "Emails & marketing",
    link: "/email-prefs"
  }
};

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

export const qualifyLink = (navItem: NavItem) =>
  navItem.local ? navItem.link : `https://profile.${domain}${navItem.link}`;

export interface NavProps {
  selectedNavItem: NavItem;
}

export const Nav = (props: NavProps) => (
  <ul role="tablist" className={navCss}>
    {Object.values(navLinks).map((navItem: NavItem) => (
      <li
        className={navItemCss(props.selectedNavItem === navItem)}
        key={navItem.title}
      >
        <a
          className={navLinkCss(props.selectedNavItem === navItem)}
          href={qualifyLink(navItem)}
        >
          {navItem.title}
        </a>
      </li>
    ))}
  </ul>
);
