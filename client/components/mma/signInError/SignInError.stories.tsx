import type { Meta, StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { SignInError } from './SignInError';

export default {
	title: 'Pages/SignInError',
	component: SignInError,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof SignInError>;

export const Default: StoryFn<typeof SignInError> = () => <SignInError />;
