import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useState } from "react";
import { trackEvent } from "../analytics";
import { helpCentreMoreQuestionsConfig } from "./helpCentreConfig";
import {
  containterCss,
  innerSectionCss,
  innerSectionDivCss,
  linkAnchorStyle,
  linkArrowStyle,
  sectionTitleCss
} from "./helpCentreStyles";

const moreTopicsStyles = css({
  marginBottom: "10px",
  display: "flex",
  flexWrap: "wrap",
  textAlign: "left",
  fontWeight: "normal"
});

export const HelpCentreLandingMoreTopics = () => {
  const [indexOfOpenSection, setIndexOfOpenSection] = useState<number>();

  const showHideCss = `
    ${textSans.xsmall()};
    margin-left: ${space[3]}px;
    @media only screen and (max-width: 375px) {
    display: none;
  }
  `;

  const handleSectionClick = (sectionNum: number) => () => {
    setIndexOfOpenSection(indexOfOpenSection === sectionNum ? -1 : sectionNum);
  };
  return (
    <div css={moreTopicsStyles}>
      <div
        css={css`
          ${containterCss}
        `}
      >
        {helpCentreMoreQuestionsConfig.map((topic, topicIndex) => {
          const isOpen = topicIndex === indexOfOpenSection;
          const isNotFirstOption = topicIndex > 0;
          return (
            <div key={topic.id}>
              <h2
                css={css`
                  ${sectionTitleCss(isOpen, isNotFirstOption)};
                `}
                onClick={handleSectionClick(topicIndex)}
              >
                {topic.title}
                <span
                  css={css`
                    ${showHideCss};
                  `}
                >
                  {isOpen ? "Hide" : "Show"}
                </span>
              </h2>
              <ul
                css={css`
                  ${innerSectionCss(isOpen)};
                `}
              >
                {topic.links.map((question, questionIndex) => (
                  <li
                    key={`${topic.id}Question-${questionIndex}`}
                    css={css`
                      ${innerSectionDivCss};
                      ${questionIndex < topic.links.length - 1 &&
                        "border-bottom: 1px solid #DCDCDC"};
                    `}
                  >
                    <a
                      href={question.link}
                      target="_blank"
                      css={linkAnchorStyle}
                      onClick={() => {
                        trackEvent({
                          eventCategory: "help-centre",
                          eventAction: "more-topics-q-click",
                          eventLabel: `${topic.id}-${question.id}`
                        });
                      }}
                    >
                      {question.title}
                    </a>
                    <span css={linkArrowStyle} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
