import * as AWS from "aws-sdk";
import { GetObjectRequest } from "aws-sdk/clients/s3";
import Raven from "raven";
import { conf } from "./config";
import { log } from "./log";

const REGION = "eu-west-1";

const PROFILE = "membership";

const CREDENTIAL_PROVIDER = new AWS.CredentialProviderChain([
  () => new AWS.SharedIniFileCredentials({ profile: PROFILE }),
  ...AWS.CredentialProviderChain.defaultProviders
]);

export const S3 = new AWS.S3({
  region: REGION,
  credentialProvider: CREDENTIAL_PROVIDER
});

export const handleAwsRelatedError = (message: string, detail?: any) => {
  log.error(message, detail);
  Raven.captureMessage(message);
};

export const s3ConfigPromise = <ConfigInterface>(
  configPathPart: string,
  ...fields: string[]
) =>
  (async () => {
    const configPath: GetObjectRequest = {
      Bucket: "gu-reader-revenue-private",
      Key: `manage-frontend/${conf.STAGE}/${configPathPart}-${conf.STAGE}.json`
    };

    const s3PromiseResult = await S3.getObject(configPath).promise();

    if (s3PromiseResult.Body) {
      try {
        const parsed = JSON.parse(s3PromiseResult.Body.toString());
        if (
          fields.filter(field => parsed.hasOwnProperty(field)).length ===
          fields.length
        ) {
          return parsed as ConfigInterface;
        }
        handleAwsRelatedError(
          `${configPathPart} config missing ${fields
            .map(field => `'${field}'`)
            .join(" and/or ")} properties`
        );
      } catch (err) {
        handleAwsRelatedError(`could not parse ${configPathPart} config`, err);
      }
    }

    handleAwsRelatedError(
      `error fetching ${configPathPart} config from S3`,
      s3PromiseResult
    );
  })();
