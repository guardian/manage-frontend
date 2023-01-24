import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { contribution } from '../../../fixtures/productDetail';
import { switchPreview } from '../../../fixtures/switchPreview';
import { SwitchContainer } from './SwitchContainer';
import { SwitchReview } from './SwitchReview';

export default {
	title: 'Pages/SwitchReview',
	component: SwitchContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: { productDetail: contribution },
			container: <SwitchContainer />,
		},
		msw: [
			rest.post('/api/product-move/*', (_req, res, ctx) => {
				return res(ctx.json(switchPreview));
			}),
		],
	},
} as ComponentMeta<typeof SwitchContainer>;

export const Default: ComponentStory<typeof SwitchReview> = () => (
	<SwitchReview />
);
