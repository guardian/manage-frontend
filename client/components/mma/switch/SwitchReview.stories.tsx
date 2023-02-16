import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { contributionPayPal } from '../../../fixtures/productDetail';
import { productMovePreviewResponse } from '../../../fixtures/productMove';
import { SwitchContainer } from './SwitchContainer';
import { SwitchReview } from './SwitchReview';

export default {
	title: 'Pages/SwitchReview',
	component: SwitchContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: { productDetail: contributionPayPal },
			container: <SwitchContainer />,
		},
		msw: [
			rest.post('/api/product-move/*', (_req, res, ctx) => {
				return res(ctx.json(productMovePreviewResponse));
			}),
		],
	},
} as ComponentMeta<typeof SwitchContainer>;

export const Default: ComponentStory<typeof SwitchReview> = () => (
	<SwitchReview />
);

export const YearlyOtherCurrency: ComponentStory<typeof SwitchReview> = () => (
	<SwitchReview />
);

const contributionBelowThreshold = JSON.parse(
	JSON.stringify(contributionPayPal),
);
const plan = contributionBelowThreshold.subscription.currentPlans[0];
plan.price = 300;
plan.currency = '$';
plan.billingPeriod = 'year';
plan.currencyISO = 'NZD';

YearlyOtherCurrency.parameters = {
	reactRouter: {
		state: { productDetail: contributionBelowThreshold },
	},
};
