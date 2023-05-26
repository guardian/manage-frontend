import type { ComponentStory, Meta } from '@storybook/react';
import { Footer } from './Footer';
import { MinimalFooter } from './MinimalFooter';

export default {
	title: 'Components/Footer',
	component: Footer,
	parameters: {
		layout: 'fullscreen',
		chromatic: {
			viewports: [320, 740, 1300],
		},
	},
} as Meta;

export const Default: ComponentStory<typeof Footer> = () => <Footer />;

export const Minimal: ComponentStory<typeof MinimalFooter> = () => (
	<MinimalFooter />
);
