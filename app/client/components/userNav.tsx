import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import React, { useEffect, useRef, useState } from "react";
import { conf } from "../../server/config";
import { expanderButtonCss } from "../expanderButton";
import { minWidth } from "../styles/breakpoints";
import { gridColumns, gridItemPlacement } from "../styles/grid";

const userNavMenuCss = (showMenu: boolean) =>
  css({
    display: `${showMenu ? "block" : "none"}`,
    background: palette.brand.main,
    borderTop: `1px solid ${palette.brand.pastel}`,
    position: "absolute",
    top: "2.25rem",
    left: 0,
    width: "calc(100% - 30px)",
    maxWidth: "350px",
    zIndex: 1071,
    listStyle: "none",
    lineHeight: "1.375rem",
    boxShadow: "0 0 0 0.0625rem rgba(0,0,0,0.1)",
    margin: 0,
    padding: 0,
    " li": {
      padding: 0,
      margin: 0
    },
    [minWidth.desktop]: {
      width: "auto",
      maxWidth: "none",
      left: "auto",
      right: "16px",
      marginRight: "-32px",
      bottom: "auto",
      borderTop: "none",
      background: palette.neutral["100"],
      "li:not(:last-child)": {
        borderBottom: `1px solid ${palette.neutral["86"]}`
      },
      " .hide--gte-desktop": {
        display: "none"
      },
      ":before": {
        content: "''",
        width: 0,
        height: 0,
        position: "absolute",
        top: "-8px",
        right: "12px",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: `8px solid ${palette.neutral["100"]}`
      }
    }
  });

const userNavItemCss = css({
  padding: "9px 30px 8px",
  textDecoration: "none",
  color: palette.neutral["100"],
  whiteSpace: "nowrap",
  position: "relative",
  marginTop: "-1px",
  display: "flex",
  alignItems: "center",
  ":hover, :focus": {
    backgroundColor: palette.brand.dark,
    textDecoration: "none"
  },
  ":focus": {
    outline: 0
  },
  ":after": {
    content: "''",
    display: "block",
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "calc(100% - 30px)",
    height: "1px",
    backgroundColor: `${palette.brand.pastel}`
  },
  [minWidth.desktop]: {
    padding: "18px 14px",
    color: palette.neutral["20"],
    ".icon--fill": {
      fill: palette.neutral["20"]
    },
    ":after": {
      content: "none"
    },
    ":hover, :focus": {
      backgroundColor: palette.neutral["97"]
    }
  }
});

const signOutIcon = (
  <svg width="100%" height="100%" viewBox="0 0 20 22" fill="none">
    <g clipPath="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.875 16.475l-.875-.9L16.725 12H8v-2h8.725L14 6.425l.875-.875L20 10.65v.7l-5.125 5.125zM11 21v1H1.025L0 20.975v-20L1.025 0H11v1l-1 1H2v18h8l1 1z"
        fill="#fff"
        className="icon--fill"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v22H0z" />
      </clipPath>
    </defs>
  </svg>
);

const profileIcon = (
  <svg
    viewBox="0 0 14 14"
    css={{
      display: "inline-block",
      width: "26px",
      height: "26px",
      marginRight: "0.5rem",
      fill: palette.neutral["100"]
    }}
  >
    <path d="M7 0C3.1 0 0 3.1 0 7c0 2 .9 3.9 2.4 5.2C3.6 13.4 5.3 14 7 14s3.4-.6 4.7-1.8C13.2 10.9 14 9 14 7c0-3.9-3.1-7-7-7zm0 1.8c1.3 0 2.1.8 2.1 2.1S8 6.3 7 6.3c-.8 0-2-1.1-2-2.4 0-1.4.7-2.1 2-2.1zm0 11.6c-1.7 0-3.3-.7-4.5-1.8l.8-3.2.5-.5c1-.4 2.1-.5 3.1-.5 1.1 0 2.1.2 3.1.5l.5.5.9 3.2c-1.1 1.2-2.7 1.8-4.4 1.8z" />
    <path d="M9.6 4.2c.1-.1.1-.1 0 0zm.1 0s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm0 0c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0 0 0 0zm.1 0c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm0 0zm.1-.1c0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 0 0 .1 0 0 0 .1 0 .1 0 0zm0 0c0 .1 0 .1 0 0 0 .1 0 0 0 0zm0 0c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 0 0 0 0s.1 0 0 0c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0zm.1 0zm.1 0c-.1 0-.1 0 0 0zm0 0zm0 0zm.1 0s-.1 0 0 0c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0zm-.1 0c.1 0 .1 0 0 0 .1 0 .1 0 0 0zm.2 0c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0-.1-.1-.1 0 0 0-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0zm0 0s0-.1 0 0c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm0 0c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zm.1 0c-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0zm0 0c0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0 0 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.1 0 0 0 0zm0-.1z" />
  </svg>
);

const domain: string =
  typeof window !== "undefined" && window.guardian
    ? window.guardian.domain
    : conf.DOMAIN;
const profileHostName = `https://profile.${domain}`;

export interface UserNavItem {
  title: string;
  link: string;
  icon?: JSX.Element;
  border?: boolean;
  hideAtDesktop?: boolean;
}

export const UserNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    addListeners();
    return () => {
      removeListeners();
    };
  });

  const userNavItems: UserNavItem[] = [
    {
      title: "Public profile",
      link: `/public-settings`,
      hideAtDesktop: true
    },
    {
      title: "Account details",
      link: `/account-settings`,
      hideAtDesktop: true
    },
    {
      title: "Emails & marketing",
      link: `/email-prefs`,
      hideAtDesktop: true
    },
    {
      title: "Membership",
      link: "/membership",
      hideAtDesktop: true
    },
    {
      title: "Contributions",
      link: "/contributions",
      hideAtDesktop: true
    },
    {
      title: "Subscriptions",
      link: "/subscriptions",
      hideAtDesktop: true
    },
    {
      title: "Comments & replies",
      link: "/profile/user" // note this hits a redirect/proxy endpoint
    },
    {
      title: "Sign out",
      link: `${profileHostName}/signout`,
      icon: signOutIcon
    }
  ];

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape" && showMenu) {
      setShowMenu(false);
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }
  };

  const handleDismissiveClick = (event: any) => {
    if (
      wrapperRef.current &&
      event.target &&
      !wrapperRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  };

  const addListeners = () => {
    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("click", handleDismissiveClick, false);
  };

  const removeListeners = () => {
    document.removeEventListener("keydown", handleKeyDown, false);
    document.removeEventListener("click", handleDismissiveClick, false);
  };

  return (
    <nav
      ref={wrapperRef}
      css={{
        ...gridItemPlacement(1, 2),
        whiteSpace: "nowrap",
        maxHeight: "26px",
        margin: "auto 0",
        [minWidth.desktop]: {
          position: "relative",
          left: "0.5rem",
          ...gridItemPlacement(-4, 2, gridColumns.tabletAndDesktop),
          marginLeft: "auto"
        },
        [minWidth.wide]: {
          ...gridItemPlacement(-4, 2, gridColumns.wide)
        },
        " button": {
          [minWidth.tablet]: {
            marginLeft: "auto"
          },
          paddingTop: 0,
          paddingBottom: 0
        }
      }}
    >
      {/* TODO refactor to full use ExpanderButton */}
      <button
        css={{
          ...expanderButtonCss(palette.neutral["100"], palette.neutral["100"])(
            showMenu
          )
        }}
        type="button"
        aria-expanded={showMenu}
        onClick={() => setShowMenu(!showMenu)}
        ref={buttonRef}
      >
        {profileIcon}My account
      </button>

      <ul role="tablist" css={userNavMenuCss(showMenu)}>
        {userNavItems.map((item: UserNavItem) => (
          <React.Fragment key={item.title}>
            <li
              className={item.hideAtDesktop ? "hide--gte-desktop" : undefined}
            >
              <a href={item.link} css={userNavItemCss}>
                {item.icon && (
                  <span
                    css={{
                      marginRight: "5px",
                      display: "block",
                      height: "0.8em",
                      width: "0.8em",
                      " svg": { display: "block" }
                    }}
                  >
                    {item.icon}
                  </span>
                )}
                <span
                  css={{
                    lineHeight: "33px",
                    [minWidth.desktop]: {
                      lineHeight: "normal"
                    }
                  }}
                >
                  {item.title}
                </span>
              </a>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};
