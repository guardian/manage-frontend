import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, neutral } from "@guardian/src-foundations/palette";
import { headline } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { trackEvent } from "../analytics";
import { Button } from "../buttons";
import { SectionHeader } from "../sectionHeader";
import { SectionPageContainer } from "../sectionPageContainer";
import { helpCentreConfig, helpCentreNavConfig } from "./helpCentreConfig";
import { HelpCentreMoreTopics } from "./helpCentreMoreTopics";
import {
  linkAnchorStyle,
  linkArrowStyle,
  linkListItemStyle,
  linksListStyle
} from "./helpCentreStyles";

interface HelpCentreProps extends RouteComponentProps {
  topicCode?: string;
}

const h2Css = css`
  margin: 0 ${space[3]}px ${space[9]}px ${space[3]}px;
  border-top: 1px solid ${neutral["86"]};
  ${headline.small({ fontWeight: "bold" })}
`;

const liCss = (questionIndex: number) => css`
  ${linkListItemStyle};
  border-top: ${questionIndex === 0 ? "1px solid #DCDCDC" : "none"};
`;

const divCss = css`
  margin: 67px ${space[3]}px 0 ${space[3]}px;
`;

const buttonDivCss = css`
  margin-top: ${space[4]}px;
  padding-top: ${space[4]}px;
  border-top: 1px solid ${neutral["86"]};
`;

const HelpCentreSeeAll = (props: HelpCentreProps) => {
  const selectedTopicObject = helpCentreNavConfig.find(
    topic => topic.id === props.topicCode
  );

  const helpCentreConfigObject = helpCentreConfig.find(
    topic => topic.id === selectedTopicObject?.id
  );

  return (
    <>
      <SectionHeader title="How can we help you?" isArticlePage={true} />
      <SectionPageContainer
        hasNav={true}
        selectedTopicObject={selectedTopicObject}
      >
        <div
          css={css`
            margin-bottom: ${space[24]}px;
          `}
        >
          <h2 css={h2Css}>{selectedTopicObject?.title}</h2>
          {helpCentreConfigObject && (
            <ul css={linksListStyle}>
              {helpCentreConfigObject.links.map((question, questionIndex) => (
                <li
                  key={`${helpCentreConfigObject.id}Question-${questionIndex}`}
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
                        eventLabel: `${helpCentreConfigObject.id}-${question.id}`
                      });
                    }}
                  >
                    {question.title}
                  </a>
                  <span css={linkArrowStyle} />
                </li>
              ))}
            </ul>
          )}
          {!helpCentreConfigObject && <HelpCentreMoreTopics />}
          <div css={divCss}>
            <div css={buttonDivCss}>
              <a href="/help-centre">
                <Button
                  text={"Back to Help Centre"}
                  fontWeight={"bold"}
                  textColour={`${brand["400"]}`}
                  colour={`${brand["800"]}`}
                  left={true}
                />
              </a>
            </div>
          </div>
        </div>
      </SectionPageContainer>
    </>
  );
};

export default HelpCentreSeeAll;
