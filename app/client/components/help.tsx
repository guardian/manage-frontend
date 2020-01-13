import { RouteComponentProps } from "@reach/router";
import React from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { headline } from "../styles/fonts";
import { NavItem, navLinks } from "./nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "./page";

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

export interface MembershipNavLinks {
  reportTechnicalIssue: NavItem;
}

const membershipNavLinks: MembershipNavLinks = {
  reportTechnicalIssue: {
    title: "Report technical issue",
    link: `https://www.${domain}/info/tech-feedback`
  }
};

export const Help = (props: RouteComponentProps) => (
  <>
    <PageHeaderContainer selectedNavItem={navLinks.emailPrefs}>
      <h1
        css={{
          fontSize: "32px",
          lineHeight: "36px",
          fontFamily: headline,
          marginBottom: "30px",
          marginTop: "0"
        }}
      >
        Help
      </h1>
    </PageHeaderContainer>
    <PageNavAndContentContainer selectedNavItem={navLinks.emailPrefs}>
      <ul
        css={{
          fontSize: "0.875rem",
          marginTop: "3rem",
          marginLeft: "1.5625rem",
          padding: 0,

          [minWidth.desktop]: {
            fontSize: "1rem",
            textAlign: "center"
          }
        }}
      >
        {Object.values(membershipNavLinks).map((membershipNavItem: NavItem) => (
          <li
            css={{
              display: "block",
              marginBottom: "0.1875rem",

              [minWidth.desktop]: {
                display: "inline",
                margin: 0,

                ":not(:first-of-type)::before": {
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
        ))}
      </ul>
    </PageNavAndContentContainer>
  </>
);
