import { css } from "@emotion/core";
import React, { useEffect, useRef, useState } from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { expanderButtonCss } from "../expanderButton";

const userNavMenuCss = (showMenu: boolean) =>
  css({
    display: `${showMenu ? "block" : "none"}`,
    background: palette.white,
    position: "absolute",
    top: "3.05rem",
    zIndex: 1071,
    listStyle: "none",
    lineHeight: "1.375rem",
    boxShadow: "0 0 0 0.0625rem rgba(0,0,0,0.1)",
    borderRadius: "0.1875rem",
    margin: 0,
    padding: "0.375rem 0",
    overflow: "hidden",
    " li": {
      padding: 0,
      margin: 0
    }
  });

const userNavItemCss = css({
  padding: "7px 20px 15px 30px",
  textDecoration: "none",
  color: "currentColor",
  whiteSpace: "nowrap",
  position: "relative",
  marginTop: "-1px",
  display: "flex",
  alignItems: "center",
  ":hover, :focus": {
    backgroundColor: palette.neutral["6"],
    textDecoration: "none"
  },
  ":focus": {
    outline: 0
  }
});

const userNavBorderCss = css({
  height: "0.0625rem",
  background: palette.neutral["6"],
  border: 0,
  display: "block",
  margin: "0 0 0 1.875rem"
});

const signOutIcon = (
  <svg width="100%" height="100%" viewBox="0 0 20 22" fill="none">
    <g clipPath="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.875 16.475l-.875-.9L16.725 12H8v-2h8.725L14 6.425l.875-.875L20 10.65v.7l-5.125 5.125zM11 21v1H1.025L0 20.975v-20L1.025 0H11v1l-1 1H2v18h8l1 1z"
        fill="#333"
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
}

const UserNav = () => {
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
      title: "Comments & replies",
      link: "/profile/user" // note this hits a redirect/proxy endpoint
    },
    {
      title: "Public profile",
      link: `/public-settings`
    },
    {
      title: "Account details",
      link: `/account-settings`
    },
    {
      title: "Emails & marketing",
      link: `/email-prefs`,
      border: true
    },
    {
      title: "Membership",
      link: "/membership"
    },
    {
      title: "Contributions",
      link: "/contributions"
    },
    {
      title: "Subscriptions",
      link: "/subscriptions",
      border: true
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
    <nav ref={wrapperRef}>
      {/* TODO refactor to full use ExpanderButton */}
      <button
        css={expanderButtonCss(palette.white, palette.yellow.medium)(showMenu)}
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
            <li>
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
                <span>{item.title}</span>
              </a>
            </li>
            {item.border ? <hr css={userNavBorderCss} /> : false}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default UserNav;
