import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { Link } from "@reach/router";
import React from "react";
import { minWidth } from "../../styles/breakpoints";
import { sans } from "../../styles/fonts";
import {
  MenuSpecificNavItem,
  NAV_LINKS,
  NavItem,
  PROFILE_HOST_NAME
} from "./navConfig";

const leftNavCss = css({
  width: "100%",
  margin: 0,
  padding: 0,
  borderBottom: 0,
  listStyleType: "none",
  position: "sticky",
  top: "1rem"
});

const leftNavLinkCss = (isSelected: boolean | undefined) =>
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
    color: palette.brand[400],

    [minWidth.desktop]: {
      borderLeft: `${space[2]}px solid ${
        isSelected ? palette.brandAlt[400] : palette.neutral["46"]
      }`,
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

const leftNavItemCss = (isSelected: boolean | undefined) => ({
  margin: 0,
  background: isSelected ? palette.neutral["100"] : palette.neutral["86"],
  display: "block",
  width: "100%",
  [minWidth.tablet]: {
    minWidth: "155.5px" // gross hack to make IE11 work
  }
});

const leftNavIconCss = css({
  display: "inline-block",
  verticalAlign: "top",
  width: "auto",
  height: "100%",
  maxWidth: `${space[5]}px`,
  maxHeight: `${space[5]}px`,
  marginRight: `${space[5]}px`
});

export interface LeftSideNavProps {
  selectedNavItem?: NavItem;
}

export const LeftSideNav = (props: LeftSideNavProps) => (
  <ul role="tablist" css={leftNavCss}>
    {Object.values(NAV_LINKS)
      .filter(navItem => !navItem.isDropDownExclusive)
      .map((navItem: MenuSpecificNavItem) => (
        <li
          css={leftNavItemCss(props.selectedNavItem === navItem)}
          key={navItem.title}
        >
          {navItem.local ? (
            <Link
              css={leftNavLinkCss(props.selectedNavItem === navItem)}
              to={navItem.link}
            >
              {navItem.icon && (
                <i css={leftNavIconCss}>
                  <navItem.icon />
                </i>
              )}
              {navItem.title}
            </Link>
          ) : (
            <a
              css={leftNavLinkCss(props.selectedNavItem === navItem)}
              href={`${PROFILE_HOST_NAME}${navItem.link}`}
            >
              {navItem.title}
            </a>
          )}
        </li>
      ))}
  </ul>
);
