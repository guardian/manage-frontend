import type { Card, ProductDetail } from '../../../shared/productResponse';
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

	gift(isReceived: boolean) {
		this.productToBuild.isPaidTier = !isReceived;
		this.productToBuild.subscription.readerType = 'Gift';

		return this;
	}

	withAlertText(alertText: string) {
		this.productToBuild.alertText = alertText;
		return this;
	}

	cancelled() {
		this.productToBuild.subscription.cancelledAt = true;
		this.productToBuild.subscription.cancellationEffectiveDate =
			'2023-03-20';
		return this;
	}
}
