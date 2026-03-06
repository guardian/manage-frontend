import type * as braze from '@braze/web-sdk';

export type BrazeInstance = typeof braze;

const SDK_OPTIONS: braze.InitializationOptions = {
	enableLogging: true,
	noCookies: true,
	baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
	sessionTimeoutInSeconds: 1,
	minimumIntervalBetweenTriggerActionsInSeconds: 0,
	devicePropertyAllowlist: [],
	allowUserSuppliedJavascript: true,
};

const initialiseBraze = async (apiKey: string): Promise<typeof braze> => {
	const importedBraze = (await import(
		/* webpackChunkName: "braze-web-sdk-core" */ '@braze/web-sdk'
	)) as unknown as typeof braze;

	importedBraze.initialize(apiKey, SDK_OPTIONS);

	return importedBraze;
};

const getInitialisedBraze = (() => {
	let cache: Promise<typeof braze> | undefined;

	return (apiKey: string): Promise<typeof braze> => {
		if (cache === undefined) {
			cache = initialiseBraze(apiKey);
		}
		return cache;
	};
})();

export { getInitialisedBraze };
