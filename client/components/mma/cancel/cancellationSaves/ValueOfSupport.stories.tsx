import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ValueOfSupport } from './ValueOfSupport';

export default {
	title: 'Pages/CancellationSave',
	component: ValueOfSupport,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof ValueOfSupport>;

export const Default: ComponentStory<typeof ValueOfSupport> = () => {
	return <ValueOfSupport />;
};
