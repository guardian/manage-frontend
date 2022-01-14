import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Maintenance from "./maintenance";

export default {
  title: "Views/Maintenance",
  component: Maintenance,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Maintenance>;

const Template: ComponentStory<typeof Maintenance> = () => <Maintenance />;

export const Default = Template.bind({});
