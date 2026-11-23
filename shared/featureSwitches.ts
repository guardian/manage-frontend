/*
 * you can add feature switches into this object and set the property value
 * to true or false, or use the 'featureSwitchUrlParamOveride' function
 * which will set the feature to true if a url param called 'withFeature' is
 * present and has a value of the feature switch object key name eg
 *
 * https://manage.theguardian.com/?withFeature=exampleFeature
 *
 * The value is remembered for the browser tab. Navigation that drops the
 * query param does not turn the switch off, and the param is put back on
 * the browser URL without a second navigation.
 *
 * if the url param doesn't exist or its value does not match the feature
 * name provided then the function will return false and the feature switch
 * will be set to off.
 */

type FeatureSwitchName =
	| 'exampleFeature'
	| 'appSubscriptions'
	| 'supporterPlusUpdateAmount'
	| 'digisubSave'
	| 'supporterplusCancellationOffer'
	| 'maintenanceMode'
	| 'contributionCancellationPause';

const defaultFeatureSwitches: Record<FeatureSwitchName, boolean> = {
	exampleFeature: false,
	appSubscriptions: true,
	supporterPlusUpdateAmount: true,
	digisubSave: true,
	supporterplusCancellationOffer: true,
	contributionCancellationPause: true,
	maintenanceMode: false,
};

export const featureSwitches: Record<FeatureSwitchName, boolean> = {
	...defaultFeatureSwitches,
};

export const FEATURE_SWITCH_QUERY_PARAM = 'withFeature';

const FEATURE_SWITCH_STORAGE_KEY = 'manage-frontend.withFeature';

const readStoredFeatureSwitchParam = (): string | null => {
	try {
		return window.sessionStorage.getItem(FEATURE_SWITCH_STORAGE_KEY);
	} catch {
		return null;
	}
};

const writeStoredFeatureSwitchParam = (param: string) => {
	try {
		window.sessionStorage.setItem(FEATURE_SWITCH_STORAGE_KEY, param);
	} catch {
		// sessionStorage is unavailable in some browsers.
	}
};

const applyFeatureSwitchOverride = (param: string) => {
	for (const key of Object.keys(
		defaultFeatureSwitches,
	) as FeatureSwitchName[]) {
		featureSwitches[key] = defaultFeatureSwitches[key] || param === key;
	}
};

export const storedFeatureSwitchParam = (): string | null => {
	if (typeof window === 'undefined') {
		return null;
	}
	return readStoredFeatureSwitchParam();
};

export const rememberFeatureSwitchParam = (param: string) => {
	writeStoredFeatureSwitchParam(param);
	applyFeatureSwitchOverride(param);
};

export const initFeatureSwitchUrlParamOverride = () => {
	if (typeof window === 'undefined') {
		return;
	}
	const param = new URLSearchParams(window.location.search).get(
		FEATURE_SWITCH_QUERY_PARAM,
	);
	if (param) {
		rememberFeatureSwitchParam(param);
		return;
	}
	const stored = readStoredFeatureSwitchParam();
	if (stored) {
		applyFeatureSwitchOverride(stored);
	}
};
