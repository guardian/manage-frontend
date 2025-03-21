import {
	sundayTheObserverHomeDeliveryProduct,
	sundayTheObserverSubscriptionCardProduct,
} from '@/client/fixtures/productDetail';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	guardianWeeklySubscriptionAustralia,
	guardianWeeklySubscriptionCard,
} from '../../../fixtures/subscription';
import { getStripeKey, getStripeKeyByProduct } from '../../../utilities/stripe';

// @ts-expect-error
window.guardian = {
	stripeKeyAustralia: {
		test: 'testKeyAustralia',
		default: 'defaultKeyAustralia',
	},
	stripeKeyDefaultCurrencies: {
		test: 'testKeyDefaultCurrencies',
		default: 'defaultKeyDefaultCurrencies',
	},
	stripeKeyTortoiseMedia: {
		test: 'testKeyTortoiseMedia',
		default: 'defaultKeyTortoiseMedia',
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

test('Uses Tortoise Media Stripe key for Sunday The Observer Home Delivery subscription', () => {
	const stripePublicKeyDefaultUser = getStripeKeyByProduct(
		PRODUCT_TYPES.homedelivery,
		{
			...sundayTheObserverHomeDeliveryProduct,
			isTestUser: false,
		},
	);
	expect(stripePublicKeyDefaultUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.default,
	);

	const stripePublicKeyTestUser = getStripeKeyByProduct(
		PRODUCT_TYPES.homedelivery,
		{
			...sundayTheObserverHomeDeliveryProduct,
			isTestUser: true,
		},
	);
	expect(stripePublicKeyTestUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.test,
	);
});

test('Uses Tortoise Media Stripe key for Sunday The Observer Subscription Card (Test user)', () => {
	const stripePublicKeyDefaultUser = getStripeKeyByProduct(
		PRODUCT_TYPES.digitalvoucher,
		{
			...sundayTheObserverSubscriptionCardProduct,
			isTestUser: false,
		},
	);
	expect(stripePublicKeyDefaultUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.default,
	);

	const stripePublicKeyTestUser = getStripeKeyByProduct(
		PRODUCT_TYPES.digitalvoucher,
		{
			...sundayTheObserverSubscriptionCardProduct,
			isTestUser: true,
		},
	);
	expect(stripePublicKeyTestUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.test,
	);
});
