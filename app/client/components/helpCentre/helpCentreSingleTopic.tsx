import { css } from "@emotion/core";
import { Link } from "@reach/router";
import React from "react";
import { trackEvent } from "../analytics";
import {
  h2Css,
  linkAnchorStyle,
  linkArrowStyle,
  linkListItemStyle,
  linksListStyle
} from "./helpCentreStyles";
import { SingleTopic } from "./HelpCentreTypes";

interface HelpCentreSingleTopicProps {
  id: string;
  topic: SingleTopic;
}

const liCss = (index: number) => css`
  ${linkListItemStyle};
  border-top: ${index === 0 ? "1px solid #DCDCDC" : "none"};
`;

export const HelpCentreSingleTopic = (props: HelpCentreSingleTopicProps) => {
  return (
    <>
      <h2 css={h2Css}>{props.topic.title}</h2>
      <ul css={linksListStyle}>
        {props.topic.articles.map((article, articleIndex) => (
          <li
            key={`${props.id}Article-${articleIndex}`}
            css={liCss(articleIndex)}
          >
            <Link
              css={linkAnchorStyle}
              to={`/help-centre/article/${article.path}`}
              replace={false}
              onClick={() => {
                trackEvent({
                  eventCategory: "help-centre",
                  eventAction: "article-click",
                  eventLabel: `${props.id}:${article.path}`
                });
              }}
            >
              {article.title}
            </Link>
            <span css={linkArrowStyle} />
          </li>
        ))}
      </ul>
    </>
  );
};
