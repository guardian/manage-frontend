import * as React from "react";
import { Card, Subscription } from "../../../../../shared/productResponse";
import { StripeSetupIntent } from "../../../../../shared/stripeSetupIntent";
import { CardDisplay } from "../../cardDisplay";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";

export interface SubscriptionWithCard extends Subscription {
  card: Card;
}

function isSubscriptionWithCard(
  subscription?: Subscription
): subscription is SubscriptionWithCard {
  return subscription !== undefined && subscription.card !== undefined;
}

export interface CardUpdateResponse {
  type: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
}

export class NewCardPaymentMethodDetail implements NewPaymentMethodDetail {
  public readonly apiUrlPart = "card";
  public readonly name = "card";
  public readonly friendlyName = "payment card";

  public readonly paymentFailureRecoveryMessage =
    "We will take the outstanding payment within 24 hours, using your new card details.";

  public readonly subHasExpectedPaymentType = isSubscriptionWithCard;

  private readonly card: stripe.Card;
  private readonly stripeSetupIntent: StripeSetupIntent;
  private readonly stripePublicKeyForUpdate: string;

  constructor(
    card: stripe.Card,
    stripeSetupIntent: StripeSetupIntent,
    stripePublicKeyForUpdate: string
  ) {
    this.card = card;
    this.stripeSetupIntent = stripeSetupIntent;
    this.stripePublicKeyForUpdate = stripePublicKeyForUpdate;
  }

  public readonly detailToPayloadObject = () => ({
    stripeSetupIntentId: this.stripeSetupIntent.id,
    publicKey: this.stripePublicKeyForUpdate
  });

  public readonly matchesResponse = (response: CardUpdateResponse) =>
    response.last4 === this.card.last4;

  public readonly render = (subscription?: Subscription) =>
    isSubscriptionWithCard(subscription) ? (
      <CardDisplay
        last4={subscription.card.last4}
        type={subscription.card.type}
      />
    ) : (
      <CardDisplay last4={this.card.last4} type={this.card.brand} />
    );

  public readonly confirmButtonWrapper = (confirmButton: JSX.Element) =>
    confirmButton;
}
