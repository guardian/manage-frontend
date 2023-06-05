import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import {
	contributionPaidByCard,
	contributionPaidByPayPal,
} from '../../../../fixtures/productBuilder/testProducts';
import {
	contributionDirectDebit,
	contributionSepa,
} from '../../../../fixtures/productDetail';
import { productMovePreviewResponse } from '../../../../fixtures/productMove';
import { SwitchContainer } from '../SwitchContainer';
import { SwitchReview } from './SwitchReview';

export default {
	title: 'Pages/SwitchReview',
	component: SwitchContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
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
// We're not setting `state` in the component-level parameters above due to how
// parameters on individual stories are merged with these. This doesn't
// necessarily cause an issue, but in the case of payments different properties
// are used for different payment methods. If the default state includes a card
// payment and we override the state in another story with a PayPal payment the
// card payment properties will still be present in addition to the PayPal
// payment properties due to the merge. This can lead to unintended UI issues
// such as multiple payment methods being displayed.
Default.parameters = {
	reactRouter: {
		state: { productDetail: contributionPaidByCard() },
	},
};

export const WithPayPalPayment: ComponentStory<typeof SwitchReview> = () => (
	<SwitchReview />
);
WithPayPalPayment.parameters = {
	reactRouter: {
		state: { productDetail: contributionPaidByPayPal() },
	},
};

export const WithDirectDebitPayment: ComponentStory<
	typeof SwitchReview
> = () => <SwitchReview />;
WithDirectDebitPayment.parameters = {
	reactRouter: {
		state: { productDetail: contributionDirectDebit },
	},
};

export const WithSEPAPayment: ComponentStory<typeof SwitchReview> = () => (
	<SwitchReview />
);
WithSEPAPayment.parameters = {
	reactRouter: {
		state: { productDetail: contributionSepa },
	},
};

export const YearlyOtherCurrency: ComponentStory<typeof SwitchReview> = () => (
	<SwitchReview />
);

const contributionBelowThreshold = JSON.parse(
	JSON.stringify(contributionPaidByCard()),
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

export const FromApp: ComponentStory<typeof SwitchReview> = () => (
	<SwitchReview />
);

FromApp.parameters = {
	reactRouter: {
		container: <SwitchContainer isFromApp={true} />,
		state: { productDetail: contributionPaidByCard() },
	},
};
