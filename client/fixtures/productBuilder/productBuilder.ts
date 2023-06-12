import type {
	Card,
	ProductDetail} from '../../../shared/productResponse';
import {
	MDA_TEST_USER_HEADER
} from '../../../shared/productResponse';
import type { GroupedProductTypeKeys } from '../../../shared/productTypes';

export const cards = {
	visaActive: () => {
		return {
			last4: '4242',
			expiry: {
				month: 4,
				year: 2024,
			},
			type: 'Visa',
			stripePublicKeyForUpdate: 'pk_test_123',
			email: 'test.user@example.com',
		};
	},
	visaExpired: () => {
		return {
			last4: '4242',
			expiry: {
				month: 4,
				year: 2015,
			},
			type: 'Visa',
			stripePublicKeyForUpdate: 'pk_test_123',
			email: 'test.user@example.com',
		};
	},
};

export class ProductBuilder {
	productToBuild: ProductDetail;

	constructor(baseProduct: ProductDetail) {
		this.productToBuild = baseProduct;
	}

	getProductDetailObject() {
		return this.productToBuild;
	}

	mmaCategory(category: GroupedProductTypeKeys) {
		this.productToBuild.mmaCategory = category;
		return this;
	}

	tier(tier: string) {
		this.productToBuild.tier = tier;
		return this;
	}

	withNoCurrentPlans() {
		this.productToBuild.subscription.currentPlans = [];
		return this;
	}

	payByCard(customCard?: Card) {
		this.productToBuild.subscription.card =
			customCard || cards.visaActive();
		this.productToBuild.subscription.paymentMethod = 'Card';
		return this;
	}

	payByDirectDebit() {
		this.productToBuild.subscription.mandate = {
			accountName: 'khjhk',
			accountNumber: '****9911',
			sortCode: '200000',
		};
		this.productToBuild.subscription.paymentMethod = 'DirectDebit';

		return this;
	}

	payByPayPal(email?: string) {
		this.productToBuild.subscription.payPalEmail =
			email ?? 'sb-ltpuy8454870@personal.example.com';
		this.productToBuild.subscription.paymentMethod = 'PayPal';

		return this;
	}

	payBySepa() {
		this.productToBuild.subscription.paymentMethod = 'Sepa';
		this.productToBuild.subscription.sepaMandate = {
			accountName: 'John Smith',
			iban: 'FR*********************2606',
		};
		return this;
	}

	gift(isReceived: boolean) {
		this.productToBuild.isPaidTier = !isReceived;
		this.productToBuild.subscription.readerType = 'Gift';

		return this;
	}

	withAlertText(alertText: string) {
		this.productToBuild.alertText = alertText;
		return this;
	}

	cancel() {
		this.productToBuild.subscription.cancelledAt = true;
		this.productToBuild.subscription.cancellationEffectiveDate =
			'2023-03-20';
		return this;
	}

	asPatron() {
		this.productToBuild.subscription.readerType = 'Patron';
		return this;
	}

	createBug() {
		console.log(MDA_TEST_USER_HEADER);
		return this;
	}
}
