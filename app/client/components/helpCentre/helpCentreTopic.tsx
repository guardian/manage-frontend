import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, neutral } from "@guardian/src-foundations/palette";
import { headline } from "@guardian/src-foundations/typography";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Button } from "../buttons";
import { SectionContent } from "../sectionContent";
import { SectionHeader } from "../sectionHeader";
import { helpCentreConfig, helpCentreNavConfig } from "./helpCentreConfig";
import { HelpCentreMoreTopics } from "./helpCentreMoreTopics";
import HelpCentreSingleTopic from "./helpCentreSingleTopic";

interface HelpCentreTopicProps extends RouteComponentProps {
  topicCode?: string;
}

const h2Css = css`
  margin: 0 ${space[3]}px ${space[9]}px ${space[3]}px;
  border-top: 1px solid ${neutral["86"]};
  ${headline.small({ fontWeight: "bold" })}
`;

const divCss = css`
  margin: 67px ${space[3]}px 0 ${space[3]}px;
`;

const buttonDivCss = css`
  margin-top: ${space[4]}px;
  padding-top: ${space[4]}px;
  border-top: 1px solid ${neutral["86"]};
`;

const HelpCentreTopic = (props: HelpCentreTopicProps) => {
  const selectedNavTopic = helpCentreNavConfig.find(
    topic => topic.id === props.topicCode
  );

  const selectedTopic = helpCentreConfig.find(
    topic => topic.id === selectedNavTopic?.id
  );

  let helpCentreTopicTitle;
  let helpCentreTopicContent;

  if (props.topicCode === "more-topics") {
    helpCentreTopicTitle = "More Topics";
    helpCentreTopicContent = <HelpCentreMoreTopics />;
  } else if (selectedTopic !== undefined) {
    helpCentreTopicTitle = selectedTopic.title;
    helpCentreTopicContent = <HelpCentreSingleTopic topic={selectedTopic} />;
  } else {
    helpCentreTopicTitle = "";
    helpCentreTopicContent = <div />;
  }

  return (
    <>
      <SectionHeader title="How can we help you?" pageHasNav={true} />
      <SectionContent hasNav={true} selectedTopicObject={selectedNavTopic}>
        <div
          css={css`
            margin-bottom: ${space[24]}px;
          `}
        >
          <h2 css={h2Css}>{helpCentreTopicTitle}</h2>
          {helpCentreTopicContent}
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
      </SectionContent>
    </>
  );
};

export default HelpCentreTopic;
