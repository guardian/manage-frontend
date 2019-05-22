import { s3ConfigPromise } from "./awsIntegration";

export interface HolidayStopApiConfig {
  host: string;
  apiKey: string;
}

export const holidayStopApiConfigPromise: Promise<
  HolidayStopApiConfig | undefined
> = s3ConfigPromise<HolidayStopApiConfig>("holiday-stop-api", "host", "apiKey");
