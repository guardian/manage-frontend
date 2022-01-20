import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchMock from "fetch-mock";

import { Main } from "./main";
import CancelReminders, { CancelRemindersProps } from "./cancelReminders";

export default {
  title: "Pages/CancelReminders",
  component: CancelReminders,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CancelReminders>;

export const Error: ComponentStory<typeof CancelReminders> = (
  _: CancelRemindersProps
) => {
  fetchMock.restore().post("/api/reminders/cancel", 500);

  return (
    <Main signInStatus="signedIn">
      <CancelReminders reminderCode="123" />
    </Main>
  );
};

export const Success: ComponentStory<typeof CancelReminders> = (
  _: CancelRemindersProps
) => {
  fetchMock.restore().post("/api/reminders/cancel", 200);

  return (
    <Main signInStatus="signedIn">
      <CancelReminders reminderCode="123" />
    </Main>
  );
};
