export type TrueFalsePending = 'pending' | boolean;

export const appendCorrectPluralisation = (
	inputUnitStr: string,
	amount: number,
) => {
	const lastChar = inputUnitStr.at(-1);

	if (amount === 1) {
		return lastChar === 's'
			? inputUnitStr.substring(0, inputUnitStr.length - 1)
			: inputUnitStr;
	}
	return lastChar === 's' ? inputUnitStr : `${inputUnitStr}s`;
};

/**
 * Returns the correct article ('a' or 'an') based on whether the following word starts with a vowel sound.
 * Uses a simple heuristic: checks if the first letter is a vowel.
 * Note: This handles common cases but doesn't account for exceptions (e.g., 'an hour' where 'h' is silent).
 *
 * @param word - The word that follows the article
 * @returns 'a' or 'an'
 */
export const getCorrectArticle = (word: string): 'a' | 'an' => {
	if (!word) {
		return 'a';
	}
	const firstLetter = word.toLowerCase().charAt(0);
	const vowels = ['a', 'e', 'i', 'o', 'u'];
	return vowels.includes(firstLetter) ? 'an' : 'a';
};
