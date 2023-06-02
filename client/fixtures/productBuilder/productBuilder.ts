import type { Card, ProductDetail } from '../../../shared/productResponse';
import type { GroupedProductTypeKeys } from '../../../shared/productTypes';

const cards = {
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
}
