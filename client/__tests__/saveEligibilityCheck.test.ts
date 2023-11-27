import { baseDigitalPack } from '@/client/fixtures/productBuilder/baseProducts';
import { ProductBuilder } from '@/client/fixtures/productBuilder/productBuilder';
import { digitalPackWithPaymentFailure } from '@/client/fixtures/productBuilder/testProducts';
import { eligibleForDigisubDiscount } from '../components/mma/cancel/cancellationSaves/saveEligibilityCheck';

describe('digisub save eligiblity check', () => {
	it('should return false if the user is in payment failure', () => {
		const eligible = eligibleForDigisubDiscount(
			digitalPackWithPaymentFailure(),
		);
		expect(eligible).toBeFalsy();
	});

	it('should return false if the user is on discounted/old price', () => {
		const digisubWithOldPricing = new ProductBuilder(baseDigitalPack())
			.withPrice(1199)
			.withCurrency('GBP')
			.withBillingPeriod('month')
			.getProductDetailObject();

		const eligible = eligibleForDigisubDiscount(digisubWithOldPricing);
		expect(eligible).toBeFalsy();
	});

	it('should return true if the user is not in payment failure and on new price', () => {
		const digisubWithNewPricing = new ProductBuilder(baseDigitalPack())
			.withPrice(1499)
			.withCurrency('GBP')
			.withBillingPeriod('month')
			.getProductDetailObject();

		const eligible = eligibleForDigisubDiscount(digisubWithNewPricing);

		expect(eligible).toBeTruthy();
	});
});
