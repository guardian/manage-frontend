import {
  StackResourceSummaries,
  StackResourceSummary
} from "aws-sdk/clients/cloudformation";
import express from "express";
import { MDA_TEST_USER_HEADER } from "../shared/productResponse";
import {
  AdditionalHeaderGenerator,
  proxyApiHandler,
  straightThroughBodyHandler
} from "./apiProxy";
import {
  APIGateway,
  AWS_REGION,
  CloudFormation,
  generateAwsSignatureHeaders
} from "./awsIntegration";
import { conf } from "./config";
import { log } from "./log";

const isProd = conf.STAGE.toUpperCase() === "PROD";

const normalUserApiStage = isProd ? "PROD" : "DEV"; // i.e. CODE manage-frontend uses DEV when in normal mode
const testUserApiStage = "CODE";

const apiNames = [
  "cancellation-sf-cases-api",
  "delivery-records-api",
  "holiday-stop-api",
  "invoicing-api"
] as const;
type ApiName = typeof apiNames[number];

const byResourceType = (resourceTypeFilter: string) => (
  resource: StackResourceSummary
) => resource.ResourceType === resourceTypeFilter;

const toDefinedPhysicalResourceId = (stackName: string) => (
  resource: StackResourceSummary
) => {
  if (resource.PhysicalResourceId) {
    return resource.PhysicalResourceId;
  }
  throw new Error(
    `PhysicalResourceId missing for '${resource.ResourceType}' of ${stackName}`
  );
};

const getHost = (
  stackName: string,
  stackResourceSummaries?: StackResourceSummaries
) => {
  const hosts = stackResourceSummaries
    ?.filter(byResourceType("AWS::ApiGateway::RestApi"))
    .map(toDefinedPhysicalResourceId(stackName))
    .map(
      apiGatewayId => `${apiGatewayId}.execute-api.${AWS_REGION}.amazonaws.com`
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
      includeValue: true
    }).promise()
  ).value;

const getApiKeyPromise = (
  stackName: string,
  stackResourceSummaries?: StackResourceSummaries
) => {
  const apiKeyPromises = stackResourceSummaries
    ?.filter(byResourceType("AWS::ApiGateway::ApiKey"))
    .map(toDefinedPhysicalResourceId(stackName))
    .map(lookupApiKey);
  if (apiKeyPromises && apiKeyPromises.length === 1) {
    return apiKeyPromises[0];
  }
  log.error(
    `${(apiKeyPromises || []).length} API keys for ${stackName}, expected 1`
  );
};

interface HostAndApiKey {
  host?: string;
  apiKey?: string;
}

type StackPrefix = "membership" | "support";

function getHostAndApiKeyForStack(
  stackPrefix: StackPrefix,
  apiName: ApiName,
  stage: string
): Promise<HostAndApiKey> {
  const stackName = `${stackPrefix}-${stage}-${apiName}`;

  log.info(`loading host and api key for ${stackName}`);

  return CloudFormation.listStackResources({
    StackName: stackName
    // no resources in question have anywhere near enough resources per-stack to require pagination with 'NextToken'
    // https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_ListStackResources.html
  })
    .promise()
    .then(async result => ({
      host: getHost(stackName, result.StackResourceSummaries),
      apiKey: await getApiKeyPromise(stackName, result.StackResourceSummaries)
    }))
    .catch(err => {
      log.error(`ERROR loading host and api key for ${stackName}`, err);
      return {};
    });
}

const getAuthorisedExpressCallbackForApiGateway = (
  stackPrefix: StackPrefix,
  apiName: ApiName,
  additionalHeaderGenerator?: AdditionalHeaderGenerator
) => {
  const normalModeConfigPromise = getHostAndApiKeyForStack(
    stackPrefix,
    apiName,
    normalUserApiStage
  );
  const testModeConfigPromise = getHostAndApiKeyForStack(
    stackPrefix,
    apiName,
    testUserApiStage
  );

  return (
    path: string,
    loggingCode: string,
    ...urlParamNamesToReplace: string[]
  ) => async (req: express.Request, res: express.Response) => {
    const isTestUser = req.header(MDA_TEST_USER_HEADER) === "true";
    const { host, apiKey } = await (isTestUser
      ? testModeConfigPromise
      : normalModeConfigPromise);
    const stage = isTestUser ? testUserApiStage : normalUserApiStage;
    if (!apiKey) {
      log.error(`Missing API Key for ${stage} ${apiName}`);
      res.status(500).send();
    } else if (!host) {
      log.error(`Missing host for ${stage} ${apiName}`);
      res.status(500).send();
    } else if (!res.locals.identity && !res.locals.identity.userId) {
      log.error(`Missing identity ID on the request object`);
      res.status(500).send();
    } else {
      const forwardQueryArgs = true;
      return proxyApiHandler(
        host,
        {
          "x-api-key": apiKey,
          "x-identity-id": res.locals.identity && res.locals.identity.userId
        },
        additionalHeaderGenerator
      )(straightThroughBodyHandler)(
        `${stage}/${path}`,
        loggingCode,
        forwardQueryArgs,
        ...urlParamNamesToReplace
      )(req, res);
    }
  };
};

export const cancellationSfCasesAPI = getAuthorisedExpressCallbackForApiGateway(
  "membership",
  "cancellation-sf-cases-api"
);
export const holidayStopAPI = getAuthorisedExpressCallbackForApiGateway(
  "membership",
  "holiday-stop-api"
);
export const deliveryRecordsAPI = getAuthorisedExpressCallbackForApiGateway(
  "membership",
  "delivery-records-api"
);
export const invoicingAPI = getAuthorisedExpressCallbackForApiGateway(
  "support",
  "invoicing-api",
  generateAwsSignatureHeaders
);
