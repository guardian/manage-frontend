import { s3ConfigPromise } from './awsIntegration';
import { log } from './log';

export interface OktaConfig {
	orgUrl: string;
	authServerId: string;
	clientId: string;
	clientSecret: string;
	cookieSecret: string;
}

const isValidConfig = (config: any): config is OktaConfig =>
	config.orgUrl &&
	config.authServerId &&
	config.clientId &&
	config.clientSecret &&
	config.cookieSecret;

export const oktaConfigPromise: Promise<OktaConfig | undefined> =
	s3ConfigPromise<OktaConfig>('orgUrl', 'authServerId', 'clientId')('okta');

oktaConfigPromise.then((oktaConfig) => {
	if (oktaConfig) {
		log.info('OKTA: using ' + oktaConfig.orgUrl);
	}
});

export const getConfig = async (): Promise<OktaConfig> => {
	const config = await oktaConfigPromise;
	if (!isValidConfig(config)) {
		throw new Error('Error loading a valid config');
	}
	return config;
};
