import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import React, { useState } from "react";
import { trackEvent } from "../analytics";
import { helpCentreMoreQuestionsConfig } from "./helpCentreConfig";
import { linkAnchorStyle, linkArrowStyle } from "./helpCentreStyles";

const faqStyles = css({
  marginBottom: "10px",
  display: "flex",
  flexWrap: "wrap",
  textAlign: "left",
  fontWeight: "normal"
});

export const HelpCentreFaq = () => {
  const [indexOfOpenSection, setIndexOfOpenSection] = useState<number>();

  const containterCss = `
    width: 100%;
    border: 1px solid ${neutral["86"]};
  `;

  const sectionTitleCss = (isOpen: boolean, isNotFirstOption: boolean) => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${neutral["7"]};
    ${textSans.medium()};
    margin: 0;
    padding: ${space[3]}px ${space[3] * 2 + 15}px ${space[3]}px ${space[3]}px;
    position: relative;
    cursor: pointer;
    :after {
      content: "";
      display: block;
      width: 7px;
      height: 7px;
      border-top: 2px solid ${neutral["7"]};
      border-right: 2px solid ${neutral["7"]};
      position: absolute;
      top: 50%;
      transform: translateY(-50%) ${
        isOpen ? "rotate(-45deg)" : "rotate(135deg)"
      };
      transition: transform 0.4s;
      right: 17px;
    }
    ${isNotFirstOption &&
      `
      :before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0px;
        width: 100%;
        height: 1px;
        background-color: ${neutral["86"]}
      }
    `}
  `;

  const innerSectionCss = (isOpen: boolean) => `
    display: ${isOpen ? "block" : "none"};
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: rgba(193, 216, 252, 0.3);
    border-top: 1px solid #DCDCDC;
  `;

  const innerSectionDivCss = `
    ${textSans.medium()};
    margin-bottom: 0;
    padding: ${space[3]}px ${space[5]}px ${space[3]}px 0;
    margin: 0 ${space[3]}px;
    position: relative;
  `;

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
    <div css={faqStyles}>
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
                          eventAction: "faq-q-click",
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
