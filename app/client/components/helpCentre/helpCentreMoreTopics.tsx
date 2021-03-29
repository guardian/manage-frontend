import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { Link } from "@reach/router";
import React, { useState } from "react";
import { trackEvent } from "../analytics";
import {
  containterCss,
  h2Css,
  innerSectionCss,
  innerSectionDivCss,
  linkAnchorStyle,
  linkArrowStyle,
  sectionTitleCss
} from "./helpCentreStyles";
import { MoreTopics } from "./HelpCentreTypes";

const moreTopicsStyles = css`
  margin-bottom: "10px";
  display: "flex";
  flex-wrap: "wrap";
  text-align: "left";
  font-weight: "normal";
`;

const showHideCss = css`
  ${textSans.xsmall()};
  margin-left: ${space[3]}px;
  @media only screen and (max-width: 375px) {
    display: none;
  }
`;

interface HelpCentreMoreTopicsProps {
  id: string;
  moreTopics: MoreTopics;
}

export const HelpCentreMoreTopics = (props: HelpCentreMoreTopicsProps) => {
  const [openSection, setOpenSection] = useState<number>();

  return (
    <>
      <h2 css={h2Css}>{props.moreTopics.title}</h2>
      <div css={moreTopicsStyles}>
        <div css={containterCss}>
          {props.moreTopics.topics.map((topic, topicIndex) => {
            const isOpen = topicIndex === openSection;
            const isNotFirstOption = topicIndex > 0;

            return (
              <div key={topic.path}>
                <h2
                  css={css`
                    ${sectionTitleCss(isOpen, isNotFirstOption)};
                  `}
                  onClick={() =>
                    setOpenSection(openSection === topicIndex ? -1 : topicIndex)
                  }
                >
                  {topic.title}
                  <span css={showHideCss}>{isOpen ? "Hide" : "Show"}</span>
                </h2>
                <ul css={innerSectionCss(isOpen)}>
                  {topic.articles.map((article, articleIndex) => (
                    <li
                      key={article.path}
                      css={css`
                        ${innerSectionDivCss};
                        ${articleIndex < topic.articles.length - 1 &&
                          "border-bottom: 1px solid #DCDCDC"};
                      `}
                    >
                      <Link
                        css={linkAnchorStyle}
                        to={`/help-centre/article/${article.path}`}
                        replace={false}
                        onClick={() => {
                          trackEvent({
                            eventCategory: "help-centre",
                            eventAction: "article-click",
                            eventLabel: `${topic.path}:${article.path}`
                          });
                        }}
                      >
                        {article.title}
                      </Link>
                      <span css={linkArrowStyle} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
