import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { contributionPayPal } from '../../../fixtures/productDetail';
import { SwitchComplete } from './SwitchComplete';
import { SwitchContainer } from './SwitchContainer';

export default {
	title: 'Pages/SwitchComplete',
	component: SwitchContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail: contributionPayPal,
				user: { email: 'test@theguardian.com' },
				amountPayableToday: 5.9,
				nextPaymentDate: '20 March',
			},
			container: <SwitchContainer />,
		},
	},
} as ComponentMeta<typeof SwitchContainer>;

export const Default: ComponentStory<typeof SwitchComplete> = () => (
	<SwitchComplete />
);

export const YearlyOtherCurrency: ComponentStory<
	typeof SwitchComplete
> = () => <SwitchComplete />;

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
