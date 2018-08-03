import React from "react";
import { css } from "emotion";
import { conf } from "../../server/config";
import palette from "../colours";

const userNavToggleCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",

  "::after": {
    content: "''",
    display: "block",
    width: "5px",
    height: "5px",
    transform: "translateY(-2px) rotate(45deg)",
    border: "1px solid currentColor",
    borderLeft: "transparent",
    borderTop: "transparent",
    marginLeft: "5px",
    transition: ".25s ease-out"
  }
});

const userNavMenuCss = (showMenu: boolean) =>
  css({
    display: `${showMenu ? "block" : "none"}`,
    background: palette.white,
    position: "absolute",
    left: "0",
    top: "2.2rem",
    zIndex: "1071",
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
  fontSize: "0.9375rem",
  padding: "7px 20px 15px 30px",
  textDecoration: "none",
  color: "currentColor",
  whiteSpace: "nowrap",
  position: "relative",
  marginTop: "-1px",
  display: "flex",
  alignItems: "center",

  ":hover": {
    backgroundColor: palette.neutral["6"],
    textDecoration: "none"
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

let domain;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

const profileHostName = `https://profile.${domain}`;

export interface UserNavItem {
  title: string;
  link: string;
  icon?: JSX.Element;
  border?: boolean;
}

export class UserNav extends React.Component {
  public state = {
    showMenu: false
  };

  public userNavItems: UserNavItem[] = [
    {
      title: "Comments & replies",
      link: `/profile/user`
    },
    {
      title: "Public profile",
      link: `${profileHostName}/public/edit`
    },
    {
      title: "Account details",
      link: `${profileHostName}/account/edit`
    },
    {
      title: "Emails & marketing",
      link: `${profileHostName}/email-prefs`,
      border: true
    },
    {
      title: "Membership",
      link: `${profileHostName}/membership/edit`
    },
    {
      title: "Contributions",
      link: `${profileHostName}/contribution/recurring/edit`
    },
    {
      title: "Digital Pack",
      link: `${profileHostName}/digitalpack/edit`,
      border: true
    },
    {
      title: "Sign out",
      link: `${profileHostName}/signout`,
      icon: signOutIcon
    }
  ];

  public render(): JSX.Element {
    return (
      <nav css={{ position: "relative" }}>
        <span
          className={userNavToggleCss}
          onClick={() => this.setState({ showMenu: !this.state.showMenu })}
        >
          My account
        </span>

        <ul className={userNavMenuCss(this.state.showMenu)}>
          {this.userNavItems.map((item: UserNavItem) => (
            <React.Fragment key={item.title}>
              <li>
                <a href={item.link} className={userNavItemCss}>
                  {item.icon ? (
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
                  ) : (
                    false
                  )}
                  <span>{item.title}</span>
                </a>
              </li>
              {item.border ? <hr className={userNavBorderCss} /> : false}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    );
  }
}
