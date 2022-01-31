import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button, ButtonProps } from "./buttons";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    text: "Button",
    height: "",
    fontWeight: undefined,
    left: false,
    right: false,
    disabled: false,
    colour: undefined,
    textColour: undefined,
    primary: undefined,
    hide: false,
    forceCircle: undefined,
    hoverColour: undefined,
    leftTick: undefined,
    alert: false,
    type: "button",
  },
  argTypes: {
    fontWeight: {
      options: ["bold"],
    },
    primary: {
      control: { type: "boolean" },
    },
    hollow: {
      control: { type: "boolean" },
    },
    forceCircle: {
      control: { type: "boolean" },
    },
    leftTick: {
      control: { type: "boolean" },
    },
    colour: {
      control: { type: "color" },
    },
    textColour: {
      control: { type: "color" },
    },
    hoverColour: {
      control: { type: "color" },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};
