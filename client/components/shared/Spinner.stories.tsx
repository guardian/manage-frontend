import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { LoadingProps } from './Spinner';
import { Spinner } from './Spinner';

export default {
	title: 'Components/Spinner',
	component: Spinner,
	args: {
		loadingMessage: '',
		scale: 1,
		inline: undefined,
		alignCenter: undefined,
	},
	argTypes: {
		inline: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
		alignCenter: {
			options: [true, undefined],
			control: { type: 'inline-radio' },
		},
	},
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args: LoadingProps) => (
	<Spinner {...args} />
);

export const Default = Template.bind({});

export const Scaled = Template.bind({});
Scaled.args = {
	scale: 2,
};

export const WithLoadingMessage = Template.bind({});
WithLoadingMessage.args = {
	loadingMessage: 'Loading your account details...',
};