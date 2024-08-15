import type { Subscription } from '@/shared/productResponse';
import {
	guardianWeeklySubscriptionAustralia,
	guardianWeeklySubscriptionCard,
} from '../../../fixtures/subscription';
import { getStripeKey } from '../../../utilities/stripe';

// @ts-expect-error
window.guardian = {
	stripeKeyAustralia: {
		test: 'testKeyAustralia',
		default: 'defaultKeyAustralia',
	},
	stripeKeyUnitedStates: {
		test: 'testKeyUnitedStates',
		default: 'defaultKeyUnitedStates',
	},
	stripeKeyDefaultCurrencies: {
		test: 'testKeyDefaultCurrencies',
		default: 'defaultKeyDefaultCurrencies',
	},
};

test('Uses Rest Of World Stripe key for UK delivery address', () => {
	const stripePublicKey = getStripeKey(
		guardianWeeklySubscriptionCard.deliveryAddress?.country,
		false,
	);

	expect(stripePublicKey).toEqual(
		window.guardian.stripeKeyDefaultCurrencies?.default,
	);
});

test('Uses Australian Stripe key for Australian delivery address', () => {
	const stripePublicKey = getStripeKey(
		guardianWeeklySubscriptionAustralia.deliveryAddress?.country,
		false,
	);

	expect(stripePublicKey).toEqual(
		window.guardian.stripeKeyAustralia?.default,
	);
});

test('Uses United States Stripe key for United States delivery address', () => {
	const guardianWeeklySubscriptionUnitedStates: Subscription = {
		...guardianWeeklySubscriptionAustralia,
		deliveryAddress: {
			addressLine1: 'Line 1',
			addressLine2: 'Line 2',
			town: 'New York',
			postcode: '10001',
			country: 'United States',
		},
	};

	const stripePublicKey = getStripeKey(
		guardianWeeklySubscriptionUnitedStates.deliveryAddress?.country,
		false,
	);

	expect(stripePublicKey).toEqual(
		window.guardian.stripeKeyUnitedStates?.default,
	);
});
