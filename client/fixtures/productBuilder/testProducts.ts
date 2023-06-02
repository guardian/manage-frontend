import { baseDigitalPack, baseGuardianWeekly } from './baseProducts';
import { ProductBuilder } from './productBuilder';

export function guardianWeeklyPaidByCard() {
	return new ProductBuilder(baseGuardianWeekly())
		.payByCard()
		.getProductDetailObject();
}

export function digitalPackPaidByDirectDebit() {
	return new ProductBuilder(baseDigitalPack())
		.payByDirectDebit()
		.getProductDetailObject();
}
