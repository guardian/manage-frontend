import { ComponentMeta, ComponentStory } from "@storybook/react";

import { HelpCentrePhoneNumbers } from "./helpCentrePhoneNumbers";

export default {
  title: "HelpCentrePhoneNumbers",
  component: HelpCentrePhoneNumbers,
} as ComponentMeta<typeof HelpCentrePhoneNumbers>;

const Template: ComponentStory<typeof HelpCentrePhoneNumbers> = () => (
  <HelpCentrePhoneNumbers />
);

export const Demo = Template.bind({});
