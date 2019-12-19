import { s3ConfigPromise } from "./awsIntegration";

export interface ApiEnvConfig {
  host: string;
  apiKey: string;
}

export interface ApiConfig {
  normalMode: ApiEnvConfig;
  testMode: ApiEnvConfig;
}

export const apiConfigPromise: (
  configPathPart: string
) => Promise<ApiConfig | undefined> = s3ConfigPromise<ApiConfig>(
  "normalMode",
  "testMode"
);
