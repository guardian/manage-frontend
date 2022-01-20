import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchMock from "fetch-mock";

import Settings from "./";
import { idapiUser } from "../../../fixtures/idapiUser";

export default {
  title: "Pages/Settings",
  component: Settings,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Settings>;

export const Default: ComponentStory<typeof Settings> = () => {
  fetchMock.restore().get("/idapi/user", { body: idapiUser });

  return <Settings />;
};
