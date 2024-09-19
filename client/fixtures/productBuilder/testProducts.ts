import type { CurrencyIso } from '../../utilities/currencyIso';
import {
	baseContribution,
	baseDigitalPack,
	baseDigitalVoucher,
	baseGuardianWeekly,
	baseHomeDelivery,
	baseMembership,
	baseNationalDelivery,
	baseSupporterPlus,
	baseTierThree,
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

export function digitalPackWithPaymentFailure() {
	return new ProductBuilder(baseDigitalPack())
		.payByDirectDebit()
		.withAlertText('Payment failed')
		.getProductDetailObject();
}

export function digitalPackPaidByCardWithPaymentFailure() {
	return new ProductBuilder(baseDigitalPack())
		.payByCard()
		.withAlertText('Payment failed')
		.getProductDetailObject();
}

export function monthlyContributionPaidByCard() {
	return new ProductBuilder(baseContribution())
		.payByCard()
		.withBillingPeriod('month')
		.withPrice(400)
		.getProductDetailObject();
}

export function annualContributionPaidByCardWithCurrency(
	currency: CurrencyIso,
) {
	return new ProductBuilder(baseContribution())
		.payByCard()
		.withBillingPeriod('year')
		.withCurrency(currency)
		.withPrice(300)
		.getProductDetailObject();
}

export function contributionPaidByCard() {
	return new ProductBuilder(baseContribution())
		.payByCard()
		.getProductDetailObject();
}

export function contributionAboveSupporterPlusThreshold() {
	return new ProductBuilder(baseContribution())
		.payByCard()
		.withPrice(1200)
		.getProductDetailObject();
}

export function contributionPaidByPayPal() {
	return new ProductBuilder(baseContribution())
		.payByPayPal()
		.getProductDetailObject();
}

export function contributionPaidByPayPalAboveSupporterPlusThreshold() {
	return new ProductBuilder(baseContribution())
		.payByPayPal()
		.withPrice(1200)
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

export function contributionWithPaymentFailure() {
	return new ProductBuilder(baseContribution())
		.payByCard()
		.withAlertText('Payment failed')
		.withPrice(1200)
		.getProductDetailObject();
}

export function nonServicedCountryContributor() {
	return new ProductBuilder(baseContribution())
		.payByCard()
		.nonServiceableCountry()
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

export function nationalDelivery() {
	return new ProductBuilder(baseNationalDelivery())
		.payByCard()
		.getProductDetailObject();
}

export function membershipSupporter() {
	return new ProductBuilder(baseMembership())
		.payByCard()
		.getProductDetailObject();
}

export function membershipSupporterWithOldPrice() {
	return new ProductBuilder(baseMembership())
		.payByCard()
		.withPrice(500)
		.getProductDetailObject();
}

export function membershipSupporterAnnual() {
	return new ProductBuilder(baseMembership())
		.payByDirectDebit()
		.withBillingPeriod('year')
		.getProductDetailObject();
}

export function membershipSupporterCurrencyUSD() {
	return new ProductBuilder(baseMembership())
		.payByCard()
		.withCurrency('USD')
		.getProductDetailObject();
}

export function membershipStaff() {
	return new ProductBuilder(baseMembership())
		.payByCard()
		.tier('Staff Membership')
		.withNoCurrentPlans()
		.getProductDetailObject();
}

export function supporterPlus() {
	return new ProductBuilder(baseSupporterPlus())
		.payByCard()
		.getProductDetailObject();
}

export function supporterPlusMonthlyAllAccessDigital() {
	return new ProductBuilder(baseSupporterPlus())
		.payByCard()
		.withPrice(1200)
		.withBillingPeriod('month')
		.getProductDetailObject();
}

export function supporterPlusMonthlyAllAccessDigitalBeforePriceRise() {
	return new ProductBuilder(baseSupporterPlus())
		.payByCard()
		.withPrice(1000)
		.withBillingPeriod('month')
		.getProductDetailObject();
}

export function supporterPlusAnnual() {
	return new ProductBuilder(baseSupporterPlus())
		.payByCard()
		.withPrice(12000)
		.withBillingPeriod('year')
		.getProductDetailObject();
}

export function supporterPlusAnnualCancelled() {
	return new ProductBuilder(baseSupporterPlus())
		.payByCard()
		.withPrice(12000)
		.withBillingPeriod('year')
		.cancel()
		.getProductDetailObject();
}

export function supporterPlusCancelled() {
	return new ProductBuilder(baseSupporterPlus())
		.payByCard()
		.cancel()
		.getProductDetailObject();
}

export function supporterPlusInOfferPeriod() {
	return new ProductBuilder(baseSupporterPlus())
		.payByCard()
		.inOfferPeriod()
		.getProductDetailObject();
}

export function tierThree() {
	return new ProductBuilder(baseTierThree())
		.payByCard()
		.getProductDetailObject();
}

export function patronDigitalPack() {
	return new ProductBuilder(baseDigitalPack())
		.payByCard()
		.asPatron()
		.getProductDetailObject();
}

export function patronMembership() {
	return new ProductBuilder(baseMembership())
		.payByCard()
		.withPrice(10000)
		.asPatron()
		.asPatronTier()
		.withEvents()
		.getProductDetailObject();
}
