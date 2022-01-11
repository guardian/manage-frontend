import { ComponentStory } from "@storybook/react";
import React from "react";

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
};

const Template: ComponentStory<typeof HelpCentrePhoneNumbers> = (
  props: HelpCentrePhoneNumbersProps
) => <HelpCentrePhoneNumbers {...props} />;

export const Default = Template.bind({});
