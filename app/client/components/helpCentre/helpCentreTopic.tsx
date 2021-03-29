import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { navigate, RouteComponentProps } from "@reach/router";
import * as Sentry from "@sentry/browser";
import React, { useEffect, useState } from "react";
import { SectionContent } from "../sectionContent";
import { SectionHeader } from "../sectionHeader";
import { Spinner } from "../spinner";
import { WithStandardTopMargin } from "../WithStandardTopMargin";
import { BackToHelpCentreButton } from "./BackToHelpCentreButton";
import { helpCentreNavConfig } from "./helpCentreConfig";
import { HelpCentreMoreTopics } from "./helpCentreMoreTopics";
import { HelpCentreSingleTopic } from "./helpCentreSingleTopic";
import { MoreTopics, SingleTopic } from "./HelpCentreTypes";

interface HelpCentreTopicProps extends RouteComponentProps {
  topicCode?: string;
}

const HelpCentreTopic = (props: HelpCentreTopicProps) => {
  const [singleTopic, setSingleTopic] = useState<SingleTopic | undefined>(
    undefined
  );
  const [moreTopics, setMoreTopics] = useState<MoreTopics | undefined>(
    undefined
  );

  useEffect(() => {
    setSingleTopic(undefined);
    setMoreTopics(undefined);
    fetch(`/api/help-centre/topic/${props.topicCode}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          Sentry.captureMessage(
            `Fetching topic ${props.topicCode} returned ${response.status}.`
          );
          navigate("/help-centre");
        }
      })
      .then(topicData => {
        topicData.topics
          ? setMoreTopics(topicData as MoreTopics)
          : setSingleTopic(topicData as SingleTopic);
      })
      .catch(error =>
        Sentry.captureException(
          `Failed to fetch topic ${props.topicCode}. Error: ${error}`
        )
      );
  }, [props.topicCode]);

  const selectedNavTopic = helpCentreNavConfig.find(
    topic => topic.id === props.topicCode
  );

  return (
    <>
      <SectionHeader title="How can we help you?" pageHasNav={true} />
      <SectionContent hasNav={true} selectedTopicObject={selectedNavTopic}>
        <div
          css={css`
            margin: 0 ${space[3]}px ${space[24]}px ${space[3]}px;
          `}
        >
          {getTopicComponent(props.topicCode, singleTopic, moreTopics)}
          <BackToHelpCentreButton />
        </div>
      </SectionContent>
    </>
  );
};

const getTopicComponent = (
  topicCode: string | undefined,
  singleTopic: SingleTopic | undefined,
  moreTopics: MoreTopics | undefined
) => {
  if (singleTopic) {
    return <HelpCentreSingleTopic id={topicCode ?? ""} topic={singleTopic} />;
  }

  if (moreTopics) {
    return (
      <HelpCentreMoreTopics id={topicCode ?? ""} moreTopics={moreTopics} />
    );
  }

  return (
    <WithStandardTopMargin>
      <Spinner loadingMessage={"Fetching topic..."} />
    </WithStandardTopMargin>
  );
};

export default HelpCentreTopic;
