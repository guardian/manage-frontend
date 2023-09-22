import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import type { HeaderProps } from './Header';
import { Header } from './Header';

export default {
	title: 'Components/Header',
	component: Header,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		signInStatus: 'init',
	},
	argTypes: {
		signInStatus: {
			options: ['init', 'signedOut', 'signedIn'],
			control: { type: 'select' },
		},
	},
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args: HeaderProps) => (
	<Header {...args} />
);

export const Initial = Template.bind({});

export const SignedOut = Template.bind({});
SignedOut.args = {
	signInStatus: 'signedOut',
};

export const SignedIn = Template.bind({});
SignedIn.args = {
	signInStatus: 'signedIn',
};
