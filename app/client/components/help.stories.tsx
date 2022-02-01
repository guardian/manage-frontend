import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Help from "./help";

export default {
  title: "Pages/Help",
  component: Help,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
    chromatic: {
      viewports: [320, 1300],
    },
  },
} as ComponentMeta<typeof Help>;

export const Default: ComponentStory<typeof Help> = () => <Help />;
