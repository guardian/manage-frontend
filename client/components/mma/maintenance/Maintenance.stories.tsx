import type { Meta, StoryFn } from '@storybook/react';
import { Maintenance } from './Maintenance';

export default {
	title: 'Pages/Maintenance',
	component: Maintenance,
	parameters: {
		layout: 'fullscreen',
	},
} as Meta<typeof Maintenance>;

export const Default: StoryFn<typeof Maintenance> = () => <Maintenance />;
