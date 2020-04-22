import { s3ConfigPromise } from "./awsIntegration";

export interface StripePublicToSecretKeyMapping {
  [publicKey: string]: string;
}

export const stripeSetupIntentConfigPromise: Promise<
  StripePublicToSecretKeyMapping | undefined
> = s3ConfigPromise<StripePublicToSecretKeyMapping>()(
  "stripe-public-to-private-key-mapping"
);

export interface ReCaptchaKeys {
  publicKey: string;
  secretKey: string;
}

export const recaptchaConfigPromise = s3ConfigPromise<ReCaptchaKeys>()(
  "recaptcha"
);
