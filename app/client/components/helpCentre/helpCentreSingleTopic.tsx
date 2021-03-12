import { css } from "@emotion/core";
import React from "react";
import { trackEvent } from "../analytics";
import { HelpCentreTopic } from "./helpCentreConfig";
import {
  linkAnchorStyle,
  linkArrowStyle,
  linkListItemStyle,
  linksListStyle
} from "./helpCentreStyles";

interface HelpCentreSingleTopicProps {
  selectedHelpCentreConfigTopic: HelpCentreTopic;
}

const liCss = (questionIndex: number) => css`
  ${linkListItemStyle};
  border-top: ${questionIndex === 0 ? "1px solid #DCDCDC" : "none"};
`;

const HelpCentreSingleTopic = (props: HelpCentreSingleTopicProps) => {
  return (
    <ul css={linksListStyle}>
      {props.selectedHelpCentreConfigTopic.links.map(
        (question, questionIndex) => (
          <li
            key={`${props.selectedHelpCentreConfigTopic.id}Question-${questionIndex}`}
            css={liCss(questionIndex)}
          >
            <a
              href={question.link}
              target="_blank"
              css={linkAnchorStyle}
              onClick={() => {
                trackEvent({
                  eventCategory: "help-centre",
                  eventAction: "popular-topic-q-click",
                  eventLabel: `${props.selectedHelpCentreConfigTopic.id}-${question.id}`
                });
              }}
            >
              {question.title}
            </a>
            <span css={linkArrowStyle} />
          </li>
        )
      )}
    </ul>
  );
};

export default HelpCentreSingleTopic;
