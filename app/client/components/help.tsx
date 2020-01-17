import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { conf } from "../../server/config";
import { minWidth } from "../styles/breakpoints";
import { headline } from "../styles/fonts";
import { LinkButton } from "./buttons";
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
type FaqSection = "Delivery" | "Billing" | "Print subscriptions" | "Account";
type FaqList = {
  [key in FaqSection]: FaqLink[];
};

const faqs: FaqList = {
  Delivery: [
    { title: "a question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" }
  ],
  Billing: [
    { title: "a question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" }
  ],
  "Print subscriptions": [
    { title: "a question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" },
    { title: "another question here", link: "thecorrespondingurl.com" }
  ],
  Account: [
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
          display: flex;
          flex-wrap: wrap;
          margin: 50px -10px -10px -10px;
        `}
      >
        {Object.keys(faqs).map((faqSectionTitle, sectionIndex) => {
          const faqSection: FaqLink[] = faqs[faqSectionTitle as FaqSection];
          return (
            <div
              key={`section-${sectionIndex}`}
              css={css`
                border: 1px solid #dcdcdc;
                flex: 1 1 370px;
                margin: 10px;
                display: flex;
                flex-direction: column;
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
                  width: 100%;
                `}
              >
                <i
                  css={css`
                    position: absolute;
                    top: 11px;
                    left: 11px;
                  `}
                >
                  <HelpSectionIcon subsection={"delivery"} />
                </i>
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
                      padding: 12px 20px 12px 0;
                      border-bottom: 1px solid #dcdcdc;
                      position: relative;
                    `}
                  >
                    <a
                      href={faqLink.link}
                      target="_blank"
                      css={css`
                        display: inline-block;
                        width: 100%;
                      `}
                    >
                      {faqLink.title}
                    </a>
                    <span
                      css={css`
                        display: block;
                        width: 7px;
                        height: 7px;
                        border-top: 2px solid #121212;
                        border-right: 2px solid #121212;
                        rotate: 45deg;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 7px;
                      `}
                    />
                  </li>
                ))}
              </ul>
              <div
                css={css`
                  margin: auto 11px 20px 11px;
                `}
              >
                <LinkButton
                  to={"https://www.theguardian.com/uk"}
                  text={"See all Delivery questions"}
                  colour={"#C1D8FC"}
                  textColour={palette.brand.main}
                  right
                />
              </div>
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
                    color: "green",
                    textDecoration: "none",
                    borderBottom: `0.0625rem solid red`,
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
