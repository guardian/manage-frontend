import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { contribution } from '../../../fixtures/productDetail';
import { SwitchComplete } from './SwitchComplete';
import { SwitchContainer } from './SwitchContainer';

export default {
	title: 'Pages/SwitchComplete',
	component: SwitchContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: { productDetail: contribution },
			container: <SwitchContainer />,
		},
	},
} as ComponentMeta<typeof SwitchContainer>;

export const Default: ComponentStory<typeof SwitchComplete> = () => (
	<SwitchComplete />
);