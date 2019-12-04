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
  ...fieldNamesToValidate: string[]
) =>
  s3FilePromise<ConfigInterface>(
    "gu-reader-revenue-private",
    `manage-frontend/${conf.STAGE}/${configPathPart}-${conf.STAGE}.json`,
    ...fieldNamesToValidate
  );

export const s3FilePromise = <ConfigInterface>(
  bucket: string,
  fileKey: string,
  ...fieldNamesToValidate: string[]
) =>
  (async () => {
    const configPath: GetObjectRequest = {
      Bucket: bucket,
      Key: fileKey
    };

    const s3PromiseResult = await S3.getObject(configPath).promise();

    if (s3PromiseResult.Body) {
      try {
        const parsed = JSON.parse(s3PromiseResult.Body.toString());
        const missingProperties = fieldNamesToValidate.filter(
          field => !parsed.hasOwnProperty(field)
        );
        if (missingProperties.length === 0) {
          return parsed as ConfigInterface;
        }
        handleAwsRelatedError(
          `${fileKey} missing ${missingProperties.map(
            field => `'${field}'`
          )} properties in '${bucket}'`
        );
      } catch (err) {
        handleAwsRelatedError(`could not parse ${fileKey} in '${bucket}'`, err);
      }
    }

    handleAwsRelatedError(
      `S3 error fetching ${fileKey} in '${bucket}'`,
      s3PromiseResult
    );
  })();
