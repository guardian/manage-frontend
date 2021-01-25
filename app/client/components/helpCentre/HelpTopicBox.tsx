import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, neutral } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import Color from "color";
import React from "react";
import { minWidth } from "../../styles/breakpoints";
import { trackEvent } from "../analytics";
import { getHelpSectionIcon } from "../svgs/helpSectionIcons";
import { HelpCentreTopic } from "./helpCentreConfig";

interface HelpTopicBoxProps {
  topic: HelpCentreTopic;
}

const boxHolderStyle = css`
  border: 1px solid ${neutral["86"]};
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${space[5]}px;
  ${minWidth.tablet} {
    flex-basis: 48%;
    flex-basis: calc(50% - (${space[5]}px * 0.5));
  }
  ${minWidth.desktop} {
    flex-basis: 30%;
    flex-basis: calc(33.3% - (${space[5]}px * 0.666));
  }
`;

const boxTitleStyle = css`
  ${textSans.medium({ fontWeight: "bold" })};
  color: #333333;
  position: relative;
  margin: 0;
  padding: 18px 0 18px 60px;
  border-bottom: 1px solid ${neutral["86"]};
  width: 100%;
`;

const iconStyle = css`
  position: absolute;
  top: 11px;
  left: 11px;
`;

const linksListStyle = css`
  list-style: none;
  margin: 0 0 20px;
  padding: 0 12px;
`;

const linkListItemStyle = css`
  padding: 12px 20px 12px 0;
  border-bottom: 1px solid ${neutral["86"]};
  position: relative;
`;

const linkAnchorStyle = css`
  display: inline-block;
  width: 100%;
  ${textSans.medium()};
  color: ${neutral["7"]};
  :visited {
    color: ${neutral["7"]};
  }
`;

const linkArrowStyle = css`
  display: block;
  width: 7px;
  height: 7px;
  border-top: 2px solid ${neutral["7"]};
  border-right: 2px solid ${neutral["7"]};
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  right: 7px;
`;

const seeAllAnchorStyle = css`
  display: inline-block;
  ${textSans.small({ fontWeight: "bold" })};
  line-height: 36px;
  min-height: 36px;
  height: 36px;
  border-radius: 18px;
  padding: 0 16px;
  color: ${brand[400]};
  background-color: ${brand[800]};
  :hover {
    background-color: ${Color(brand[800], "hex")
      .darken(0.1)
      .string()};
  }
  :visited {
    color: ${brand[400]};
  }
`;

export const HelpTopicBox = (props: HelpTopicBoxProps) => (
  <div css={boxHolderStyle}>
    <h2 css={boxTitleStyle}>
      <i css={iconStyle}>{getHelpSectionIcon(props.topic.id)}</i>
      {props.topic.title}
    </h2>
    <ul css={linksListStyle}>
      {props.topic.links.map((question, questionIndex) => (
        <li
          key={`${props.topic.id}Question-${questionIndex}`}
          css={linkListItemStyle}
        >
          <a
            href={question.link}
            target="_blank"
            css={linkAnchorStyle}
            onClick={() => {
              trackEvent({
                eventCategory: "help-centre",
                eventAction: "popular-topic-q-click",
                eventLabel: `${props.topic.id}-${question.id}`
              });
            }}
          >
            {question.title}
          </a>
          <span css={linkArrowStyle} />
        </li>
      ))}
    </ul>
    <div
      css={css`
        margin: auto 11px 20px 11px;
      `}
    >
      <a
        href={props.topic.seeAllLink}
        target={"_blank"}
        css={seeAllAnchorStyle}
        onClick={() => {
          trackEvent({
            eventCategory: "help-centre",
            eventAction: "popular-topic-see-all-click",
            eventLabel: props.topic.id
          });
        }}
      >
        See all
      </a>
    </div>
  </div>
);
