import type { ProductDetail, ProductTier } from '@/shared/productResponse';
import { PRODUCT_TYPES } from '@/shared/productTypes';
import {
	getAlternativesCopy,
	getConfirmCopy,
	getProgressCopy,
	getReasonPickerCopy,
	getSelfServeCancellationCopyFamily,
	getSuccessCopy,
	reviewVariantFor,
} from '../selfServeCancellationCopy';
import { cancellationModeFromEffectiveDate } from '../selfServeCancellationTiming';

const product = (mmaProductKey: ProductTier, country?: string) =>
	({
		mmaProductKey,
		billingCountry: country,
		subscription: {
			deliveryAddress: country ? { country } : undefined,
		},
	} as ProductDetail);

const guardianWeekly = product('Guardian Weekly - Domestic');

describe('cancellationModeFromEffectiveDate', () => {
	it.each([undefined, null, '', '   ', 'now'])(
		'treats %p as a hard cancellation',
		(value) => {
			expect(cancellationModeFromEffectiveDate(value)).toBe('hard');
		},
	);

	it('treats a future date as a soft cancellation', () => {
		expect(cancellationModeFromEffectiveDate('2026-06-01')).toBe('soft');
	});
});

describe('getSelfServeCancellationCopyFamily', () => {
	it.each<ProductTier>([
		'Newspaper Delivery',
		'Newspaper Delivery + Digital',
		'Newspaper - National Delivery',
		'Newspaper - National Delivery + Digital',
		'Newspaper Delivery - Observer',
	])('maps %s to home delivery copy', (mmaProductKey) => {
		expect(getSelfServeCancellationCopyFamily(product(mmaProductKey))).toBe(
			'homeDelivery',
		);
	});

	it.each<ProductTier>([
		'Newspaper Voucher',
		'Newspaper Voucher + Digital',
		'Newspaper Voucher - Observer',
	])('maps %s to voucher copy', (mmaProductKey) => {
		expect(getSelfServeCancellationCopyFamily(product(mmaProductKey))).toBe(
			'voucher',
		);
	});

	it.each<ProductTier>([
		'Newspaper Digital Voucher',
		'Newspaper Digital Voucher + Digital',
		'Newspaper Digital Voucher - Observer',
	])('maps %s to subscription card copy', (mmaProductKey) => {
		expect(getSelfServeCancellationCopyFamily(product(mmaProductKey))).toBe(
			'subscriptionCard',
		);
	});

	it.each<ProductTier>([
		'Guardian Weekly - Domestic',
		'Guardian Weekly - ROW',
		'Guardian Weekly Zone A',
		'Guardian Weekly Zone B',
		'Guardian Weekly Zone C',
	])('maps %s to Guardian Weekly copy', (mmaProductKey) => {
		expect(getSelfServeCancellationCopyFamily(product(mmaProductKey))).toBe(
			'guardianWeekly',
		);
	});

	it('uses Guardian Weekly copy when the product key is unknown', () => {
		expect(
			getSelfServeCancellationCopyFamily(
				product('Supporter Plus' as ProductTier),
			),
		).toBe('guardianWeekly');
	});
});

describe('self-serve cancellation copy', () => {
	const homeDelivery = product('Newspaper Delivery');
	const voucher = product('Newspaper Voucher');
	const subscriptionCard = product('Newspaper Digital Voucher');

	it('uses one reason step for every family', () => {
		const copy = getReasonPickerCopy(guardianWeekly);
		expect(getReasonPickerCopy(homeDelivery)).toEqual(copy);
		expect(copy.pageTitle).toBe('Manage subscription');
		expect(copy.introEmphasis).toBe(
			"Would you mind taking a moment to tell us why you'd like to cancel?",
		);
		expect(copy.title('test')).toBe("We're sorry to see you go, test.");
		expect(copy.title()).toBe("We're sorry to see you go.");
	});

	it('changes the pause sentence by product family', () => {
		expect(getAlternativesCopy(homeDelivery).pauseBody).toContain(
			'print deliveries on hold for up to 5 weeks',
		);
		expect(getAlternativesCopy(voucher).pauseBody).toContain(
			'voucher subscription on hold for up to 5 weeks',
		);
		expect(getAlternativesCopy(subscriptionCard).pauseBody).toContain(
			'subscription card on hold for up to 5 weeks',
		);
		expect(getAlternativesCopy(guardianWeekly).pauseBody).toContain(
			'Guardian Weekly deliveries on hold for up to 6 weeks',
		);
	});

	it('uses the UK phone number unless Guardian Weekly is in another region', () => {
		expect(getAlternativesCopy(homeDelivery).callUs).toContain(
			'+44 (0) 330 333 6765',
		);
		expect(
			getAlternativesCopy(product('Newspaper Delivery', 'Australia'))
				.callUs,
		).toContain('+44 (0) 330 333 6765');
		expect(
			getAlternativesCopy(
				product('Guardian Weekly - ROW', 'United States'),
			).callUs,
		).toContain('1-844-632-2010');
		expect(getAlternativesCopy(homeDelivery).emailHref).toBe(
			'https://manage.theguardian.com/help-centre/contact-us/',
		);
		expect(
			getAlternativesCopy(product('Guardian Weekly - ROW', 'Australia'))
				.chatCta,
		).toBe('Chat with us');
		expect(
			getAlternativesCopy(product('Guardian Weekly - ROW', 'Australia'))
				.chatHref,
		).toBe('https://manage.theguardian.com/help-centre/contact-us/');
	});

	it('uses the soft review sentences outside the cooling-off period', () => {
		expect(
			getConfirmCopy(guardianWeekly, 'soft').title(
				'test',
				'29 November 2021',
			),
		).toBe(
			'Thank you for supporting the Guardian since 29 November 2021. Is this really goodbye, test?',
		);
		expect(
			getConfirmCopy(homeDelivery, 'soft').subscriptionEndsOn(
				'1 June 2026',
			),
		).toBe('Your subscription ends on 1 June 2026.');
		expect(
			getConfirmCopy(homeDelivery, 'soft').detailParagraphs().join(' '),
		).toContain('newspaper deliveries');
		expect(
			getConfirmCopy(voucher, 'soft').detailParagraphs().join(' '),
		).toContain('discontinue use of remaining vouchers');
		expect(
			getConfirmCopy(subscriptionCard, 'soft')
				.detailParagraphs('1 June 2026')
				.join(' '),
		).toContain('From 1 June 2026, your card will no longer be active');
	});

	it('uses the immediate cooling-off sentences for a hard cancellation', () => {
		expect(getConfirmCopy(guardianWeekly, 'hard').title('test', '')).toBe(
			'Is this really goodbye, test?',
		);
		expect(
			getConfirmCopy(homeDelivery, 'hard').subscriptionEndsImmediately,
		).toBe('Your subscription will end immediately.');
		expect(
			getConfirmCopy(voucher, 'hard').detailParagraphs().join(' '),
		).toContain('cooling-off period');
		expect(getConfirmCopy(voucher, 'hard').confirmCta).toBe(
			'Confirm cancellation',
		);
	});

	it('uses the unused-credit sentences when a hard cancellation has credit', () => {
		expect(reviewVariantFor('hard', true)).toBe('hardWithCredit');
		expect(reviewVariantFor('hard', false)).toBe('hard');
		expect(reviewVariantFor('soft', true)).toBe('soft');
		expect(
			getConfirmCopy(homeDelivery, 'hardWithCredit')
				.detailParagraphs()
				.join(' '),
		).toContain('you will not be charged for this subscription');
		expect(
			getConfirmCopy(subscriptionCard, 'hardWithCredit').confirmCta,
		).toBe('Continue to cancel');
	});

	it('confirms a completed cancellation without naming the product', () => {
		expect(getSuccessCopy(homeDelivery, 'soft').heading).toBe(
			'Your subscription has been cancelled.',
		);
		expect(getSuccessCopy(guardianWeekly, 'soft').effectiveLeadIn).toBe(
			'Your cancellation will take effect on',
		);
		expect(getSuccessCopy(voucher, 'hard').effectiveImmediately).toBe(
			'Cancellation will take effect immediately.',
		);
		expect(getProgressCopy(subscriptionCard)).toEqual(
			getProgressCopy(guardianWeekly),
		);
	});
});

describe('self-serve cancellation product config', () => {
	it('opens the self-serve cancellation journey for newspaper products', () => {
		const printProducts = [
			PRODUCT_TYPES.homedelivery,
			PRODUCT_TYPES.homedeliveryplusdigital,
			PRODUCT_TYPES.nationaldelivery,
			PRODUCT_TYPES.nationaldeliveryplusdigital,
			PRODUCT_TYPES.observer,
			PRODUCT_TYPES.voucher,
			PRODUCT_TYPES.voucherplusdigital,
			PRODUCT_TYPES.voucherobserver,
			PRODUCT_TYPES.digitalvoucher,
			PRODUCT_TYPES.digitalvoucherplusdigital,
			PRODUCT_TYPES.digitalvoucherobserver,
			PRODUCT_TYPES.guardianweekly,
		];

		for (const productType of printProducts) {
			expect(
				productType.cancellation?.usesSelfServeCancellationFlow,
			).toBe(true);
			expect(productType.cancellation?.reasons?.length).toBeGreaterThan(
				0,
			);
		}
	});

	it('keeps Salesforce case products on the right family', () => {
		expect(PRODUCT_TYPES.guardianweekly.cancellation?.sfCaseProduct).toBe(
			'Guardian Weekly',
		);
		expect(PRODUCT_TYPES.homedelivery.cancellation?.sfCaseProduct).toBe(
			'Newspaper - Home Delivery',
		);
		expect(PRODUCT_TYPES.nationaldelivery.cancellation?.sfCaseProduct).toBe(
			'Newspaper - Home Delivery',
		);
		expect(PRODUCT_TYPES.observer.cancellation?.sfCaseProduct).toBe(
			'Newspaper - Home Delivery',
		);
		expect(PRODUCT_TYPES.voucher.cancellation?.sfCaseProduct).toBe(
			'Voucher Subscriptions',
		);
		expect(PRODUCT_TYPES.voucherobserver.cancellation?.sfCaseProduct).toBe(
			'Voucher Subscriptions',
		);
		expect(PRODUCT_TYPES.digitalvoucher.cancellation?.sfCaseProduct).toBe(
			'Newspaper Subscription Card',
		);
		expect(
			PRODUCT_TYPES.digitalvoucherobserver.cancellation?.sfCaseProduct,
		).toBe('Newspaper Subscription Card');
	});

	it('leaves Digital + Print and deprecated paper on their current flows', () => {
		expect(
			PRODUCT_TYPES.tierthree.cancellation?.usesSelfServeCancellationFlow,
		).toBeUndefined();
		expect(PRODUCT_TYPES.newspaper.cancellation).toBeUndefined();
	});
});
