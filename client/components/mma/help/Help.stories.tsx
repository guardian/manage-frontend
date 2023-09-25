import type { Meta , StoryFn } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { Help } from './Help';

export default {
	title: 'Pages/Help',
	component: Help,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			viewports: [320, 1300],
		},
	},
} as Meta<typeof Help>;

export const Default: StoryFn<typeof Help> = () => <Help />;
