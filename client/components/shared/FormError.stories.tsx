import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { FormErrorProps } from './FormError';
import { FormError } from './FormError';

export default {
	title: 'Components/FormError',
	component: FormError,
	args: {
		title: 'Something went wrong when submitting your form',
		messages: [
			'Please try again or if the problem persists please contact Customer Service',
		],
	},
} as ComponentMeta<typeof FormError>;

const Template: ComponentStory<typeof FormError> = (args: FormErrorProps) => {
	return <FormError {...args} />;
};

export const Default = Template.bind({});
