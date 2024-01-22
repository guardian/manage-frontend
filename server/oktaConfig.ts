import { s3ConfigPromise } from './awsIntegration';
import { log } from './log';

export interface OktaConfig {
	// If true, the withIdentity middleware will use the Okta OAuth flow.
	// If false, the withIdentity middleware will use the classic IDAPI cookie flow.
	useOkta: boolean;
	maxAge: number; // in seconds
	orgUrl: string;
	authServerId: string;
	clientId: string;
	clientSecret: string;
	cookieSecret: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- assume the config argument could be a range of types?
const isValidConfig = (config: any): config is OktaConfig =>
	typeof config.useOkta === 'boolean' &&
	typeof config.maxAge === 'number' && // Could be 0
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

type OktaConfigOverride = Partial<OktaConfig>;

export const getConfig = async (
	configOverride: OktaConfigOverride = {},
): Promise<OktaConfig> => {
	let config = await oktaConfigPromise;
	if (!isValidConfig(config)) {
		throw new Error('Error loading a valid config');
	}
	if (process.env.RUNNING_IN_CYPRESS === 'true') {
		config = {
			...config,
			...configOverride,
			useOkta: true,
		};
	}
	return config;
};
