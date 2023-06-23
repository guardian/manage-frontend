import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import { contributionPaidByPayPal } from '../../../../fixtures/productBuilder/testProducts';
import { SwitchContainer } from '../SwitchContainer';
import { SwitchComplete } from './SwitchComplete';

export default {
	title: 'Pages/SwitchComplete',
	component: SwitchContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail: contributionPaidByPayPal(),
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
	JSON.stringify(contributionPaidByPayPal()),
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

export const FromApp: ComponentStory<typeof SwitchComplete> = () => (
	<SwitchComplete />
);

FromApp.parameters = {
	reactRouter: {
		container: <SwitchContainer isFromApp={true} />,
	},
};
