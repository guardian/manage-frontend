import { css } from "@emotion/core";
import { textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { headline } from "../styles/fonts";
import { NavItem, navLinks } from "./nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "./page";
import { HelpSectionIcon } from "./svgs/helpSectionIcon";

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

interface FaqLink {
  title: string;
  link: string;
}
type FaqSection = "Section 1" | "Section 2" | "Section 3" | "Section 4";
type FaqList = {
  [key in FaqSection]: FaqLink[];
};

const faqs: FaqList = {
  "Section 1": [
    { title: "a question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" }
  ]
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
        Help centre
      </h1>
    </PageHeaderContainer>
    <PageNavAndContentContainer selectedNavItem={navLinks.emailPrefs}>
      <div
        css={css`
          margin-top: 50px;
        `}
      >
        {Object.keys(faqs).map((faqSectionTitle, sectionIndex) => {
          const faqSection: FaqLink[] = faqs[faqSectionTitle as FaqSection];
          return (
            <div
              key={`section-${sectionIndex}`}
              css={css`
                border: 1px solid #dcdcdc;
              `}
            >
              <h2
                css={css`
                  ${textSans.medium()};
                  color: #333333;
                  position: relative;
                  margin: 0;
                  padding: 18px 0 18px 60px;
                  border-bottom: 1px solid #dcdcdc;
                `}
              >
                <i css={css`
                  position: absolute;
                  top: 11px;
                  left: 11px;
                  `}><HelpSectionIcon subsection={"delivery"} /></i>
                {faqSectionTitle}
              </h2>
              <ul
                css={css`
                  list-style: none;
                  margin: 0 0 20px;
                  padding: 0 12px;
                `}
              >
                {faqSection.map((faqLink, questionIndex) => (
                  <li
                    key={`${faqSectionTitle}Question-${questionIndex}`}
                    css={css`
                      padding: 12px 0;
                      border-bottom: 1px solid #dcdcdc;
                    `}
                  >
                    <a href={faqLink.link} target="_blank">
                      {faqLink.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
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
          {Object.values(membershipNavLinks).map(
            (membershipNavItem: NavItem) => (
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
            )
          )}
        </ul>
      </div>
    </PageNavAndContentContainer>
  </>
);
