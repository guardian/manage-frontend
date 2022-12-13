import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { CallCentreNumbersProps } from './CallCentreNumbers';
import { CallCentreNumbers } from './CallCentreNumbers';

export default {
	title: 'Components/CallCentreNumbers',
	component: CallCentreNumbers,
	args: {
		prefixText: '',
	},
} as ComponentMeta<typeof CallCentreNumbers>;

const Template: ComponentStory<typeof CallCentreNumbers> = (
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
