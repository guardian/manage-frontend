import { toMembersDataApiResponse } from '../../fixtures/mdapiResponse';
import { baseDigitalPack } from '../../fixtures/productBuilder/baseProducts';
import { ProductBuilder } from '../../fixtures/productBuilder/productBuilder';
import {
	digitalPackPaidByDirectDebit,
	homeDelivery,
	homeDeliverySaturdayPlus,
	nationalDeliveryPlus,
	newspaperdigitalVoucherPlusPaidByCard,
	supporterPlus,
	voucherPlusPaidByCard,
} from '../../fixtures/productBuilder/testProducts';
import {
	getExtraAccountsProduct,
	hasExtraAccountsAccess,
	isEligibleForExtraAccounts,
} from '../../utilities/extraAccounts';

describe('isEligibleForExtraAccounts', () => {
	it('includes Digital plus and newspaper + Digital products', () => {
		expect(isEligibleForExtraAccounts('Digital Pack')).toBe(true);
		expect(isEligibleForExtraAccounts('Newspaper Delivery + Digital')).toBe(
			true,
		);
		expect(
			isEligibleForExtraAccounts(
				'Newspaper - National Delivery + Digital',
			),
		).toBe(true);
		expect(isEligibleForExtraAccounts('Newspaper Voucher + Digital')).toBe(
			true,
		);
		expect(
			isEligibleForExtraAccounts('Newspaper Digital Voucher + Digital'),
		).toBe(true);
	});

	it('excludes products without extra accounts', () => {
		expect(isEligibleForExtraAccounts('Newspaper Delivery')).toBe(false);
		expect(isEligibleForExtraAccounts('Supporter Plus')).toBe(false);
		expect(isEligibleForExtraAccounts('Tier Three')).toBe(false);
	});
});

describe('getExtraAccountsProduct', () => {
	it('returns an active Digital plus subscription', () => {
		const digitalPlus = digitalPackPaidByDirectDebit();
		const response = toMembersDataApiResponse(digitalPlus);

		expect(getExtraAccountsProduct(response)).toEqual(digitalPlus);
	});

	it('returns an active newspaper + Digital subscription', () => {
		const plusDigital = homeDeliverySaturdayPlus();
		const response = toMembersDataApiResponse(plusDigital);

		expect(getExtraAccountsProduct(response)).toEqual(plusDigital);
	});

	it('returns the first eligible product when more than one is present', () => {
		const plusDigital = voucherPlusPaidByCard();
		const digitalPlus = digitalPackPaidByDirectDebit();
		const response = toMembersDataApiResponse(plusDigital, digitalPlus);

		expect(getExtraAccountsProduct(response)).toEqual(plusDigital);
	});

	it('ignores cancelled eligible subscriptions and ineligible products', () => {
		const cancelledDigitalPlus = new ProductBuilder(baseDigitalPack())
			.payByDirectDebit()
			.cancel()
			.getProductDetailObject();
		const printOnly = homeDelivery();
		const plusDigital = nationalDeliveryPlus();
		const response = toMembersDataApiResponse(
			cancelledDigitalPlus,
			printOnly,
			plusDigital,
		);

		expect(getExtraAccountsProduct(response)).toEqual(plusDigital);
	});

	it('returns a digital voucher + Digital subscription', () => {
		const plusDigital = newspaperdigitalVoucherPlusPaidByCard();
		const response = toMembersDataApiResponse(plusDigital);

		expect(getExtraAccountsProduct(response)).toEqual(plusDigital);
	});

	it('returns undefined when there is no eligible product', () => {
		expect(getExtraAccountsProduct(null)).toBeUndefined();
		expect(
			getExtraAccountsProduct(toMembersDataApiResponse(supporterPlus())),
		).toBeUndefined();
	});
});

describe('hasExtraAccountsAccess', () => {
	it('is true only when an eligible active product exists', () => {
		expect(
			hasExtraAccountsAccess(
				toMembersDataApiResponse(homeDeliverySaturdayPlus()),
			),
		).toBe(true);
		expect(
			hasExtraAccountsAccess(toMembersDataApiResponse(homeDelivery())),
		).toBe(false);
	});
});
