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

const h2Css = css`
  ${textSans.large({ fontWeight: "bold" })};
  color: ${neutral[20]};
  position: relative;
  margin: 0;
  padding: 22px 0 22px 64px;
`;

const h2IconCss = css`
  position: absolute;
  top: ${space[4]}px;
  left: ${space[4]}px;
`;

const subtitleCss = css`
  display: none;
  ${textSans.medium()};
  padding: 0 ${space[4]}px ${space[4]}px ${space[4]}px;
  margin: 0;
  ${minWidth.wide} {
    display: block;
  }
`;

export const HelpCentrePhoneNumbers = () => (
  <>
    <div css={containerCss}>
      <h2 css={h2Css}>
        <i css={h2IconCss}>{getHelpSectionIcon("call-us")}</i>
        Call us
      </h2>
      <p css={subtitleCss}>Speak with one of our customer service agents.</p>
    </div>
    <CallCentreEmailAndNumbers hideEmailAddress={true} />
  </>
);
