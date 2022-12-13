import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { OverlayLoaderProps } from './OverlayLoader';
import OverlayLoader from './OverlayLoader';

export default {
	title: 'Components/OverlayLoader',
	component: OverlayLoader,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		message: 'Updating payment details...',
	},
} as ComponentMeta<typeof OverlayLoader>;

const Template: ComponentStory<typeof OverlayLoader> = (
	args: OverlayLoaderProps,
) => <OverlayLoader {...args} />;

export const Default = Template.bind({});
