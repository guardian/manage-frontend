import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  HelpCentrePhoneNumbers,
  HelpCentrePhoneNumbersProps,
} from "./helpCentrePhoneNumbers";

export default {
  title: "HelpCentrePhoneNumbers",
  component: HelpCentrePhoneNumbers,
  args: {
    compactLayout: false,
  },
} as ComponentMeta<typeof HelpCentrePhoneNumbers>;

const Template: ComponentStory<typeof HelpCentrePhoneNumbers> = (
  args: HelpCentrePhoneNumbersProps
) => <HelpCentrePhoneNumbers {...args} />;

export const Default = Template.bind({});
