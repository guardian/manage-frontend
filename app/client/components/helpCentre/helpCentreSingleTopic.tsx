import { css } from "@emotion/core";
import React from "react";
import { trackEvent } from "../analytics";
import {
  linkAnchorStyle,
  linkArrowStyle,
  linkListItemStyle,
  linksListStyle
} from "./helpCentreStyles";
import { SingleTopic } from "./helpCentreTopic";

interface HelpCentreSingleTopicProps {
  topic: SingleTopic | undefined;
}

const liCss = (questionIndex: number) => css`
  ${linkListItemStyle};
  border-top: ${questionIndex === 0 ? "1px solid #DCDCDC" : "none"};
`;

const HelpCentreSingleTopic = (props: HelpCentreSingleTopicProps) => {
  return (
    <ul css={linksListStyle}>
      {props.topic?.articles?.map((question, questionIndex) => (
        <li
          key={`${props.topic?.title}Question-${questionIndex}`}
          css={liCss(questionIndex)}
        >
          <a
            // add path to article page here
            // href={question.path}
            target="_blank"
            css={linkAnchorStyle}
            onClick={() => {
              trackEvent({
                eventCategory: "help-centre",
                eventAction: "popular-topic-q-click",
                eventLabel: `${props.topic?.title}-${question.title}`
              });
            }}
          >
            {question.title}
          </a>
          <span css={linkArrowStyle} />
        </li>
      ))}
    </ul>
  );
};

export default HelpCentreSingleTopic;
