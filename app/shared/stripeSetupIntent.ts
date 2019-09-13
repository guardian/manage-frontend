export const STRIPE_PUBLIC_KEY_HEADER = "X-Gu-Stripe-Public-Key";

export interface StripeSetupIntent {
  id: string;
  client_secret: string;
}
