import { ComponentMeta, ComponentStory } from '@storybook/react';
import OverlayLoader, { OverlayLoaderProps } from './OverlayLoader';

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
