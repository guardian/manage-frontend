import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../../.storybook/ReactRouterDecorator';
import {
	contributionPaidByPayPal,
	contributionPaidByPayPalAboveSupporterPlusThreshold,
} from '../../../../fixtures/productBuilder/testProducts';
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
				productDetail:
					contributionPaidByPayPalAboveSupporterPlusThreshold(),
				user: { email: 'test@theguardian.com' },
				amountPayableToday: 5.9,
				nextPaymentDate: '20 March',
			},
			container: <SwitchContainer />,
		},
	},
} as Meta<typeof SwitchContainer>;

export const Default: StoryFn<typeof SwitchComplete> = () => <SwitchComplete />;

export const YearlyOtherCurrency: StoryObj<typeof SwitchComplete> = {
	render: () => <SwitchComplete />,

	parameters: {
		reactRouter: {
			state: { productDetail: contributionPaidByPayPal() },
		},
	},
};

export const FromApp: StoryObj<typeof SwitchComplete> = {
	render: () => <SwitchComplete />,

	parameters: {
		reactRouter: {
			container: <SwitchContainer isFromApp={true} />,
		},
	},
};
