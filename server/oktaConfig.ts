import { s3ConfigPromise } from './awsIntegration';
import { log } from './log';

export interface OktaConfig {
	// If true, the withIdentity middleware will use the Okta OAuth flow.
	// If false, the withIdentity middleware will use the classic IDAPI cookie flow.
	useOkta: boolean;
	orgUrl: string;
	authServerId: string;
	clientId: string;
	clientSecret: string;
	cookieSecret: string;
}

const isValidConfig = (config: any): config is OktaConfig =>
	typeof config.useOkta === 'boolean' &&
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
	if (process.env.RUNNING_IN_CYPRESS === 'true') {
		config.useOkta = true;
	}
	return config;
};
