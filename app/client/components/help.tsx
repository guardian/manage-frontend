import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { headline, textSans } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import Color from "color";
import React from "react";
import { conf } from "../../server/config";
import { LinkButton } from "./buttons";
import { CallCentreEmailAndNumbers } from "./callCenterEmailAndNumbers";
import { NavItem, navLinks } from "./nav";
import { PageHeaderContainer, PageNavAndContentContainer } from "./page";
import { HelpSectionIcon } from "./svgs/helpSectionIcon";

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

const reportTechnicalIssue: NavItem = {
  title: "Report technical issue",
  link: `https://www.${domain}/info/tech-feedback`
};

interface FaqLink {
  title: string;
  link: string;
}

type FaqSectionNames =
  | "Delivery"
  | "Billing and Payments"
  | "Print subscriptions"
  | "Account";

interface SectionFaq {
  links: FaqLink[];
  seeAll: FaqLink;
}

type Faqs = {
  [key in FaqSectionNames]: SectionFaq;
};
const faqs: Faqs = {
  Delivery: {
    links: [
      {
        title: "Can my delivery be suspended while I'm on holiday?",
        link:
          "https://www.theguardian.com/help/2017/dec/11/help-if-you-are-going-on-holiday"
      },
      {
        title: "Can my delivery be redirected?",
        link: "https://www.theguardian.com/help/2017/dec/11/help-with-delivery"
      },
      {
        title: "How do I change my delivery address?",
        link: "https://www.theguardian.com/help/2017/dec/11/help-with-delivery"
      },
      {
        title: "My delivery is late or missing",
        link: "https://www.theguardian.com/help/2017/dec/11/help-with-delivery"
      }
    ],
    seeAll: {
      title: "See All Delivery FAQs",
      link: "https://www.theguardian.com/help/2017/dec/11/help-with-delivery"
    }
  },
  "Billing and Payments": {
    links: [
      {
        title: "How do I update my payment details?",
        link: "https://www.theguardian.com/help/2019/dec/13/payment-faqs"
      },
      {
        title: "Where can I view my payment plan?",
        link: "https://www.theguardian.com/help/2019/dec/13/payment-faqs"
      },
      {
        title: "What payment methods do you accept?",
        link: "https://www.theguardian.com/help/2019/dec/13/payment-faqs"
      },
      {
        title: "How do I cancel my subscription?",
        link: "https://www.theguardian.com/help/2019/dec/13/payment-faqs"
      }
    ],
    seeAll: {
      title: "See All Billing and Payments FAQs",
      link: "https://www.theguardian.com/help/2019/dec/13/payment-faqs"
    }
  },
  "Print subscriptions": {
    links: [
      {
        title: "My newspaper is missing a section",
        link: "https://www.theguardian.com/help/2017/dec/11/help-with-delivery"
      },
      {
        title: "Where can I use my vouchers?",
        link: "https://www.theguardian.com/help/2017/dec/11/help-with-vouchers"
      },
      {
        title: "I've haven't received my vouchers",
        link: "https://www.theguardian.com/help/2017/dec/11/help-with-vouchers"
      },
      {
        title: "I've lost my vouchers",
        link: "https://www.theguardian.com/help/2017/dec/11/help-with-vouchers"
      }
    ],
    seeAll: {
      title: "See All Print Subscription FAQs",
      link:
        "https://www.theguardian.com/subscriber-direct/subscription-frequently-asked-questions"
    }
  },
  Account: {
    links: [
      {
        title: "How do I change my password?",
        link: "https://profile.theguardian.com/reset"
      },
      {
        title: "How can I change my email address?",
        link: "https://manage.theguardian.com/account-settings"
      },
      {
        title: "Why am I still seeing banners/ads?",
        link: "https://www.theguardian.com/help/identity-faq"
      },
      {
        title: "How do I change my username?",
        link: "https://www.theguardian.com/help/identity-faq"
      }
    ],
    seeAll: {
      title: "See All Account FAQs",
      link: "https://www.theguardian.com/help/identity-faq"
    }
  }
};

export const Help = (props: RouteComponentProps) => (
  <>
    <PageHeaderContainer selectedNavItem={navLinks.emailPrefs}>
      <h1
        css={css`
          ${headline.large()};
          font-size: "32px",
          lineheight: "36px",
          margin-bottom: "30px",
          margin-top: "0"
          `}
      >
        Help centre
      </h1>
    </PageHeaderContainer>
    <PageNavAndContentContainer selectedNavItem={navLinks.help}>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin: 50px -10px -10px -10px;
        `}
      >
        {Object.keys(faqs).map((faqSectionTitle, sectionIndex) => {
          const faqSectionLinks =
            faqs[faqSectionTitle as FaqSectionNames].links;
          const seeAllNavItem: NavItem =
            faqs[faqSectionTitle as FaqSectionNames].seeAll;
          return (
            <div
              key={`section-${sectionIndex}`}
              css={css`
                border: 1px solid ${palette.neutral["86"]};
                flex: 1 1 370px;
                margin: 10px;
                display: flex;
                flex-direction: column;
              `}
            >
              <h2
                css={css`
                  ${textSans.medium({ fontWeight: "bold" })};
                  color: #333333;
                  position: relative;
                  margin: 0;
                  padding: 18px 0 18px 60px;
                  border-bottom: 1px solid ${palette.neutral["86"]};
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
                {faqSectionLinks.map((faqLink, questionIndex) => (
                  <li
                    key={`${faqSectionTitle}Question-${questionIndex}`}
                    css={css`
                      padding: 12px 20px 12px 0;
                      border-bottom: 1px solid ${palette.neutral["86"]};
                      position: relative;
                    `}
                  >
                    <a
                      href={faqLink.link}
                      target="_blank"
                      css={css`
                        display: inline-block;
                        width: 100%;
                        ${textSans.medium()};
                        color: ${palette.neutral["7"]};
                        :visited {
                          color: ${palette.neutral["7"]};
                        }
                      `}
                    >
                      {faqLink.title}
                    </a>
                    <span
                      css={css`
                        display: block;
                        width: 7px;
                        height: 7px;
                        border-top: 2px solid ${palette.neutral["7"]};
                        border-right: 2px solid ${palette.neutral["7"]};
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%) rotate(45deg);
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
                <a
                  href={seeAllNavItem.link}
                  target={"_blank"}
                  css={css`
                    display: inline-block;
                    ${textSans.small({ fontWeight: "bold" })};
                    line-height: 36px;
                    min-height: 36px;
                    height: 36px;
                    border-radius: 18px;
                    padding: 0 16px;
                    color: ${palette.brand.main};
                    background-color: ${palette.brand.faded};
                    :hover {
                      background-color: ${Color(palette.brand.faded, "hex")
                        .darken(0.1)
                        .string()};
                    }
                    :visited {
                      color: ${palette.brand.main};
                    }
                  `}
                >
                  {seeAllNavItem.title}
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <h2
        css={css`
          ${headline.small({ fontWeight: "bold" })};
        `}
      >
        Can’t find what you’re looking for?
      </h2>
      <CallCentreEmailAndNumbers />
      {/* <CallCentreNumbers /> */}
      <h2
        css={css`
          ${headline.small({ fontWeight: "bold" })};
        `}
      >
        Having a technical issue?
      </h2>
      <LinkButton
        to={reportTechnicalIssue.link}
        text={reportTechnicalIssue.title}
        colour={palette.brand.main}
        textColour={palette.neutral[100]}
        right
      />
    </PageNavAndContentContainer>
  </>
);
