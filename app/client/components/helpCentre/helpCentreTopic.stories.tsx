import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchMock from "fetch-mock";

import { SectionContent } from "../sectionContent";
import { SectionHeader } from "../sectionHeader";
import HelpCentreTopic, { HelpCentreTopicProps } from "./helpCentreTopic";

export default {
  title: "Pages/HelpCentreTopic",
  component: HelpCentreTopic,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HelpCentreTopic>;

const topicContent = {
  path: "delivery",
  title: "Delivery",
  articles: [
    {
      path: "i-need-to-pause-my-delivery",
      title: "I need to pause my delivery",
    },
    {
      path: "my-delivery-is-late-or-missing",
      title: "My delivery is late or missing",
    },
    {
      path: "my-paper-is-missing-a-section",
      title: "My paper is missing a section",
    },
  ],
};

export const Default: ComponentStory<typeof HelpCentreTopic> = (
  _: HelpCentreTopicProps
) => {
  fetchMock
    .restore()
    .get("/api/help-centre/topic/delivery", { body: topicContent });

  return (
    <>
      <SectionHeader title="How can we help you?" pageHasNav={true} />
      <SectionContent hasNav={true}>
        <HelpCentreTopic topicCode="delivery" />
      </SectionContent>
    </>
  );
};
