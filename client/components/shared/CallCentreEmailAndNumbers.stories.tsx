import type { Meta, StoryFn } from '@storybook/react';
import type { CallCentreEmailAndNumbersProps } from './CallCenterEmailAndNumbers';
import { CallCentreEmailAndNumbers } from './CallCenterEmailAndNumbers';

export default {
	title: 'Components/CallCentreEmailAndNumbers',
	component: CallCentreEmailAndNumbers,
	args: {
		prefixText: '',
		hideEmailAddress: false,
		compactLayout: false,
		phoneRegionFilterKeys: undefined,
	},
} as Meta<typeof CallCentreEmailAndNumbers>;

const Template: StoryFn<typeof CallCentreEmailAndNumbers> = (
	args: CallCentreEmailAndNumbersProps,
) => {
	return <CallCentreEmailAndNumbers {...args} />;
};

export const Default = Template.bind({});

export const WithEmailHidden = Template.bind({});
WithEmailHidden.args = {
	hideEmailAddress: true,
};

export const WithCompactLayout = Template.bind({});
WithCompactLayout.args = {
	compactLayout: true,
};
