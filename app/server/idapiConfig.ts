import * as AWS from "aws-sdk";
import { GetObjectRequest } from "aws-sdk/clients/s3";
import Raven from "raven";
import { conf } from "./config";
import { log } from "./log";

export interface IdapiConfig {
  host: string;
  accessToken: string;
}

// tslint:disable-next-line:no-object-mutation
process.env.AWS_PROFILE = "membership"; // TODO do this with CredentialProviderChain

const s3 = new AWS.S3({
  region: "eu-west-1"
  // credentialProvider: new AWS.CredentialProviderChain([
  //   ...AWS.CredentialProviderChain.defaultProviders,
  //   () => new AWS.SharedIniFileCredentials({ profile: "membership" })
  // ])
});

export const handleIdapiRelatedError = (message: string, detail?: any) => {
  log.error(message, detail);
  Raven.captureMessage(message);
};

export const idapiConfigPromise: Promise<
  IdapiConfig | undefined
> = (async () => {
  const idapiConfigPath: GetObjectRequest = {
    Bucket: "gu-reader-revenue-private",
    Key: `manage-frontend/${conf.STAGE}/idapi-${conf.STAGE}.json`
  };

  const s3PromiseResult = await s3.getObject(idapiConfigPath).promise();

  if (s3PromiseResult.Body) {
    try {
      const parsed = JSON.parse(s3PromiseResult.Body.toString());
      if (
        parsed.hasOwnProperty("host") &&
        parsed.hasOwnProperty("accessToken")
      ) {
        const idapiConfig = parsed as IdapiConfig;
        log.info("IDAPI: using " + idapiConfig.host);
        return idapiConfig;
      }
      handleIdapiRelatedError(
        "IDAPI config missing 'host' and/or 'accessToken' properties"
      );
    } catch (err) {
      handleIdapiRelatedError("could not parse IDAPI config", err);
    }
  }

  handleIdapiRelatedError(
    "error fetching IDAPI config from S3",
    s3PromiseResult
  );
})();
