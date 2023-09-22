import type { Meta, StoryFn } from '@storybook/react';
import type { CallCentreNumbersProps } from './CallCentreNumbers';
import { CallCentreNumbers } from './CallCentreNumbers';

export default {
	title: 'Components/CallCentreNumbers',
	component: CallCentreNumbers,
	args: {
		prefixText: '',
	},
} as Meta<typeof CallCentreNumbers>;

const Template: StoryFn<typeof CallCentreNumbers> = (
	args: CallCentreNumbersProps,
) => {
	return <CallCentreNumbers {...args} />;
};

export const Default = Template.bind({});

export const WithCustomPrefix = Template.bind({});
WithCustomPrefix.args = {
	prefixText:
		'If you’re not sure what’s best for you or would like help, to contact us',
};
