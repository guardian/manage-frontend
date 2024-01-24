import { s3ConfigPromise } from './awsIntegration';
import { log } from './log';

export interface IdapiConfig {
	host: string;
	accessToken: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume the config argument could be a range of types?
const isValidConfig = (config: any): config is IdapiConfig =>
	config.host && config.accessToken;

export const idapiConfigPromise: Promise<IdapiConfig | undefined> =
	s3ConfigPromise<IdapiConfig>('host', 'accessToken')('idapi');

idapiConfigPromise.then((idapiConfig) => {
	if (idapiConfig) {
		log.info('IDAPI: using ' + idapiConfig.host);
	}
});

export const getConfig = async (): Promise<IdapiConfig> => {
	const config = await idapiConfigPromise;
	if (!isValidConfig(config)) {
		throw new Error('Error loading a valid config');
	}
	return config;
};
