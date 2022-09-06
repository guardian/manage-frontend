import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router';

import Help from './help';

export default {
	title: 'Pages/Help',
	component: Help,
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			viewports: [320, 1300],
		},
	},
} as ComponentMeta<typeof Help>;

export const Default: ComponentStory<typeof Help> = () => (
	<MemoryRouter>
		<Help />
	</MemoryRouter>
);
