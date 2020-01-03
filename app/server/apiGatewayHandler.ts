import {
  StackResourceSummaries,
  StackResourceSummary
} from "aws-sdk/clients/cloudformation";
import express from "express";
import fetch from "node-fetch";
import url from "url";
import { MDA_TEST_USER_HEADER } from "../shared/productResponse";
import { APIGateway, AWS_REGION, CloudFormation } from "./awsIntegration";
import { conf } from "./config";
import { log } from "./log";

const isProd = conf.STAGE.toUpperCase() === "PROD";

const normalUserApiStage = isProd ? "PROD" : "DEV"; // i.e. CODE manage-frontend uses DEV when in normal mode
const testUserApiStage = "CODE";

const apiNames = [
  "cancellation-sf-cases-api",
  "delivery-records-api",
  "holiday-stop-api"
] as const;
export type ApiName = typeof apiNames[number];

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
  stage: string,
  stackResourceSummaries?: StackResourceSummaries
) => {
  const hosts = stackResourceSummaries
    ?.filter(byResourceType("AWS::ApiGateway::RestApi"))
    .map(toDefinedPhysicalResourceId(stackName))
    .map(
      apiGatewayId =>
        `${apiGatewayId}.execute-api.${AWS_REGION}.amazonaws.com/${stage}`
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
  stage: string,
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

const getHostAndApiKeyForStack = (apiName: ApiName, stage: string) => {
  const stackName = `membership-${stage}-${apiName}`;
  return CloudFormation.listStackResources({
    StackName: stackName
    // no resources in question have anywhere near enough resources per-stack to require pagination with 'NextToken'
    // https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_ListStackResources.html
  })
    .promise()
    .then(async result => ({
      host: getHost(stackName, stage, result.StackResourceSummaries),
      apiKey: await getApiKeyPromise(
        stackName,
        stage,
        result.StackResourceSummaries
      )
    }))
    .catch(log.error);
};

export type PathnameTransformer = (pathParams: any) => string;

export const apiGatewayHandler = (
  apiName: ApiName,
  pathnameTransformer: PathnameTransformer
) => {
  const normalModeConfigPromise = getHostAndApiKeyForStack(
    apiName,
    normalUserApiStage
  );
  const testModeConfigPromise = getHostAndApiKeyForStack(
    apiName,
    testUserApiStage
  );

  return async (req: express.Request, res: express.Response) => {
    const isTestUser = req.header(MDA_TEST_USER_HEADER) === "true";
    const { host, apiKey } = (await (isTestUser
      ? testModeConfigPromise
      : normalModeConfigPromise)) as any;
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
      fetch(
        url.format({
          protocol: "https",
          host,
          pathname: pathnameTransformer(req.params),
          query: req.query
        }),
        {
          method: req.method,
          headers: {
            "x-api-key": apiKey,
            "x-identity-id": res.locals.identity.userId
          },
          body: req.method !== "GET" ? req.body : undefined
        }
      )
        .then(intermediateResponse => {
          res.status(intermediateResponse.status);
          return intermediateResponse.json();
        })
        .then(responseBodyJSON => res.json(responseBodyJSON))
        .catch(e => {
          log.error(e);
          res.status(500).send();
        });
    }
  };
};
