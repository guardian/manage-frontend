import { css } from "@emotion/core";
import { brand, neutral, space, text } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React, { ReactNode, useState } from "react";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { StartLiveChatButton } from "../liveChat/liveChat";
import { ErrorIcon } from "../svgs/errorIcon";
import { getHelpSectionIcon } from "../svgs/helpSectionIcons";

interface HelpCentreContactBoxProps {
  iconId: string;
  title: string;
  subtitle: string;
  subTitleIsWarning?: boolean;
  children: ReactNode;
}

const contactBoxContainerCss = css`
  display: flex;
  flex-direction: column;
  border: 1px solid ${neutral[86]};
  ${textSans.medium()};
  ${minWidth.tablet} {
    width: calc(50% - ${space[2]}px);
  }
`;

const contactBoxH2Css = css`
  ${textSans.large({ fontWeight: "bold" })};
  color: ${neutral[20]};
  position: relative;
  margin: 0;
  padding: 22px 0 22px 64px;
  ${maxWidth.desktop} {
    padding: 18px 0 18px 60px;
  }
`;

const contactBoxIconCss = css`
  position: absolute;
  top: ${space[4]}px;
  left: ${space[4]}px;
  ${maxWidth.desktop} {
    top: ${space[3]}px;
    left: ${space[3]}px;
  }
`;

const contactBoxSubtitleCss = css`
  display: none;
  margin: 0 ${space[4]}px ${space[3]}px ${space[4]}px;
  ${minWidth.desktop} {
    display: block;
  }
  @media screen and (min-width: 740px) and (max-width: 1270px) {
    min-height: 3em;
  }
`;

const contactBoxSubtitleWarningCss = css`
  position: relative;
  color: ${text.error};
  font-weight: bold;
  margin: 0 ${space[4]}px ${space[3]}px ${space[4]}px;
  padding-left: ${space[5] + space[2]}px;
  @media screen and (min-width: 740px) and (max-width: 1270px) {
    min-height: 3em;
  }
`;

const contactBoxDetailsCss = (includeTopBorder: boolean = true) => css`
  border-top: ${includeTopBorder ? `1px solid ${neutral[86]}` : "0"};
  padding-top: ${space[3]}px;
  margin: 0 ${space[4]}px ${space[4]}px ${space[4]}px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  & p {
    margin-top: auto;
    margin-bottom: 0;
  }
  ${maxWidth.desktop} {
    padding: ${space[3]}px;
    margin: 0;
  }
`;

const HelpCentreContactBox = (props: HelpCentreContactBoxProps) => {
  return (
    <div css={contactBoxContainerCss}>
      <div>
        <h2 css={contactBoxH2Css}>
          <i css={contactBoxIconCss}>{getHelpSectionIcon(props.iconId)}</i>
          {props.title}
        </h2>
        <p
          css={
            props.subTitleIsWarning
              ? contactBoxSubtitleWarningCss
              : contactBoxSubtitleCss
          }
        >
          {props.subTitleIsWarning && (
            <i
              css={css`
                position: absolute;
                top: 0;
                left: 0;
              `}
            >
              <ErrorIcon />
            </i>
          )}
          {props.subtitle}
        </p>
      </div>
      <div css={contactBoxDetailsCss(!props.subTitleIsWarning)}>
        {props.children}
      </div>
    </div>
  );
};

const emailAndLiveChatSubheadingCss = css`
  ${textSans.medium()};
  margin-bottom: ${space[6]}px;
  ${minWidth.desktop} {
    display: none;
  }
`;

const emailAndLiveChatFlexContainerCss = css`
  display: flex;
  flex-direction: column;
  ${minWidth.tablet} {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${space[5]}px;
  }
  & > * {
    margin-bottom: ${space[5]}px;
  }
`;

const emailAndLiveChatPCss = css`
  font-weight: bold;
  margin-bottom: ${space[9]}px !important;
`;

const emailAndLiveChatLinkCss = css`
  color: ${brand[500]};
`;

const emailAndLiveChatButtonCss = css`
  margin-bottom: ${space[5]}px;
  margin-top: ${space[1]}px;
`;

export const EmailAndLiveChatSubHeading = () => (
  <p css={emailAndLiveChatSubheadingCss}>
    Get in touch with one of our customer service agents.
  </p>
);

export const HelpCentreEmailAndLiveChat = () => {
  const [isLiveChatAvailable, setIsLiveChatAvailable] = useState<boolean>(true);
  return (
    <>
      <div css={emailAndLiveChatFlexContainerCss}>
        <HelpCentreContactBox
          iconId="email-us"
          title="Email us"
          subtitle="Send a message to one of our customer service agents."
        >
          <p css={emailAndLiveChatPCss}>customers@theguardian.com</p>
          <p>
            Use our{" "}
            <Link to="/help-centre/contact-us/" css={emailAndLiveChatLinkCss}>
              contact form
            </Link>{" "}
            to send us a message.
          </p>
        </HelpCentreContactBox>
        <HelpCentreContactBox
          title="Chat with us"
          subtitle={
            isLiveChatAvailable
              ? "Chat with one of our customer service agents."
              : "Something went wrong. Please refresh or switch browsers."
          }
          subTitleIsWarning={!isLiveChatAvailable}
          iconId="chat-with-us"
        >
          {isLiveChatAvailable && (
            <StartLiveChatButton
              liveChatButtonCss={emailAndLiveChatButtonCss}
              setIsLiveChatAvailable={setIsLiveChatAvailable}
            />
          )}
          <p>9am - 6pm, Monday - Sunday (GMT/BST)</p>
        </HelpCentreContactBox>
      </div>
    </>
  );
};
