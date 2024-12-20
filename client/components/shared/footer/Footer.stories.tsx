import type { Meta, StoryFn } from '@storybook/react';
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

export const Default: StoryFn<typeof Footer> = () => <Footer />;

export const WithoutSupport: StoryFn<typeof Footer> = () => (
	<Footer hideSupport />
);

export const Minimal: StoryFn<typeof MinimalFooter> = () => <MinimalFooter />;
