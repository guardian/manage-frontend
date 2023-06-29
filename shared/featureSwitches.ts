export const initFeatureSwitchUrlParamOverride = () => {
	const searchParams = new URLSearchParams(window?.location.search);
	const param = searchParams.get('withFeature');
	if (param) {
		for (const [key, value] of Object.entries(featureSwitches)) {
			if (!value) {
				featureSwitches[key] = param === key;
			}
		}
	}
};

/*
 * you can add feature switches into this object and set the property value
 * to true or false, or use the 'featureSwitchUrlParamOveride' function
 * which will set the feature to true if a url param called 'withFeature' is
 * present and has a value of the feature switch object key name eg
 *
 * https://manage.theguardian.com/?withFeature=exampleFeature
 *
 * if the url param doesn't exist or its value does not match the feature
 * name provided then the function will return false and the feature switch
 * will be set to off.
 */
export const featureSwitches: Record<string, boolean> = {
	exampleFeature: false,
	appSubscriptions: true,
	singleContributions: true,
	membershipSave: true,
	supporterPlusUpdateAmount: false,
};
