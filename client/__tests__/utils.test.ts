import { shuffleArray } from '../utilities/utils';

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
