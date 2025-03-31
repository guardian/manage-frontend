import {
	baseDigitalVoucherSunday,
	baseHomeDeliverySunday,
} from '@/client/fixtures/productBuilder/baseProducts';
import { featureSwitches } from '@/shared/featureSwitches';
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

test('Uses Tortoise Media Stripe keys for Observer (Sunday) Home Delivery subscription', () => {
	if (!featureSwitches.tortoiseStripeCheckout) {
		// Skip the test if the feature switch is off
		console.log(
			'Skipping test for Tortoise Media Stripe keys because the feature switch is off',
		);
		return;
	}

	const productDetail = baseHomeDeliverySunday();

	const stripePublicKeyDefaultUser = getStripeKeyByProduct(
		PRODUCT_TYPES.homedelivery,
		{
			...productDetail,
			isTestUser: false,
		},
	);
	expect(stripePublicKeyDefaultUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.default,
	);

	const stripePublicKeyTestUser = getStripeKeyByProduct(
		PRODUCT_TYPES.homedelivery,
		{
			...productDetail,
			isTestUser: true,
		},
	);
	expect(stripePublicKeyTestUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.test,
	);
});

test('Uses Tortoise Media Stripe keys for Observer (Sunday) Subscription Card', () => {
	if (!featureSwitches.tortoiseStripeCheckout) {
		// Skip the test if the feature switch is off
		console.log(
			'Skipping test for Tortoise Media Stripe keys because the feature switch is off',
		);
		return;
	}

	const productDetail = baseDigitalVoucherSunday();

	const stripePublicKeyDefaultUser = getStripeKeyByProduct(
		PRODUCT_TYPES.digitalvoucher,
		{
			...productDetail,
			isTestUser: false,
		},
	);
	expect(stripePublicKeyDefaultUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.default,
	);

	const stripePublicKeyTestUser = getStripeKeyByProduct(
		PRODUCT_TYPES.digitalvoucher,
		{
			...productDetail,
			isTestUser: true,
		},
	);
	expect(stripePublicKeyTestUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.test,
	);
});
