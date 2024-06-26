import { gridItemPlacement } from '../../styles/grid';

describe('grid.ts unit tests', () => {
	test("should return expected 'css' object when passed positive grid starting column", () => {
		const expected = {
			gridColumnStart: '1',
			gridColumnEnd: 'span 4',
		};
		const result = gridItemPlacement(1, 4);
		expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
	});

	test("should return expected 'css' object when passed negative grid starting column", () => {
		const expected = {
			gridColumnStart: '-4',
			gridColumnEnd: 'span 3',
		};
		const result = gridItemPlacement(-4, 3);
		expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
	});
});
