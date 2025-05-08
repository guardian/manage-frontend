import type {
	BillingPeriod,
	Card,
	PaidSubscriptionPlan,
	ProductDetail,
	SubscriptionPlan,
} from '../../../shared/productResponse';
import type { CurrencyIso } from '../../utilities/currencyIso';
import { convertCurrencyIsoToSymbol } from '../../utilities/currencyIso';

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

	withDeliveryInstructions(instructions: string) {
		if (this.productToBuild.subscription.deliveryAddress) {
			this.productToBuild.subscription.deliveryAddress.instructions =
				instructions;
		}
		return this;
	}

	cancel() {
		this.productToBuild.subscription.cancelledAt = true;
		this.productToBuild.subscription.cancellationEffectiveDate =
			'2023-03-20';
		return this;
	}

	inOfferPeriod() {
		this.productToBuild.subscription.nextPaymentDate = '2023-03-20';
		this.productToBuild.subscription.potentialCancellationDate =
			'2023-02-20';
		return this;
	}

	withPotentialCancellationDate() {
		this.productToBuild.subscription.potentialCancellationDate =
			'2025-02-20';
		return this;
	}

	inTrialPeriod() {
		this.productToBuild.subscription.trialLength = 2;
		return this;
	}

	asPatron() {
		this.productToBuild.subscription.readerType = 'Patron';
		return this;
	}

	asPatronTier() {
		this.productToBuild.tier = 'Patron';
		return this;
	}

	withEvents() {
		const currentPlans = this.productToBuild.subscription.currentPlans;
		for (const currentPlan of currentPlans) {
			if (isPaidSubscriptionPlan(currentPlan)) {
				currentPlan.features = 'Fancy Events';
			}
		}
		return this;
	}

	inUSA() {
		this.productToBuild.billingCountry = 'United States';
		return this;
	}

	nonServiceableCountry() {
		this.productToBuild.billingCountry = 'Qatar';
		return this;
	}

	withCurrency(currencyIso: CurrencyIso) {
		const { plan, currentPlans, futurePlans } =
			this.productToBuild.subscription;
		const currencySymbol = convertCurrencyIsoToSymbol(currencyIso);
		if (plan) {
			plan.currencyISO = currencyIso;
			plan.currency = currencySymbol;
		}
		for (const currentPlan of currentPlans) {
			if (isPaidSubscriptionPlan(currentPlan)) {
				currentPlan.currency = currencySymbol;
				currentPlan.currencyISO = currencyIso;
			}
		}

		for (const futurePlan of futurePlans) {
			if (isPaidSubscriptionPlan(futurePlan)) {
				futurePlan.currency = currencySymbol;
				futurePlan.currencyISO = currencyIso;
			}
		}

		return this;
	}

	withBillingPeriod(billingPeriod: BillingPeriod) {
		const { plan, currentPlans, futurePlans } =
			this.productToBuild.subscription;
		if (plan) {
			plan.billingPeriod = billingPeriod;
		}
		for (const currentPlan of currentPlans) {
			if (isPaidSubscriptionPlan(currentPlan)) {
				currentPlan.billingPeriod = billingPeriod;
			}
		}

		for (const futurePlan of futurePlans) {
			if (isPaidSubscriptionPlan(futurePlan)) {
				futurePlan.billingPeriod = billingPeriod;
			}
		}

		return this;
	}

	withPrice(price: number) {
		this.productToBuild.subscription.nextPaymentPrice = price;

		const { plan, currentPlans, futurePlans } =
			this.productToBuild.subscription;
		if (plan) {
			plan.price = price;
		}
		for (const currentPlan of currentPlans) {
			if (isPaidSubscriptionPlan(currentPlan)) {
				currentPlan.price = price;
			}
		}

		for (const futurePlan of futurePlans) {
			if (isPaidSubscriptionPlan(futurePlan)) {
				futurePlan.price = price;
			}
		}

		return this;
	}
}

function isPaidSubscriptionPlan(
	subscriptionPlan: SubscriptionPlan,
): subscriptionPlan is PaidSubscriptionPlan {
	return (
		!!subscriptionPlan &&
		(subscriptionPlan.hasOwnProperty('price') ||
			subscriptionPlan.hasOwnProperty('amount'))
	);
}
