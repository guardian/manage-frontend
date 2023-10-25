import type { Meta } from '@storybook/react';
import { OverlayLoader } from './OverlayLoader';

export default {
	title: 'Components/OverlayLoader',
	component: OverlayLoader,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		message: 'Updating payment details...',
	},
} as Meta<typeof OverlayLoader>;

export const Default = {};
