import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Footer } from "./footer";

export default {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer />;

export const Default = Template.bind({});
