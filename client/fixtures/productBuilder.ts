import type {
	MembersDataApiResponse,
	ProductDetail,
} from '../../shared/productResponse';
import type { GroupedProductTypeKeys } from '../../shared/productTypes';

function defaultMembership(): ProductDetail {
	return {
		mmaCategory: 'membership',
		tier: 'Staff Membership',
		isTestUser: true,
		isPaidTier: true,
		selfServiceCancellation: {
			isAllowed: false,
			shouldDisplayEmail: true,
			phoneRegionsToDisplay: ['UK & ROW', 'US', 'AUS'],
		},
		joinDate: '2014-12-16',
		subscription: {
			safeToUpdatePaymentMethod: true,
			end: '2022-12-16',
			nextPaymentPrice: null,
			nextPaymentDate: null,
			lastPaymentDate: null,
			chargedThroughDate: null,
			renewalDate: '2022-12-16',
			anniversaryDate: '2022-12-16',
			cancelledAt: false,
			subscriptionId: 'A-S00393340',
			trialLength: 0,
			autoRenew: true,
			currentPlans: [],
			futurePlans: [],
			readerType: 'Direct',
		},
	};
}

const defaultCard = () => {
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
};

export class MdapiResponseBuilder {
	data: MembersDataApiResponse;

	constructor() {
		this.data = {
			user: {
				firstName: 'test',
				lastName: 'name',
				email: 'test@test.com',
			},
			products: [],
		};
	}

	json() {
		return this.data;
	}

	product(defaultProduct: ProductDetail) {
		const productToBuild = defaultProduct;

		const subBuilder = {
			mmaCategory: (category: GroupedProductTypeKeys) => {
				productToBuild.mmaCategory = category;
				return subBuilder;
			},
			card: () => {
				productToBuild.subscription.card = defaultCard();
				productToBuild.subscription.paymentMethod = 'Card';
				return subBuilder;
			},
			commit: () => {
				// add this subBuilder content to the parent (this)
				this.data.products.push(productToBuild);
				return this as MdapiResponseBuilder;
			},
		};
		return subBuilder;
	}

	static create() {
		return new MdapiResponseBuilder();
	}

	static membershipCard() {
		return MdapiResponseBuilder.create()
			.product(defaultMembership())
			.card()
			.commit()
			.json();
	}
}
