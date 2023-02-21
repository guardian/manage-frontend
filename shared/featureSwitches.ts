export const initFeatureSwitchUrlParamOverride = () => {
	const searchParams = new URLSearchParams(window?.location.search);
	const param = searchParams.get('withFeature');
	if (param) {
		for (const [key, value] of Object.entries(featureSwitches)) {
			if (!value) {
				featureSwitches[key] = param === key;
			}
		}
		// Required to use query params to force true states in Cypress tests
		for (const [key, value] of Object.entries(cypressSwitchState)) {
			if (!value) {
				cypressSwitchState[key] = param === key;
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
	cancellationProductSwitch: false,
	accountOverviewNewLayout: false,
	productSwitching: true,
	savedArticles: false,
};

// Cypress Testing:
// We want to be able to write tests independent of switch state that test both states.
// Use getFeatureSwitches to retrieve switches dependant on clientside environment.
// For example you can set a switch to false
// and opt in in Cypress via query search params in cy.visit(url).
declare global {
	interface Window {
		Cypress: unknown;
	}
}

const cypressSwitchState: Record<string, boolean> = {
	...featureSwitches,
	savedArticles: false,
};
export const getFeatureSwitches = (): Record<string, boolean> => {
	// If running within cypress, return the forced switches to keep tests consistent regardless of production state
	if (window !== undefined && window.Cypress) return cypressSwitchState;
	// Otherwise just return empty object
	return featureSwitches;
};
