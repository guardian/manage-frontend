import { baseDigitalPack, baseGuardianWeekly } from './baseProducts';
import { cards, ProductBuilder } from './productBuilder';

export function guardianWeeklyPaidByCard() {
	return new ProductBuilder(baseGuardianWeekly())
		.payByCard()
		.getProductDetailObject();
}

export function guardianWeeklyGiftPurchase() {
	return new ProductBuilder(baseGuardianWeekly())
		.payByCard()
		.gift(false)
		.getProductDetailObject();
}

export function guardianWeeklyGiftRecipient() {
	return new ProductBuilder(baseGuardianWeekly())
		.gift(true)
		.getProductDetailObject();
}

export function guardianWeeklyExpiredCard() {
	return new ProductBuilder(baseGuardianWeekly())
		.payByCard(cards.visaExpired())
		.withAlertText(
			'Our attempt to take payment for your Guardian Weekly subscription failed on 24/02/2016.',
		)
		.getProductDetailObject();
}

export function digitalPackPaidByDirectDebit() {
	return new ProductBuilder(baseDigitalPack())
		.payByDirectDebit()
		.getProductDetailObject();
}
