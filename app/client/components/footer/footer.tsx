import { css } from "@emotion/core";
import { from } from "@guardian/src-foundations/mq";
import React, { SyntheticEvent } from "react";
import { conf } from "../../../server/config";
import palette from "../../colours";
import { headline } from "../../styles/fonts";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { footerLinks } from "./footerlinks";

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

const TODAY = new Date();

const footerStyles = css`
  margin-top: 2rem;
`;

const footerColourStyles = css`
  background-color: ${palette.blue.header};
  color: ${palette.white};
`;

const footerSizeStyles = css`
  max-width: 1300px;
  margin: auto;
`;

const footerContentStyles = css`
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 0;

  ${from.desktop} {
    padding: 0 20px;
  }

  ${from.leftCol} {
    display: flex;
  }
`;

const emailSignUpStyles = css`
  padding: 0;
  border: 0;
  width: 100%;
  margin: 0;
  ${from.leftCol} {
    width: 340px;
  }
  ${from.wide} {
    width: 460px;
  }
`;

const footerMenuStyles = css`
  font-feature-settings: kern;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  ${from.wide} {
    border-top: 0;
  }
`;

const footerMenuUlStyles = css`
  line-height: 19.2px;
  width: calc(50% - 1.25rem - 1px);
  list-style: none;
  position: relative;
  padding: 0 10px;
  margin: 0;

  &:nth-of-type(even) {
    border-left: 1px solid rgba(255, 255, 255, 0.3);
  }

  ${from.tablet} {
    &:not(:first-of-type) {
      border-left: 1px solid rgba(255, 255, 255, 0.3);
    }

    width: 161px;
    flex: 1 0 0;
  }

  ${from.desktop} {
    border-left: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

const footerMenuLiStyles = css`
  list-style: none;
`;

const footerLinkStyles = css`
  display: inline-block;
  padding: 6px 0;
  color: ${palette.white};
  :hover {
    color: ${palette.yellow.medium};
    cursor: pointer;
  }
`;

const supportStyles = css`
  width: 50%;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  padding-left: 10px;
  ${from.phablet} {
    width: 300px;
  }
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  ${from.tablet} {
    border-top: 0;
  }
`;

const supportTitleStyles = css`
  color: ${palette.yellow.medium};
  font-family: ${headline};
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
  margin-top: 3px;
  margin-bottom: 12px;
  ${from.phablet} {
    font-size: 32px;
    line-height: 32px;
  }
`;

const supportButtonContainerStyles = css`
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 6px;
`;

const copyrightStyles = css`
  padding-bottom: 24px;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
`;

const backToTopLinkStyles = css`
  font-size: 16px;
  color: ${palette.white};
  font-weight: bold;
  padding: 0 5px;
  background-color: ${palette.blue.header};
  :hover {
    color: ${palette.yellow.medium};
  }
  position: absolute;
  right: 20px;
  transform: translateY(-50%);
`;

const backToTopLabelStyles = css`
  display: inline-block;
  padding-right: 5px;
  padding-top: 9px;
`;

const backToTopButtonOutterContainerStyles = css`
  position: relative;
  float: right;
  background-color: currentColor;
  border-radius: 100%;
  height: 42px;
  width: 42px;
`;

const backToTopButtonInnerContainerStyles = css`
  position: absolute;
  fill: ${palette.blue.header};
  top: 9px;
  left: 9px;
`;

const copyrightTextStyles = css`
  ${from.tablet} {
    padding-top: 6px;
  }
  padding-top: 26px;
  font-size: 12px;
`;

const fillEmailSignup = (_: SyntheticEvent<HTMLIFrameElement>) => {
  // Placeholder method to autofill user email when the iframe is hosted on the same hostname
  return;
};

export const Footer = () => {
  return (
    <footer css={footerStyles}>
      <div>
        <div css={footerColourStyles}>
          <div css={footerSizeStyles}>
            <div css={footerContentStyles}>
              <div css={emailSignUpStyles}>
                <iframe
                  title="Guardian Email Sign-up Form"
                  src={`https://profile.${domain}/email/form/footer/today-uk`}
                  scrolling="no"
                  seamless={false}
                  frameBorder="0"
                  data-form-success-desc="We will send you our picks of the most important headlines tomorrow morning."
                  data-node-uid="2"
                  height="86px"
                  onLoad={emailForm => fillEmailSignup(emailForm)}
                />
              </div>

              <div css={footerMenuStyles}>
                {footerLinks.map((linkList, i) => (
                  <ul key={i} css={footerMenuUlStyles}>
                    {linkList.map(({ title, link, onClick }) => {
                      return (
                        <li key={title} css={footerMenuLiStyles}>
                          <a
                            href={link}
                            onClick={onClick}
                            css={footerLinkStyles}
                          >
                            {title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ))}

                <div css={supportStyles}>
                  <div css={supportTitleStyles}>Support The&nbsp;Guardian</div>
                  <div css={supportButtonContainerStyles}>
                    <SupportTheGuardianButton
                      urlSuffix="contribute"
                      supportReferer="footer_support_contribute"
                      alternateButtonText="Contribute"
                      fontWeight="bold"
                    />
                  </div>
                  <SupportTheGuardianButton
                    urlSuffix="subscribe"
                    supportReferer="footer_support_subscribe"
                    alternateButtonText="Subscribe"
                    fontWeight="bold"
                  />
                </div>
              </div>
            </div>

            <div css={copyrightStyles}>
              <a href="#top" css={backToTopLinkStyles}>
                <span css={backToTopLabelStyles}>Back to top</span>
                <span css={backToTopButtonOutterContainerStyles}>
                  <span css={backToTopButtonInnerContainerStyles}>
                    <svg width="24" height="18" viewBox="0 0 24 18">
                      <path d="M.4 15.3l10.5-8.4L12 6l1.1.9 10.5 8.4-.5.7L12 9.7.9 16l-.5-.7z" />
                    </svg>
                  </span>
                </span>
              </a>
              <div css={copyrightTextStyles}>
                © {TODAY.getFullYear()} Guardian News and Media Limited or its
                affiliated companies. All&nbsp;rights&nbsp;reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
