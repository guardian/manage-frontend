import { css, SerializedStyles } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React from "react";
import { trackEvent } from "../analytics";
import { isSignedIn } from "../main";
import { InfoIconDark } from "../svgs/infoIconDark";

interface SelfServicePromptProps {
  copy: string;
  linkCopy: string;
  linkHref: string;
  topicReferer: string;
  additionalCss?: SerializedStyles;
}

export const SelfServicePrompt = (props: SelfServicePromptProps) => {
  const linkCss = `
    display: block;
    margin-top: ${space[5]}px;
    text-decoration: underline;
    font-weight: normal;
    color: ${palette.brand[500]};
  `;

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
      {props.copy}
      {isSignedIn ? (
        <Link
          to={props.linkHref}
          onClick={() =>
            trackEvent({
              eventCategory: "selfservice_link",
              eventAction: "click",
              eventLabel: `signed in: ${props.topicReferer}`
            })
          }
          css={css`
            ${linkCss}
          `}
        >
          {props.linkCopy} &gt;
        </Link>
      ) : (
        <a
          href={props.linkHref}
          onClick={() =>
            trackEvent({
              eventCategory: "selfservice_link",
              eventAction: "click",
              eventLabel: `signed out: ${props.topicReferer}`
            })
          }
          css={css`
            ${linkCss}
          `}
        >
          {props.linkCopy} &gt;
        </a>
      )}
    </p>
  );
};
