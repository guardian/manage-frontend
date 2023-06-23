import { suggestedAmounts } from '../utilities/supporterPlusPricing';

describe('suggested support amounts', () => {
	it.each([
		[10, 12, 15, 20],
		[17, 19, 20, 25],
		[18, 20, 25, 30],
		[19, 21, 25, 30],
	])(
		'returns the first option as £2 above, the next two should be the closest £5 intervals',
		(
			currentAmount: number,
			expectedFirstAmount: number,
			expectedSecondAmount: number,
			expectedThirdAmount: number,
		) => {
			expect(suggestedAmounts(currentAmount)[0]).toEqual(
				expectedFirstAmount,
			);
			expect(suggestedAmounts(currentAmount)[1]).toEqual(
				expectedSecondAmount,
			);
			expect(suggestedAmounts(currentAmount)[2]).toEqual(
				expectedThirdAmount,
			);
		},
	);
});
