import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Spinner, LoadingProps } from './spinner';

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
