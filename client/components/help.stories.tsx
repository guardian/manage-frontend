import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactRouterDecorator } from '../../.storybook/ReactRouterDecorator';

import Help from './help';

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
} as ComponentMeta<typeof Help>;

export const Default: ComponentStory<typeof Help> = () => <Help />;
