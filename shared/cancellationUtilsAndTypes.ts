export const cancelAlternativeUrlPartLookup = (
	isPossibleOffer: boolean,
	isPossiblePause: boolean,
	isPossibleSwitch: boolean,
): string => {
	if (isPossibleOffer) {
		return 'offer';
	}
	if (isPossiblePause) {
		return 'pause';
	}
	if (isPossibleSwitch) {
		return 'switch';
	}
	return '';
};
