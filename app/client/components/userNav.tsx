import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
// import { space } from "@guardian/src-foundations/space";
import React, { useEffect, useRef, useState } from "react";
import { conf } from "../../server/config";
import { expanderButtonCss } from "../expanderButton";
import { minWidth } from "../styles/breakpoints";

const userNavMenuCss = (showMenu: boolean) =>
  css({
    display: `${showMenu ? "block" : "none"}`,
    background: palette.brand.main,
    borderTop: `1px solid ${palette.brand.pastel}`,
    position: "absolute",
    top: "3.05rem",
    left: 0,
    // width: `calc(100% - ${space["6"]}px)`,
    width: "calc(100% - 30px)",
    maxWidth: "350px",
    zIndex: 1071,
    listStyle: "none",
    lineHeight: "1.375rem",
    boxShadow: "0 0 0 0.0625rem rgba(0,0,0,0.1)",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    " li": {
      padding: 0,
      margin: 0
    },
    [minWidth.desktop]: {
      " .hide--gte-desktop": {
        display: "none"
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
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v22H0z" />
      </clipPath>
    </defs>
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
        marginRight: "auto",
        [minWidth.desktop]: {
          marginRight: "30px"
        }
      }}
    >
      {/* TODO refactor to full use ExpanderButton */}
      <button
        css={expanderButtonCss(palette.neutral["100"], palette.neutral["100"])(
          showMenu
        )}
        type="button"
        aria-expanded={showMenu}
        onClick={() => setShowMenu(!showMenu)}
        ref={buttonRef}
      >
        My account
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
                    lineHeight: "33px"
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
