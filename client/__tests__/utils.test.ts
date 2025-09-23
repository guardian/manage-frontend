import {
	isValidDecimalInput,
	removeLeadingZeros,
	shuffleArray,
} from '../utilities/utils';

describe('shuffleArray', () => {
	it('randomizes the positions of the elements in the passed array', () => {
		const inputArrString = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].toString();
		let a;
		for (a = 0; a < 100; a++) {
			expect(
				shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).toString(),
			).not.toEqual(inputArrString);
		}
	});
});

describe('isValidDecimalInput', () => {
	it('returns true for valid whole numbers', () => {
		expect(isValidDecimalInput('1')).toBe(true);
		expect(isValidDecimalInput('123')).toBe(true);
		expect(isValidDecimalInput('9999')).toBe(true);
	});

	it('returns true for valid decimal numbers with period', () => {
		expect(isValidDecimalInput('1.5')).toBe(true);
		expect(isValidDecimalInput('123.45')).toBe(true);
		expect(isValidDecimalInput('999.99')).toBe(true);
	});

	it('returns true for valid decimal numbers with comma', () => {
		expect(isValidDecimalInput('1,5')).toBe(true);
		expect(isValidDecimalInput('123,45')).toBe(true);
		expect(isValidDecimalInput('999,99')).toBe(true);
	});

	it('returns true for numbers ending with period or comma (incomplete decimal)', () => {
		expect(isValidDecimalInput('1.')).toBe(true);
		expect(isValidDecimalInput('123.')).toBe(true);
		expect(isValidDecimalInput('1,')).toBe(true);
		expect(isValidDecimalInput('123,')).toBe(true);
	});

	it('returns true for numbers with only one decimal place', () => {
		expect(isValidDecimalInput('1.5')).toBe(true);
		expect(isValidDecimalInput('123.9')).toBe(true);
		expect(isValidDecimalInput('1,5')).toBe(true);
		expect(isValidDecimalInput('123,9')).toBe(true);
	});

	it('returns false for invalid inputs', () => {
		expect(isValidDecimalInput('')).toBe(false);
		expect(isValidDecimalInput('abc')).toBe(false);
		expect(isValidDecimalInput('1.2.3')).toBe(false);
		expect(isValidDecimalInput('1,2,3')).toBe(false);
		expect(isValidDecimalInput('1.234')).toBe(false);
		expect(isValidDecimalInput('1,234')).toBe(false);
		expect(isValidDecimalInput('.5')).toBe(false);
		expect(isValidDecimalInput(',5')).toBe(false);
		expect(isValidDecimalInput('1.2a')).toBe(false);
		expect(isValidDecimalInput('1-2')).toBe(false);
		expect(isValidDecimalInput(' 12')).toBe(false);
		expect(isValidDecimalInput('12 ')).toBe(false);
	});
});

describe('removeLeadingZeros', () => {
	it('removes leading zeros from numeric strings', () => {
		expect(removeLeadingZeros('007')).toBe('7');
		expect(removeLeadingZeros('0123')).toBe('123');
		expect(removeLeadingZeros('00999')).toBe('999');
		expect(removeLeadingZeros('000001')).toBe('1');
	});

	it('preserves single zero', () => {
		expect(removeLeadingZeros('0')).toBe('0');
		expect(removeLeadingZeros('000')).toBe('0');
	});

	it('preserves empty string', () => {
		expect(removeLeadingZeros('')).toBe('');
	});

	it('does not modify strings without leading zeros', () => {
		expect(removeLeadingZeros('123')).toBe('123');
		expect(removeLeadingZeros('7')).toBe('7');
		expect(removeLeadingZeros('999')).toBe('999');
	});

	it('handles decimal numbers correctly', () => {
		expect(removeLeadingZeros('007.5')).toBe('7.5');
		expect(removeLeadingZeros('0123.45')).toBe('123.45');
		expect(removeLeadingZeros('00.99')).toBe('0.99');
	});

	it('does not modify zero followed by decimal', () => {
		expect(removeLeadingZeros('0.5')).toBe('0.5');
		expect(removeLeadingZeros('0.99')).toBe('0.99');
	});
});
