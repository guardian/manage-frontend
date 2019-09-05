import { css } from "@emotion/core";
import { Link } from "@reach/router";
import React from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
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
    fontWeight: 500,
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

const navItemCss = (isSelected: boolean | undefined) => ({
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
    link: "/email-prefs",
    local: true
  }
};

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

export interface NavProps {
  selectedNavItem: NavItem;
}

export const Nav = (props: NavProps) => (
  <ul role="tablist" css={navCss}>
    {Object.values(navLinks).map((navItem: NavItem) => (
      <li
        css={navItemCss(props.selectedNavItem === navItem)}
        key={navItem.title}
      >
        {navItem.local ? (
          <Link
            css={navLinkCss(props.selectedNavItem === navItem)}
            to={navItem.link}
          >
            {navItem.title}
          </Link>
        ) : (
          <a
            css={navLinkCss(props.selectedNavItem === navItem)}
            href={`https://profile.${domain}${navItem.link}`}
          >
            {navItem.title}
          </a>
        )}
      </li>
    ))}
  </ul>
);
