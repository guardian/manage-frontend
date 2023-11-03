import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import type { MainProps } from './Main';
import { Main } from './Main';

export default {
	title: 'Layouts/Main',
	component: Main,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		signInStatus: 'init',
		requiresSignIn: false,
		helpCentrePage: false,
	},
	argTypes: {
		signInStatus: {
			options: ['init', 'signedOut', 'signedIn'],
			control: { type: 'select' },
		},
	},
} as Meta<typeof Main>;

const Template: StoryFn<typeof Main> = (args: MainProps) => (
	<Main {...args}>
		<h1>Main content</h1>
	</Main>
);

export const SignedOut = {
	render: Template,

	args: {
		signInStatus: 'signedOut',
	},
};

export const SignedIn = {
	render: Template,

	args: {
		signInStatus: 'signedIn',
	},
};

export const HelpCentreSignedOut = {
	render: Template,

	args: {
		signInStatus: 'signedOut',
	},
};

export const HelpCentreSignedIn = {
	render: Template,

	args: {
		signInStatus: 'signedIn',
	},
};
