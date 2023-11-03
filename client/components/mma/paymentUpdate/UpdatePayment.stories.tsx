import type { Meta, StoryObj } from '@storybook/react';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	guardianWeeklyExpiredCard,
	guardianWeeklyPaidByCard,
	newspaperVoucherPaidByPaypal,
} from '../../../fixtures/productBuilder/testProducts';
import { PaymentDetailUpdate } from './PaymentDetailUpdate';
import { PaymentDetailUpdateContainer } from './PaymentDetailUpdateContainer';

export default {
	component: PaymentDetailUpdateContainer,
	title: 'Pages/UpdatePayment',
	decorators: [ReactRouterDecorator],
} as Meta<typeof PaymentDetailUpdateContainer>;

const setSiteKey = () => {
	// @ts-expect-error set the recaptcha key in the window for the recaptcha to render
	window.guardian = {
		recaptchaPublicKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
	};
};

export const GuardianWeeklyCard: StoryObj<typeof PaymentDetailUpdate> = {
	render: () => {
		setSiteKey();
		return (
			<PaymentDetailUpdate productType={PRODUCT_TYPES.guardianweekly} />
		);
	},

	parameters: {
		reactRouter: {
			state: {
				productDetail: guardianWeeklyPaidByCard(),
			},
			container: (
				<PaymentDetailUpdateContainer
					productType={PRODUCT_TYPES.guardianweekly}
				/>
			),
		},
	},
};

export const NewspaperVoucherPaypal: StoryObj<typeof PaymentDetailUpdate> = {
	render: () => {
		setSiteKey();
		return <PaymentDetailUpdate productType={PRODUCT_TYPES.voucher} />;
	},

	parameters: {
		reactRouter: {
			state: {
				productDetail: newspaperVoucherPaidByPaypal(),
			},
			container: (
				<PaymentDetailUpdateContainer
					productType={PRODUCT_TYPES.voucher}
				/>
			),
		},
	},
};

export const GuardianWeeklyExpiredCard: StoryObj<typeof PaymentDetailUpdate> = {
	render: () => {
		setSiteKey();
		return (
			<PaymentDetailUpdate productType={PRODUCT_TYPES.guardianweekly} />
		);
	},

	parameters: {
		reactRouter: {
			state: { productDetail: guardianWeeklyExpiredCard() },
			container: (
				<PaymentDetailUpdateContainer
					productType={PRODUCT_TYPES.guardianweekly}
				/>
			),
		},
	},
};
