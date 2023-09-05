import type {
	StackResourceSummaries,
	StackResourceSummary,
} from 'aws-sdk/clients/cloudformation';
import type express from 'express';
import { MDA_TEST_USER_HEADER } from '../shared/productResponse';
import type { AdditionalHeaderGenerator, Headers } from './apiProxy';
import { proxyApiHandler, straightThroughBodyHandler } from './apiProxy';
import {
	APIGateway,
	AWS_REGION,
	CloudFormation,
	generateAwsSignatureHeaders,
} from './awsIntegration';
import { conf } from './config';
import { log } from './log';

const isProd = conf.STAGE.toUpperCase() === 'PROD';

const normalUserApiStage = isProd ? 'PROD' : 'CODE';
const testUserApiStage = 'CODE';

const apiNames = [
	'cancellation-sf-cases-api',
	'delivery-records-api',
	'holiday-stop-api',
	'invoicing-api',
	'contact-us-api',
	'product-move-api',
] as const;
type ApiName = typeof apiNames[number];

const byResourceType =
	(resourceTypeFilter: string) => (resource: StackResourceSummary) =>
		resource.ResourceType === resourceTypeFilter;

const toDefinedPhysicalResourceId =
	(stackName: string) => (resource: StackResourceSummary) => {
		if (resource.PhysicalResourceId) {
			return resource.PhysicalResourceId;
		}
		throw new Error(
			`PhysicalResourceId missing for '${resource.ResourceType}' of ${stackName}`,
		);
	};

const getHost = (
	stackName: string,
	stackResourceSummaries?: StackResourceSummaries,
) => {
	const hosts = stackResourceSummaries
		?.filter(byResourceType('AWS::ApiGateway::RestApi'))
		.map(toDefinedPhysicalResourceId(stackName))
		.map(
			(apiGatewayId) =>
				`${apiGatewayId}.execute-api.${AWS_REGION}.amazonaws.com`,
		);
	if (hosts && hosts.length === 1) {
		return hosts[0];
	}
	log.error(`${(hosts || []).length} hosts for ${stackName}, expected 1`);
};

const lookupApiKey = async (apiKey: string) =>
	(
		await APIGateway.getApiKey({
			apiKey,
			includeValue: true,
		}).promise()
	).value;

const getApiKeyPromise = (
	stackName: string,
	stackResourceSummaries?: StackResourceSummaries,
) => {
	const apiKeyPromises = stackResourceSummaries
		?.filter(byResourceType('AWS::ApiGateway::ApiKey'))
		.map(toDefinedPhysicalResourceId(stackName))
		.map(lookupApiKey);
	if (apiKeyPromises && apiKeyPromises.length === 1) {
		return apiKeyPromises[0];
	}
	log.error(
		`${
			(apiKeyPromises || []).length
		} API keys for ${stackName}, expected 1`,
	);
};

interface HostAndApiKey {
	host?: string;
	apiKey?: string;
}

type StackPrefix = 'membership' | 'support';

function getHostAndApiKeyForStack(
	stackPrefix: StackPrefix,
	apiName: ApiName,
	stage: string,
): Promise<HostAndApiKey> {
	const stackName = `${stackPrefix}-${stage}-${apiName}`;

	log.info(`loading host and api key for ${stackName}`);

	return CloudFormation.listStackResources({
		StackName: stackName,
		// no resources in question have anywhere near enough resources per-stack to require pagination with 'NextToken'
		// https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_ListStackResources.html
	})
		.promise()
		.then(async (result) => ({
			host: getHost(stackName, result.StackResourceSummaries),
			apiKey: await getApiKeyPromise(
				stackName,
				result.StackResourceSummaries,
			),
		}))
		.catch((err) => {
			log.error(`ERROR loading host and api key for ${stackName}. `, err);
			return {};
		});
}

const getApiGateway = (
	stackPrefix: StackPrefix,
	apiName: ApiName,
	additionalHeaderGenerator?: AdditionalHeaderGenerator,
) => {
	const normalModeConfigPromise = getHostAndApiKeyForStack(
		stackPrefix,
		apiName,
		normalUserApiStage,
	);
	const testModeConfigPromise = getHostAndApiKeyForStack(
		stackPrefix,
		apiName,
		testUserApiStage,
	);

	return {
		configPromises: [testModeConfigPromise, normalModeConfigPromise],
		authorisedExpressCallback:
			(
				path: string,
				loggingCode: string,
				urlParamNamesToReplace: string[] = [],
				headers: Headers = {},
				shouldNotLogBody?: boolean,
			) =>
			async (req: express.Request, res: express.Response) => {
				const isTestUser = req.header(MDA_TEST_USER_HEADER) === 'true';
				const { host, apiKey } = await (isTestUser
					? testModeConfigPromise
					: normalModeConfigPromise);
				const stage = isTestUser
					? testUserApiStage
					: normalUserApiStage;
				if (!apiKey) {
					log.error(`Missing API Key for ${stage} ${apiName}`);
					res.status(500).send();
				} else if (!host) {
					log.error(`Missing host for ${stage} ${apiName}`);
					res.status(500).send();
				} else if (
					!res.locals.identity &&
					!res.locals.identity.userId
				) {
					log.error(`Missing identity ID on the request object`);
					res.status(500).send();
				} else {
					const shouldForwardQueryArgs = true;
					return proxyApiHandler(
						host,
						{
							'x-api-key': apiKey,
							'x-identity-id':
								res.locals.identity &&
								res.locals.identity.userId,
							...headers,
						},
						additionalHeaderGenerator,
					)(straightThroughBodyHandler)(
						`${stage}/${path}`,
						loggingCode,
						urlParamNamesToReplace,
						shouldForwardQueryArgs,
						shouldNotLogBody,
					)(req, res);
				}
			},
	};
};

const cancellationSfCasesAPIGateway = getApiGateway(
	'membership',
	'cancellation-sf-cases-api',
);
export const cancellationSfCasesAPI =
	cancellationSfCasesAPIGateway.authorisedExpressCallback;

const holidayStopAPIGateway = getApiGateway('membership', 'holiday-stop-api');
export const holidayStopAPI = holidayStopAPIGateway.authorisedExpressCallback;

const deliveryRecordsAPIGateway = getApiGateway(
	'membership',
	'delivery-records-api',
);
export const deliveryRecordsAPI =
	deliveryRecordsAPIGateway.authorisedExpressCallback;

const productMoveAPIGateway = getApiGateway(
	'membership',
	'product-move-api',
	generateAwsSignatureHeaders,
);
export const productMoveAPI = productMoveAPIGateway.authorisedExpressCallback;

const invoicingAPIGateway = getApiGateway(
	'support',
	'invoicing-api',
	generateAwsSignatureHeaders,
);
export const invoicingAPI = invoicingAPIGateway.authorisedExpressCallback;

// not sure why this doesn't follow the pattern above
export const getContactUsAPIHostAndKey = async () => {
	const stage = conf.STAGE.toUpperCase() === 'PROD' ? 'PROD' : 'CODE';
	const { host, apiKey } = await getHostAndApiKeyForStack(
		'membership',
		'contact-us-api',
		stage,
	);

	if (!apiKey) {
		log.error(`Missing API Key for ${stage} contact-us-api`);
		return undefined;
	} else if (!host) {
		log.error(`Missing host for ${stage} contact-us-api`);
		return undefined;
	}

	return { host: `https://${host}/${stage}/`, apiKey };
};

const apiCredentialsArray = [
	cancellationSfCasesAPIGateway,
	holidayStopAPIGateway,
	deliveryRecordsAPIGateway,
	invoicingAPIGateway,
];

export const middlewareFailIfAnyAPIGatewayCredsAreMissing = (
	errorMessage: string,
) => {
	const allConfigPromises = apiCredentialsArray.flatMap(
		(_) => _.configPromises,
	);

	return async (
		_: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		const allConfig = await Promise.all(allConfigPromises);

		if (allConfig.every(({ host, apiKey }) => host && apiKey)) {
			next();
		} else {
			log.error(errorMessage);
			res.status(500).send(errorMessage);
		}
	};
};
