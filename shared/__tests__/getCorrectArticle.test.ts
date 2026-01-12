import { getCorrectArticle } from '../generalTypes';

describe('getCorrectArticle', () => {
	test.each([
		// Vowels at start
		['all-access digital', 'an'],
		['apple', 'an'],
		['elephant', 'an'],
		['igloo', 'an'],
		['umbrella', 'an'],
		// Consonants at start
		['newspaper home delivery', 'a'],
		['banana', 'a'],
		['cat', 'a'],
		['dog', 'a'],
		// Case insensitive
		['All-access digital', 'an'],
		['ALL-ACCESS DIGITAL', 'an'],
		['Newspaper', 'a'],
		['NEWSPAPER', 'a'],
		// Edge cases
		['', 'a'],
	])(
		'getCorrectArticle - returns %s for %s',
		(word: string, expected: string) => {
			expect(getCorrectArticle(word)).toBe(expected);
		},
	);
});
