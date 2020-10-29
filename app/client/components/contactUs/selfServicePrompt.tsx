import { css, SerializedStyles } from "@emotion/core";
import { LinkButton } from "@guardian/src-button";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React from "react";
import { trackEvent } from "../analytics";
import { InfoIconDark } from "../svgs/infoIconDark";

interface SelfServicePromptProps {
  copy: string;
  linkCopy: string;
  linkHref: string;
  topicReferer: string;
  linkAsButton?: boolean;
  additionalCss?: SerializedStyles;
}

export const SelfServicePrompt = (props: SelfServicePromptProps) => {
  const linkCss = css`
    text-decoration: underline;
    font-weight: normal;
    color: ${palette.brand[500]};
  `;

  const spanCss = css`
    display: block;
    margin-bottom: ${space[5]}px;
  `;

  const onServicelinkClick = () =>
    trackEvent({
      eventCategory: "ContactUs",
      eventAction: "servicelink_click",
      eventLabel: props.topicReferer
    });

  return (
    <p
      css={css`
        display: block;
        ${textSans.medium({ fontWeight: "bold" })};
        border: 4px solid ${palette.brand[500]};
        padding: ${space[5]}px ${space[5]}px ${space[5]}px 53px;
        margin: ${space[3]}px 0;
        position: relative;
        ${props.additionalCss}
      `}
    >
      <i
        css={css`
          width: 21px;
          height: 21px;
          position: absolute;
          top: ${space[5]}px;
          left: ${space[5]}px;
        `}
      >
        <InfoIconDark fillColor={palette.brand[500]} />
      </i>
      <span css={spanCss}>{props.copy}</span>
      {props.linkAsButton ? (
        <LinkButton href={props.linkHref} onClick={onServicelinkClick}>
          {props.linkCopy}
        </LinkButton>
      ) : (
        <a href={props.linkHref} onClick={onServicelinkClick} css={linkCss}>
          {props.linkCopy} &gt;
        </a>
      )}
    </p>
  );
};
