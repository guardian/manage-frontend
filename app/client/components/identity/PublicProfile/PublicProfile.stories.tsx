import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchMock from "fetch-mock";

import PublicProfile from "./";
import { idapiUser } from "../../../fixtures/idapiUser";

export default {
  title: "Pages/Profile",
  component: PublicProfile,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof PublicProfile>;

export const Default: ComponentStory<typeof PublicProfile> = () => {
  fetchMock.restore().get("/idapi/user", { body: idapiUser });

  return <PublicProfile />;
};
