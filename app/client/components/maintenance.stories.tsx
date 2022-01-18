import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Main } from "./main";
import Maintenance from "./maintenance";

export default {
  title: "Pages/Maintenance",
  component: Maintenance,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Maintenance>;

const Template: ComponentStory<typeof Maintenance> = () => (
  <Main signInStatus="signedOut">
    <Maintenance />
  </Main>
);

export const Default = Template.bind({});
