import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Maintenance from "./maintenance";

export default {
  title: "Pages/Maintenance",
  component: Maintenance,
  parameters: {
    controls: { disabled: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Maintenance>;

export const Default: ComponentStory<typeof Maintenance> = () => (
  <Maintenance />
);
