import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchMock from "fetch-mock";

import { SectionContent } from "../sectionContent";
import { SectionHeader } from "../sectionHeader";
import HelpCentreArticle, { HelpCentreArticleProps } from "./helpCentreArticle";

export default {
  title: "Pages/HelpCentreArticle",
  component: HelpCentreArticle,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HelpCentreArticle>;

const articleContent = {
  title: "I need to pause my delivery",
  body: [
    {
      element: "p",
      content: [
        {
          element: "text",
          content:
            "All our print subscribers can apply a holiday suspension to their subscription and get credited the cost for the suspended issues on their next bill date.",
        },
      ],
    },
  ],
  path: "i-need-to-pause-my-delivery",
  topics: [
    {
      path: "delivery",
      title: "Delivery",
    },
  ],
};

export const Default: ComponentStory<typeof HelpCentreArticle> = (
  _: HelpCentreArticleProps
) => {
  fetchMock
    .restore()
    .get("/api/known-issues/", { body: [] })
    .get("/api/help-centre/article/i-need-to-pause-my-delivery", {
      body: articleContent,
    });

  return (
    <>
      <SectionHeader title="How can we help you?" pageHasNav={true} />
      <SectionContent hasNav={true}>
        <HelpCentreArticle articleCode="i-need-to-pause-my-delivery" />
      </SectionContent>
    </>
  );
};
