import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { HelpCentrePhoneNumbersProps } from './HelpCentrePhoneNumbers';
import { HelpCentrePhoneNumbers } from './HelpCentrePhoneNumbers';

export default {
	title: 'Components/Help Centre/Help Centre Phone Numbers',
	component: HelpCentrePhoneNumbers,
	args: {
		compactLayout: false,
	},
	parameters: {
		chromatic: {
			viewports: [320, 1300],
		},
	},
} as ComponentMeta<typeof HelpCentrePhoneNumbers>;

const Template: ComponentStory<typeof HelpCentrePhoneNumbers> = (
	args: HelpCentrePhoneNumbersProps,
) => <HelpCentrePhoneNumbers {...args} />;

export const Default = Template.bind({});

export const CompactLayout = Template.bind({});
CompactLayout.args = {
	compactLayout: true,
};