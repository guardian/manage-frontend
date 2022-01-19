import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Main } from "./main";
import Help from "./help";

export default {
  title: "Pages/Help",
  component: Help,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Help>;

export const Default: ComponentStory<typeof Help> = () => (
  <Main signInStatus="signedIn">
    <Help />
  </Main>
);
