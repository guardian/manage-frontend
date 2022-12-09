import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Footer } from './Footer';

export default {
	title: 'Components/Footer',
	component: Footer,
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			viewports: [320, 740, 1300],
		},
	},
} as ComponentMeta<typeof Footer>;

export const Default: ComponentStory<typeof Footer> = () => <Footer />;
