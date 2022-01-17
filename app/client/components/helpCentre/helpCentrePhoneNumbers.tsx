import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import { minWidth } from "../../styles/breakpoints";
import { CallCentreEmailAndNumbers } from "../callCenterEmailAndNumbers";
import { getHelpSectionIcon } from "../svgs/helpSectionIcons";

const containerCss = css`
  border-top: 1px solid ${neutral["86"]};
  border-left: 1px solid ${neutral["86"]};
  border-right: 1px solid ${neutral["86"]};
`;

const headingCss = css`
  ${textSans.large({ fontWeight: "bold" })};
  color: ${neutral[20]};
  position: relative;
  margin: 0;
  padding: 18px 0 18px 60px;
`;

const headingWideCss = css`
  ${minWidth.desktop} {
    padding: 22px 0 22px 64px;
  }
`;

const headingIconCss = css`
  position: absolute;
  top: ${space[3]}px;
  left: ${space[3]}px;
`;

const headingIconWideCss = css`
  ${minWidth.desktop} {
    top: ${space[4]}px;
    left: ${space[4]}px;
  }
`;

const subtitleCss = css`
  display: none;
  ${textSans.medium()};
  padding: 0 ${space[4]}px ${space[4]}px ${space[4]}px;
  margin: 0;
`;

const subtitleWideCss = css`
  ${minWidth.wide} {
    display: block;
  }
`;

export interface HelpCentrePhoneNumbersProps {
  compactLayout?: boolean;
}

export const HelpCentrePhoneNumbers = (props: HelpCentrePhoneNumbersProps) => (
  <>
    <div css={containerCss}>
      <h2 css={[headingCss, !props.compactLayout && headingWideCss]}>
        <i css={[headingIconCss, !props.compactLayout && headingIconWideCss]}>
          {getHelpSectionIcon("call-us")}
        </i>
        Call us
      </h2>
      <p css={[subtitleCss, !props.compactLayout && subtitleWideCss]}>
        Speak with one of our customer service agents.
      </p>
    </div>
    <CallCentreEmailAndNumbers
      hideEmailAddress={true}
      compactLayout={props.compactLayout}
    />
  </>
);
