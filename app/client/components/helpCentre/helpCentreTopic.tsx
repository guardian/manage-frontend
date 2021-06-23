import { navigate, RouteComponentProps } from "@reach/router";
import { captureException, captureMessage } from "@sentry/browser";
import React, { useEffect, useState } from "react";
import { SelectedTopicObjectContext } from "../sectionContent";
import { Spinner } from "../spinner";
import { WithStandardTopMargin } from "../WithStandardTopMargin";
import { BackToHelpCentreButton } from "./BackToHelpCentreButton";
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
          captureMessage(
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
        captureException(
          `Failed to fetch topic ${props.topicCode}. Error: ${error}`
        )
      );
  }, [props.topicCode]);

  const setSelectedTopicObject = React.useContext(SelectedTopicObjectContext);
  useEffect(() => {
    setSelectedTopicObject(props.topicCode);
  }, []);

  return (
    <>
      {getTopicComponent(props.topicCode, singleTopic, moreTopics)}
      <BackToHelpCentreButton />
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
