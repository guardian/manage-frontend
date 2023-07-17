import type { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import {
	annualContributionPaidByCardWithCurrency,
	contributionPaidByCard,
	contributionPaidByDirectDebit,
	contributionPaidByPayPal,
	contributionPaidBySepa,
} from '../../../../fixtures/productBuilder/testProducts';
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
} as Meta<typeof SwitchContainer>;

export const Default: StoryFn<typeof SwitchReview> = () => <SwitchReview />;
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

export const WithPayPalPayment: StoryFn<typeof SwitchReview> = () => (
	<SwitchReview />
);
WithPayPalPayment.parameters = {
	reactRouter: {
		state: { productDetail: contributionPaidByPayPal() },
	},
};

export const WithDirectDebitPayment: StoryFn<typeof SwitchReview> = () => (
	<SwitchReview />
);
WithDirectDebitPayment.parameters = {
	reactRouter: {
		state: { productDetail: contributionPaidByDirectDebit() },
	},
};

export const WithSEPAPayment: StoryFn<typeof SwitchReview> = () => (
	<SwitchReview />
);

WithSEPAPayment.parameters = {
	reactRouter: {
		state: { productDetail: contributionPaidBySepa() },
	},
};

export const YearlyOtherCurrency: StoryFn<typeof SwitchReview> = () => (
	<SwitchReview />
);

YearlyOtherCurrency.parameters = {
	reactRouter: {
		state: {
			productDetail: annualContributionPaidByCardWithCurrency('NZD'),
		},
	},
};

export const FromApp: StoryFn<typeof SwitchReview> = () => <SwitchReview />;

FromApp.parameters = {
	reactRouter: {
		container: <SwitchContainer isFromApp={true} />,
		state: { productDetail: contributionPaidByCard() },
	},
};
