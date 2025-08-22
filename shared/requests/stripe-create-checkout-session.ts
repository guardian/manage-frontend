export interface StripeCreateCheckoutSessionRequest {
	paymentMethodType: 'card';
	productTypeUrlPart: string;
	subscriptionId: string;
}
