import type { Meta, StoryObj } from '@storybook/react';
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

export const Default: StoryObj<typeof SwitchReview> = {
	render: () => <SwitchReview />,

	parameters: {
		reactRouter: {
			state: { productDetail: contributionPaidByCard() },
		},
	},
};

export const WithPayPalPayment: StoryObj<typeof SwitchReview> = {
	render: () => <SwitchReview />,

	parameters: {
		reactRouter: {
			state: { productDetail: contributionPaidByPayPal() },
		},
	},
};

export const WithDirectDebitPayment: StoryObj<typeof SwitchReview> = {
	render: () => <SwitchReview />,

	parameters: {
		reactRouter: {
			state: { productDetail: contributionPaidByDirectDebit() },
		},
	},
};

export const WithSEPAPayment: StoryObj<typeof SwitchReview> = {
	render: () => <SwitchReview />,

	parameters: {
		reactRouter: {
			state: { productDetail: contributionPaidBySepa() },
		},
	},
};

export const YearlyOtherCurrency: StoryObj<typeof SwitchReview> = {
	render: () => <SwitchReview />,

	parameters: {
		reactRouter: {
			state: {
				productDetail: annualContributionPaidByCardWithCurrency('NZD'),
			},
		},
	},
};

export const FromApp: StoryObj<typeof SwitchReview> = {
	render: () => <SwitchReview />,

	parameters: {
		reactRouter: {
			container: <SwitchContainer isFromApp={true} />,
			state: { productDetail: contributionPaidByCard() },
		},
	},
};
