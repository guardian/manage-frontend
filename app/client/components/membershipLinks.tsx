import React from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

export interface MembershipNavItem {
  title: string;
  link: string;
}

export interface MembershipNavLinks {
  membershipFAQ: MembershipNavItem;
  reportTechnicalIssue: MembershipNavItem;
  resetPassword: MembershipNavItem;
  deleteAccount: MembershipNavItem;
  signOut: MembershipNavItem;
}

export const membershipNavLinks: MembershipNavLinks = {
  membershipFAQ: {
    title: "Membership FAQ",
    link: "/help"
  },
  reportTechnicalIssue: {
    title: "Report technical issue",
    link: `https://www.${domain}/info/tech-feedback`
  },
  resetPassword: {
    title: "Reset password",
    link: `https://profile.${domain}/reset`
  },
  deleteAccount: {
    title: "Delete account",
    link: `https://profile.${domain}/delete`
  },
  signOut: {
    title: "Sign out",
    link: `https://profile.${domain}/signout`
  }
};

export const MembershipLinks = () => (
  <div>
    <ul
      css={{
        fontSize: "0.875rem",
        marginTop: "2rem",
        marginLeft: "1.5625rem",
        padding: 0,

        [minWidth.desktop]: {
          fontSize: "1rem",
          textAlign: "center"
        }
      }}
    >
      {Object.values(membershipNavLinks).map(
        (membershipNavItem: MembershipNavItem) => (
          <li
            css={{
              display: "block",
              marginBottom: "0.1875rem",

              [minWidth.desktop]: {
                display: "inline",
                margin: 0,

                ":not(:first-child)::before": {
                  display: "inline-block",
                  content: "'·'",
                  margin: "0 0.5625rem"
                }
              }
            }}
            key={membershipNavItem.title}
          >
            <a
              css={{
                color: palette.neutral["1"],
                textDecoration: "none",
                borderBottom: `0.0625rem solid ${palette.neutral["5"]}`,
                transition: "border-color .15s ease-out",

                ":hover": {
                  borderColor: "#6e99b3"
                }
              }}
              href={membershipNavItem.link}
            >
              {membershipNavItem.title}
            </a>
          </li>
        )
      )}
    </ul>
  </div>
);
