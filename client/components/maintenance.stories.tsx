import { ComponentMeta, ComponentStory } from '@storybook/react';
import Maintenance from './maintenance';

export default {
	title: 'Pages/Maintenance',
	component: Maintenance,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof Maintenance>;

export const Default: ComponentStory<typeof Maintenance> = () => (
	<Maintenance />
);
