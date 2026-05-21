import type { PaymentMethod } from '@stripe/stripe-js';
import type { ReactElement } from 'react';
import type { Card, Subscription } from '../../../../../shared/productResponse';
import { CardDisplay } from '../../shared/CardDisplay';
import type { NewPaymentMethodDetail } from '../NewPaymentMethodDetail';

interface SubscriptionWithCard extends Subscription {
	card: Card;
}

function isSubscriptionWithCard(
	subscription?: Subscription,
): subscription is SubscriptionWithCard {
	return subscription !== undefined && subscription.card !== undefined;
}

export interface StripePaymentMethod extends PaymentMethod {
	card: PaymentMethod.Card;
}

export interface CardUpdateResponse {
	type: string;
	last4: string;
	expiryMonth: number;
	expiryYear: number;
}

export class NewCardPaymentMethodDetail implements NewPaymentMethodDetail {
	public readonly apiUrlPart = 'card';
	public readonly name = 'card';
	public readonly friendlyName = 'payment card';

	public readonly paymentFailureRecoveryMessage =
		'We will take the outstanding payment within 24 hours, using your new card details.';

	public readonly subHasExpectedPaymentType = isSubscriptionWithCard;

	private readonly stripePaymentMethod: StripePaymentMethod;
	private readonly stripePublicKeyForUpdate: string;

	constructor(
		stripePaymentMethod: StripePaymentMethod,
		stripePublicKeyForUpdate: string,
	) {
		this.stripePaymentMethod = stripePaymentMethod;
		this.stripePublicKeyForUpdate = stripePublicKeyForUpdate;
	}

	public readonly detailToPayloadObject = () => ({
		stripePaymentMethodID: this.stripePaymentMethod.id,
		stripePublicKey: this.stripePublicKeyForUpdate,
	});

	public readonly matchesResponse = (response: CardUpdateResponse) =>
		response.last4 === this.stripePaymentMethod.card.last4;

	public readonly render = (subscription?: Subscription) =>
		isSubscriptionWithCard(subscription) ? (
			<CardDisplay
				last4={subscription.card.last4}
				type={subscription.card.type}
			/>
		) : (
			<CardDisplay
				last4={this.stripePaymentMethod.card.last4}
				type={this.stripePaymentMethod.card.brand}
			/>
		);

	public readonly confirmButtonWrapper = (confirmButton: ReactElement) =>
		confirmButton;
}
