import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { Link } from "@reach/router";
import React from "react";
import { conf } from "../../server/config";
import { minWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";

const navCss = css({
  width: "100%",
  margin: 0,
  padding: 0,
  borderBottom: 0,
  listStyleType: "none",
  position: "sticky",
  top: "1rem"
});

const navLinkCss = (isSelected: boolean | undefined) =>
  css({
    fontSize: "1.25rem",
    fontWeight: isSelected ? "bold" : "normal",
    lineHeight: "1.25rem",
    fontFamily: sans,
    display: "block",
    boxSizing: "border-box",
    padding: "4px 0 0 5px",
    letterSpacing: "-0.02rem",
    textAlign: "left",
    textDecoration: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    background: palette.neutral["100"],
    color: palette.brand.main,

    [minWidth.desktop]: {
      boxShadow: isSelected ? "0 1px 0 white" : undefined,
      minHeight: 0,
      padding: "18px 0 18px 22px",
      position: "relative",
      " :after": {
        content: "''",
        position: "absolute",
        bottom: 0,
        right: 0,
        height: "1px",
        width: "calc(100% - 22px)",
        backgroundColor: palette.neutral["86"]
      },

      ":hover": {
        backgroundColor: isSelected
          ? palette.neutral["100"]
          : palette.neutral["97"]
      }
    }
  });

const navItemCss = (isSelected: boolean | undefined) => ({
  margin: 0,
  background: `0.0625rem solid ${
    isSelected ? palette.neutral["100"] : palette.neutral["86"]
  }`,
  display: "block",
  width: "100%",
  [minWidth.tablet]: {
    minWidth: "155.5px" // gross hack to make IE11 work
  },
  [minWidth.desktop]: {
    paddingLeft: `${space[2]}px`,
    backgroundColor: isSelected
      ? palette.brandYellow.main
      : palette.neutral["46"]
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
  help: NavItem;
}

export const navLinks: NavLinks = {
  publicProfile: {
    title: "Public profile",
    link: "/public-settings",
    local: true
  },
  accountDetails: {
    title: "Account details",
    link: "/account-settings",
    local: true
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
  },
  help: {
    title: "Help",
    link: "/help",
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
  selectedNavItem?: NavItem;
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
