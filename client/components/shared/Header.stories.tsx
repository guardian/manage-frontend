import type { Meta } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
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

export const Initial = {};

export const SignedOut = {
	args: {
		signInStatus: 'signedOut',
	},
};

export const SignedIn = {
	args: {
		signInStatus: 'signedIn',
	},
};
