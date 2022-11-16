import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactRouterDecorator } from '../../../../.storybook/ReactRouterDecorator';
import { PRODUCT_TYPES } from '../../../../shared/productTypes';
import {
	guardianWeeklyCard,
	guardianWeeklyExpiredCard,
	newspaperVoucherPaypal,
} from '../../../fixtures/productDetail';
import PaymentDetailUpdate from './PaymentDetailUpdate';
import PaymentDetailUpdateContainer from './PaymentDetailUpdateContainer';

export default {
	component: PaymentDetailUpdateContainer,
	title: 'Pages/UpdatePayment',
	decorators: [ReactRouterDecorator],
} as ComponentMeta<typeof PaymentDetailUpdateContainer>;

const setSiteKey = () => {
	// @ts-ignore set the recaptcha key in the window for the recaptcha to render
	window.guardian = {
		recaptchaPublicKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
	};
};

export const GuardianWeeklyCard: ComponentStory<
	typeof PaymentDetailUpdate
> = () => {
	setSiteKey();
	return <PaymentDetailUpdate productType={PRODUCT_TYPES.guardianweekly} />;
};

GuardianWeeklyCard.parameters = {
	reactRouter: {
		state: {
			productDetail: guardianWeeklyCard,
		},
		container: (
			<PaymentDetailUpdateContainer
				productType={PRODUCT_TYPES.guardianweekly}
			/>
		),
	},
};

export const NewspaperVoucherPaypal: ComponentStory<
	typeof PaymentDetailUpdate
> = () => {
	setSiteKey();
	return <PaymentDetailUpdate productType={PRODUCT_TYPES.voucher} />;
};

NewspaperVoucherPaypal.parameters = {
	reactRouter: {
		state: {
			productDetail: newspaperVoucherPaypal,
			obj: { a: 'B' },
		},
		container: (
			<PaymentDetailUpdateContainer productType={PRODUCT_TYPES.voucher} />
		),
	},
};

export const GuardianWeeklyExpiredCard: ComponentStory<
	typeof PaymentDetailUpdate
> = () => {
	setSiteKey();
	return <PaymentDetailUpdate productType={PRODUCT_TYPES.guardianweekly} />;
};

GuardianWeeklyExpiredCard.parameters = {
	reactRouter: {
		state: { productDetail: guardianWeeklyExpiredCard },
		container: (
			<PaymentDetailUpdateContainer
				productType={PRODUCT_TYPES.guardianweekly}
			/>
		),
	},
};
