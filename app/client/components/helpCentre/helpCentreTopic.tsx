import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, neutral } from "@guardian/src-foundations/palette";
import { headline } from "@guardian/src-foundations/typography";
import { navigate, RouteComponentProps } from "@reach/router";
import * as Sentry from "@sentry/browser";
import React, { useEffect, useState } from "react";
import { Button } from "../buttons";
import { SectionContent } from "../sectionContent";
import { SectionHeader } from "../sectionHeader";
import { Spinner } from "../spinner";
import { WithStandardTopMargin } from "../WithStandardTopMargin";
import { helpCentreNavConfig } from "./helpCentreConfig";
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

interface Article {
  path: string;
  title: string;
}

export interface SingleTopic {
  title: string;
  articles: Article[];
}

interface MoreTopics {
  title: string;
  topics: SingleTopic[];
}

const HelpCentreTopic = (props: HelpCentreTopicProps) => {
  const [singleTopic, setSingleTopic] = useState<SingleTopic | undefined>(
    undefined
  );
  const [moreTopics, setMoreTopics] = useState<MoreTopics | undefined>(
    undefined
  );

  const navTopics = helpCentreNavConfig.map(topic => topic.id);

  if (props.topicCode && !navTopics.includes(props.topicCode)) {
    navigate("/help-centre");
  }

  useEffect(() => {
    fetch(`/api/help-centre/topics/${props.topicCode}`)
      .then(response => response.ok && response.json())
      .then(topicData => {
        props.topicCode === "more-topics"
          ? setMoreTopics(topicData as MoreTopics)
          : setSingleTopic(topicData as SingleTopic);
      })
      .catch(error =>
        Sentry.captureException(`Failed to fetch topic, error: ${error}`)
      );
  }, [props.topicCode]);

  const selectedNavTopic = helpCentreNavConfig.find(
    topic => topic.id === props.topicCode
  );

  const Loading = () => (
    <WithStandardTopMargin>
      <Spinner loadingMessage={"Fetching topic..."} />
    </WithStandardTopMargin>
  );

  const selectedTopic =
    props.topicCode === "more-topics" ? (
      <HelpCentreMoreTopics />
    ) : (
      <HelpCentreSingleTopic topic={singleTopic} />
    );

  return (
    <>
      <SectionHeader title="How can we help you?" pageHasNav={true} />
      <SectionContent hasNav={true} selectedTopicObject={selectedNavTopic}>
        <div
          css={css`
            margin-bottom: ${space[24]}px;
          `}
        >
          <h2 css={h2Css}>
            {props.topicCode === "more-topics"
              ? "More Topics"
              : singleTopic?.title}
          </h2>
          {!singleTopic && !moreTopics ? (
            <Loading />
          ) : (
            <>
              {selectedTopic}
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
            </>
          )}
        </div>
      </SectionContent>
    </>
  );
};

export default HelpCentreTopic;
