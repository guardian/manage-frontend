import { number2words } from '../numberUtils';

describe('numberUtils', () => {
	test.each([
		[1, 'one'],
		[42, 'forty-two'],
		[5, 'five'],
		[666, 'six hundred and sixty-six'],
		[1969, 'one thousand nine hundred and sixty-nine'],
	])(
		'number2words - converts %i into %s',
		(num: number, expected: string) => {
			expect(number2words(num)).toBe(expected);
		},
	);
});
