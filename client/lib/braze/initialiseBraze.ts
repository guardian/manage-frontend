import type * as braze from '@braze/web-sdk';
import { isDevelopmentDomain } from './brazeConfig';

export type BrazeInstance = typeof braze;

const initialiseBraze = async (apiKey: string): Promise<typeof braze> => {
	const importedBraze = (await import(
		/* webpackChunkName: "braze-web-sdk-core" */ '@braze/web-sdk'
	)) as unknown as typeof braze;

	const sdkOptions: braze.InitializationOptions = {
		enableLogging: isDevelopmentDomain(),
		noCookies: true,
		baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
		sessionTimeoutInSeconds: 1,
		minimumIntervalBetweenTriggerActionsInSeconds: 0,
		devicePropertyAllowlist: [],
		allowUserSuppliedJavascript: true,
	};

	importedBraze.initialize(apiKey, sdkOptions);

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
