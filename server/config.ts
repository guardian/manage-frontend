interface Config {
	readonly STAGE: string;
	readonly DOMAIN: string;
	readonly API_DOMAIN: string;
	readonly ENVIRONMENT: Environments;
	readonly CLIENT_DSN: string | null;
	readonly SERVER_DSN: string | null;
}

declare let process: {
	env: Record<string, string | undefined>;
};

const getConfig: (name: string) => string | null = (name) => {
	const value = name in process.env && process.env[name];

	return value || null; // or empty string as typescript not happy about throw
};

export enum Environments {
	AWS,
	DEVELOPMENT,
}

const stage = getConfig('STAGE');

export const getDomain = () => {
	switch (stage) {
		case 'PROD':
			return 'theguardian.com';
		case 'CODE':
			return 'code.dev-theguardian.com';
		default:
			return 'thegulocal.com';
	}
};

export const conf: Config = {
	STAGE: stage || 'DEV',
	DOMAIN: getDomain(),
	API_DOMAIN:
		stage === 'PROD' ? 'guardianapis.com' : 'code.dev-guardianapis.com',
	ENVIRONMENT:
		stage === 'PROD' || stage === 'CODE'
			? Environments.AWS
			: Environments.DEVELOPMENT,
	CLIENT_DSN: getConfig('CLIENT_DSN'),
	SERVER_DSN: getConfig('SERVER_DSN'),
};
