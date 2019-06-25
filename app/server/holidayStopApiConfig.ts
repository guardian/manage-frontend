import { s3ConfigPromise } from "./awsIntegration";

export interface HolidayStopApiEnvConfig {
  host: string;
  apiKey: string;
}

export interface HolidayStopApisConfig {
  normalMode: HolidayStopApiEnvConfig;
  testMode: HolidayStopApiEnvConfig;
}

export const holidayStopApiConfigPromise: Promise<
  HolidayStopApisConfig | undefined
> = s3ConfigPromise<HolidayStopApisConfig>(
  "holiday-stop-api",
  "normalMode",
  "testMode"
);
