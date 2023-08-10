import { suggestedAmounts } from '../utilities/supporterPlusPricing';

describe('suggested support amounts for monthly', () => {
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
			expect(suggestedAmounts(currentAmount, 'Monthly')[0]).toEqual(
				expectedFirstAmount,
			);
			expect(suggestedAmounts(currentAmount, 'Monthly')[1]).toEqual(
				expectedSecondAmount,
			);
			expect(suggestedAmounts(currentAmount, 'Monthly')[2]).toEqual(
				expectedThirdAmount,
			);
		},
	);
});

describe('suggested support amounts for annual', () => {
	it.each([
		[95, 105, 120, 145],
		[100, 110, 125, 150],
		[103, 115, 125, 150],
		[99, 110, 125, 150],
	])(
		'returns options 10%, 25%, 50% more than the current amount %s',
		(
			currentAmount: number,
			expectedFirstAmount: number,
			expectedSecondAmount: number,
			expectedThirdAmount: number,
		) => {
			expect(suggestedAmounts(currentAmount, 'Annual')[0]).toEqual(
				expectedFirstAmount,
			);
			expect(suggestedAmounts(currentAmount, 'Annual')[1]).toEqual(
				expectedSecondAmount,
			);
			expect(suggestedAmounts(currentAmount, 'Annual')[2]).toEqual(
				expectedThirdAmount,
			);
		},
	);
});
