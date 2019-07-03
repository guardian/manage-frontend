import { s3ConfigPromise } from "./awsIntegration";
import { log } from "./log";

export interface IdapiConfig {
  host: string;
  accessToken: string;
}

export const idapiConfigPromise: Promise<
  IdapiConfig | undefined
> = s3ConfigPromise<IdapiConfig>("idapi", "host", "accessToken");

idapiConfigPromise.then(idapiConfig => {
  if (idapiConfig) {
    log.info("IDAPI: using " + idapiConfig.host);
  }
});
