import { s3ConfigPromise } from './awsIntegration';
import type { IdapiConfig } from './idapiConfig';
import { log } from './log';

export interface MpapiConfig {
	host: string;
	accessToken: string;
}

export const getConfig = async (): Promise<IdapiConfig> => {
	const config = await mpapiConfigPromise;
	if (!isValidConfig(config)) {
		throw new Error('Error loading a valid config');
	}
	return config;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume the config argument could be a range of types?
const isValidConfig = (config: any): config is MpapiConfig =>
	config.host && config.accessToken;

export const getOptions = (
	method: string,
	config: IdapiConfig,
	identityId: string,
) => {
	const path = `/user/subscriptions/${identityId}`;
	const hostname = config.host;

	const headers = {
		Authorization: `Bearer ${config.accessToken}`,
	};

	const options = {
		headers,
		method,
		hostname,
		path,
	};

	return options;
};

const mpapiConfigPromise: Promise<MpapiConfig | undefined> =
	s3ConfigPromise<MpapiConfig>('host', 'accessToken')('mpapi');

mpapiConfigPromise.then((mpapiConfig) => {
	if (mpapiConfig) {
		log.info('Mobile Purchases API (MPAPI): using ' + mpapiConfig.host);
	}
});
