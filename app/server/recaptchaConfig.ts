import { s3ConfigPromise } from "./awsIntegration";

interface ReCaptchaKeys {
  publicKey: string;
  secretKey: string;
}

export const recaptchaConfigPromise = s3ConfigPromise<ReCaptchaKeys>()(
  "recaptcha"
);
