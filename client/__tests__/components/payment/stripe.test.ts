import {
	baseDigitalVoucherSunday,
	baseObserverDeliverySunday,
} from '@/client/fixtures/productBuilder/baseProducts';
import { featureSwitches } from '@/shared/featureSwitches';
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
	const productDetail = baseObserverDeliverySunday();

	const stripePublicKeyDefaultUser = getStripeKeyByProduct({
		...productDetail,
		isTestUser: false,
	});
	expect(stripePublicKeyDefaultUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.default,
	);

	const stripePublicKeyTestUser = getStripeKeyByProduct({
		...productDetail,
		isTestUser: true,
	});
	expect(stripePublicKeyTestUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.test,
	);
});

test('Uses Tortoise Media Stripe keys for Observer (Sunday) Subscription Card', () => {
	const productDetail = baseDigitalVoucherSunday();

	const stripePublicKeyDefaultUser = getStripeKeyByProduct({
		...productDetail,
		isTestUser: false,
	});
	expect(stripePublicKeyDefaultUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.default,
	);

	const stripePublicKeyTestUser = getStripeKeyByProduct({
		...productDetail,
		isTestUser: true,
	});
	expect(stripePublicKeyTestUser).toEqual(
		window.guardian.stripeKeyTortoiseMedia?.test,
	);
});
