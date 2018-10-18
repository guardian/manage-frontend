import React from "react";
import AsyncLoader from "../client/components/asyncLoader";
import { CardProps } from "../client/components/payment/cardDisplay";

export type MembersDataApiResponse = ProductDetail | {};

export class MembersDatApiAsyncLoader extends AsyncLoader<
  MembersDataApiResponse
> {}

export const MembersDataApiResponseContext: React.Context<
  MembersDataApiResponse
> = React.createContext({});

export const formatDate = (shortForm: string) => {
  return new Date(shortForm).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

export interface ProductDetail extends WithSubscription {
  regNumber?: string;
  tier: string;
  isPaidTier: boolean;
  joinDate: string;
  alertText?: string;
}

export function hasProduct(
  data: MembersDataApiResponse
): data is ProductDetail {
  return data.hasOwnProperty("tier");
}

export interface Card extends CardProps {
  stripePublicKeyForUpdate: string;
  email?: string;
}

export interface DirectDebitDetails {
  accountName: string;
}

export interface SubscriptionPlan {
  amount: number;
  currency: string;
  currencyISO: string;
  interval: string;
}

export interface Subscription {
  subscriberId: string;
  start: string;
  end: string;
  cancelledAt: boolean;
  nextPaymentDate: string;
  nextPaymentPrice: number;
  paymentMethod?: string;
  card?: Card;
  payPalEmail?: string;
  account?: DirectDebitDetails;
  plan: SubscriptionPlan;
}

export interface WithSubscription {
  subscription: Subscription;
}
