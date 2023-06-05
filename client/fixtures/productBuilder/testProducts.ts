import {
	baseContribution,
	baseDigitalPack,
	baseDigitalVoucher,
	baseGuardianWeekly,
	baseHomeDelivery,
	baseMembership,
} from './baseProducts';
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

export function guardianWeeklyCancelled() {
	return new ProductBuilder(baseGuardianWeekly())
		.payByCard()
		.cancel()
		.getProductDetailObject();
}

export function digitalPackPaidByDirectDebit() {
	return new ProductBuilder(baseDigitalPack())
		.payByDirectDebit()
		.getProductDetailObject();
}

export function contributionPaidByCard() {
	return new ProductBuilder(baseContribution())
		.payByCard()
		.getProductDetailObject();
}

export function contributionPaidByPayPal() {
	return new ProductBuilder(baseContribution())
		.payByPayPal()
		.getProductDetailObject();
}

export function contributionPaidByDirectDebit() {
	return new ProductBuilder(baseContribution())
		.payByDirectDebit()
		.getProductDetailObject();
}

export function contributionPaidBySepa() {
	return new ProductBuilder(baseContribution())
		.payBySepa()
		.getProductDetailObject();
}

export function contributionCancelled() {
	return new ProductBuilder(baseContribution())
		.payByCard()
		.cancel()
		.getProductDetailObject();
}

export function newspaperVoucherPaidByPaypal(email?: string) {
	return new ProductBuilder(baseDigitalVoucher())
		.payByPayPal(email)
		.getProductDetailObject();
}

export function homeDelivery() {
	return new ProductBuilder(baseHomeDelivery())
		.payByCard()
		.getProductDetailObject();
}

export function membershipSupporter() {
	return new ProductBuilder(baseMembership())
		.payByCard()
		.getProductDetailObject();
}

export function membershipStaff() {
	return new ProductBuilder(baseMembership())
		.payByCard()
		.tier('Staff Membership')
		.withNoCurrentPlans()
		.getProductDetailObject();
}
