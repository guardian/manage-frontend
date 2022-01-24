import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import HelpCentreHeader, { HelpCentreHeaderProps } from "./helpCentreHeader";

export default {
  title: "Components/Help Centre/Help Centre Header",
  component: HelpCentreHeader,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    signInStatus: "init",
  },
  argTypes: {
    signInStatus: {
      options: ["init", "signedOut", "signedIn"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof HelpCentreHeader>;

const Template: ComponentStory<typeof HelpCentreHeader> = (
  args: HelpCentreHeaderProps
) => <HelpCentreHeader {...args} />;

export const Initial = Template.bind({});

export const SignedOut = Template.bind({});
SignedOut.args = {
  signInStatus: "signedOut",
};

export const SignedIn = Template.bind({});
SignedIn.args = {
  signInStatus: "signedIn",
};
