import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchMock from "fetch-mock";

import { Main } from "../main";
import { HelpCenterContentWrapper } from "../HelpCenterContentWrapper";
import HelpCentre from "./helpCentre";

export default {
  title: "Pages/HelpCentre",
  component: HelpCentre,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HelpCentre>;

export const Default: ComponentStory<typeof HelpCentre> = () => {
  fetchMock.restore().get("/api/known-issues/", { body: [] });

  return (
    <Main helpCentrePage={true} signInStatus="signedOut">
      <HelpCenterContentWrapper>
        <HelpCentre />
      </HelpCenterContentWrapper>
    </Main>
  );
};

export const WithKnownIssue: ComponentStory<typeof HelpCentre> = () => {
  const knownIssue = [
    {
      date: "20 Jan 2022 12:00",
      message: "Live Chat is currently unavailable.",
    },
  ];

  fetchMock.restore().get("/api/known-issues/", { body: knownIssue });

  return (
    <Main helpCentrePage={true} signInStatus="signedOut">
      <HelpCenterContentWrapper>
        <HelpCentre />
      </HelpCenterContentWrapper>
    </Main>
  );
};
