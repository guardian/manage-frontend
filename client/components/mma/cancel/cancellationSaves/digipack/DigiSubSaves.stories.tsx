import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { ReactRouterDecorator } from '@/.storybook/ReactRouterDecorator';
import { CancellationContainer } from '@/client/components/mma/cancel/CancellationContainer';
import { ConfirmDigiSubCancellation } from '@/client/components/mma/cancel/cancellationSaves/digipack/ConfirmDigiSubCancellation';
import { DigiSubDiscountConfirmed } from '@/client/components/mma/cancel/cancellationSaves/digipack/DigiSubDiscountConfirmed';
import { DigiSubThankYouOffer } from '@/client/components/mma/cancel/cancellationSaves/digipack/DigiSubThankYouOffer';
import {
	digitalPackPaidByDirectDebit,
	digitalPackWithPaymentFailure,
} from '@/client/fixtures/productBuilder/testProducts';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import { SelectReason } from '../SelectReason';

export default {
	title: 'Pages/DigiSubSaves',
	component: CancellationContainer,
	decorators: [ReactRouterDecorator],
	parameters: {
		layout: 'fullscreen',
		reactRouter: {
			state: {
				productDetail: digitalPackPaidByDirectDebit(),
				user: { email: 'test@test.com' },
			},
			container: (
				<CancellationContainer productType={PRODUCT_TYPES.digipack} />
			),
		},
	},
} as Meta<typeof CancellationContainer>;

export const DiscountConfirmed: StoryObj<typeof DigiSubDiscountConfirmed> = {
	render: () => {
		return <DigiSubDiscountConfirmed />;
	},
	parameters: {
		reactRouter: {
			state: {
				productDetail: digitalPackPaidByDirectDebit(),
				user: { email: 'test@test.com' },
				eligibleForDiscount: true,
				discountedPrice: 111.75,
				discountPeriod: '12 months',
			},
		},
	},
};

export const EligibleForDiscount: StoryObj<typeof DigiSubThankYouOffer> = {
	render: () => {
		return <DigiSubThankYouOffer />;
	},
	parameters: {
		msw: [
			http.post('/api/discounts/preview-discount', () => {
				return HttpResponse.json({
					discountedPrice: 111.75,
					upToPeriods: '12',
					upToPeriodsType: 'month',
					firstDiscountedPaymentDate: '2024-05-30',
					nextNonDiscountedPaymentDate: '2024-07-30',
				});
			}),
		],
	},
};

export const IneligibleForDiscount: StoryObj<typeof DigiSubThankYouOffer> = {
	render: () => {
		return <DigiSubThankYouOffer />;
	},
	parameters: {
		reactRouter: {
			state: {
				productDetail: digitalPackWithPaymentFailure(),
				user: { email: 'test@test.com' },
			},
		},
		msw: [
			http.post('/api/discounts/preview-discount', () => {
				return new HttpResponse(null, {
					status: 400,
				});
			}),
		],
	},
};

export const ConfirmCancellation: StoryObj<typeof ConfirmDigiSubCancellation> =
	{
		render: () => {
			return <ConfirmDigiSubCancellation />;
		},
		parameters: {
			reactRouter: {
				state: {
					productDetail: digitalPackWithPaymentFailure(),
					user: { email: 'test@test.com' },
					eligibleForDiscount: true,
				},
			},
		},
	};

export const DigiSubCancellationReason: StoryFn<typeof SelectReason> = () => {
	return <SelectReason />;
};
