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
