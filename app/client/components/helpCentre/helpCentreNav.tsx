import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React, { useState } from "react";
import { maxWidth, minWidth } from "../../styles/breakpoints";
import { HelpCentreNavConfig, helpCentreNavConfig } from "./helpCentreConfig";
import {
  containterCss,
  innerSectionCss,
  innerSectionDivCss,
  linkAnchorStyle,
  linkArrowStyle,
  sectionTitleCss
} from "./helpCentreStyles";

interface HelpCentreNavProps {
  selectedTopicObject?: HelpCentreNavConfig;
}

const ulCss = css`
  list-style: none;
  margin: 0 0 ${space[6]}px 0;
  padding: 0;
  ${maxWidth.desktop} {
    display: none;
  }
`;

const liCss = (isSelectedTopic: boolean, isFirstTopic: boolean) => css`
  ${textSans.medium()};
  color: ${neutral["7"]};
  border-left: ${isSelectedTopic
    ? `${space[2]}px solid #121212`
    : `${space[2]}px solid #dcdcdc`};
  font-weight: ${isSelectedTopic ? "700" : "normal"};
  cursor: pointer;
  ::after {
    content: "";
    display: block;
    border-bottom: 1px solid ${neutral["86"]};
  }
  ::before {
    content: "";
    display: ${isFirstTopic ? "block" : "none"};
    border-top: 1px solid ${neutral["86"]};
  }
`;

const pCss = css`
  padding: ${space[4]}px ${space[3]}px;
  margin: 0;
`;

const HelpCentreNav = (props: HelpCentreNavProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSectionClick = () => () => {
    setOpen(!open);
  };

  return (
    <>
      <ul css={ulCss}>
        {helpCentreNavConfig.map((topic, topicIndex) => (
          <Link to={`/help-centre/topic/${topic.id}`} key={topic.id}>
            <li
              css={liCss(
                props.selectedTopicObject?.id === topic.id,
                topicIndex === 0
              )}
            >
              <p css={pCss}>{topic.title}</p>
            </li>
          </Link>
        ))}
      </ul>

      <div
        css={css`
          ${containterCss};
          ${minWidth.desktop} {
            display: none;
          }
          margin-bottom: ${space[6]}px;
        `}
      >
        <h2
          css={css`
            ${sectionTitleCss(open, false)};
            ${textSans.large({ fontWeight: "bold" })};
            ${minWidth.tablet} {
              padding: ${space[3]}px ${space[3] * 2 + 15}px ${space[3]}px
                ${space[5]}px;
            }
          `}
          onClick={handleSectionClick()}
        >
          Topics
        </h2>
        <ul
          css={css`
            ${innerSectionCss(open)};
          `}
        >
          {helpCentreNavConfig.map((topic, topicIndex) => {
            return (
              <Link to={`/help-centre/topic/${topic.id}`} key={topic.id}>
                <li
                  key={topic.id}
                  css={css`
                    ${innerSectionDivCss};
                    border-bottom: ${topicIndex < helpCentreNavConfig.length - 1
                      ? "1px solid #dcdcdc"
                      : ""};
                    cursor: pointer;
                    ${minWidth.tablet} {
                      padding-left: ${space[3]}px;
                    }
                  `}
                >
                  <span
                    css={css`
                      ${linkAnchorStyle};
                      font-weight: ${topic.id === props.selectedTopicObject?.id
                        ? "bold"
                        : "normal"};
                    `}
                  >
                    {topic.title}
                  </span>
                  <span css={linkArrowStyle} />
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default HelpCentreNav;
