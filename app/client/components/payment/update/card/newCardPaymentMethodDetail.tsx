import * as React from "react";
import { Card, Subscription } from "../../../../../shared/productResponse";
import { CardDisplay } from "../../cardDisplay";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";

export interface TokenWithCard extends stripe.Token {
  card: stripe.Card;
}

export function isTokenWithCard(
  maybeTokenWithCard: stripe.Token
): maybeTokenWithCard is TokenWithCard {
  return maybeTokenWithCard.hasOwnProperty("card");
}

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

  private readonly stripeToken: TokenWithCard;
  private readonly stripePublicKeyForUpdate: string;

  constructor(stripeToken: TokenWithCard, stripePublicKeyForUpdate: string) {
    this.stripeToken = stripeToken;
    this.stripePublicKeyForUpdate = stripePublicKeyForUpdate;
  }

  public readonly detailToPayloadObject = () => ({
    stripeToken: this.stripeToken.id,
    publicKey: this.stripePublicKeyForUpdate
  });

  public readonly matchesResponse = (response: CardUpdateResponse) =>
    response.last4 === this.stripeToken.card.last4;

  public readonly render = (subscription?: Subscription) =>
    isSubscriptionWithCard(subscription) ? (
      <CardDisplay
        last4={subscription.card.last4}
        type={subscription.card.type}
      />
    ) : (
      <CardDisplay
        last4={this.stripeToken.card.last4}
        type={this.stripeToken.card.brand}
      />
    );

  public readonly confirmButtonWrapper = (confirmButton: JSX.Element) =>
    confirmButton;
}
