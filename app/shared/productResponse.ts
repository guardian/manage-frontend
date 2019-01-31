import React from "react";
import AsyncLoader from "../client/components/asyncLoader";
import { CardProps } from "../client/components/payment/cardDisplay";

export type MembersDataApiResponse = ProductDetail | {};

export class MembersDatApiAsyncLoader extends AsyncLoader<
  MembersDataApiResponse[]
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

export const MDA_TEST_USER_HEADER = "X-Gu-Membership-Test-User";

export const annotateMdaResponseWithTestUserFromHeaders = async (
  response: Response
) =>
  ((await response.json()) as MembersDataApiResponse[]).map(data =>
    Object.assign(data, {
      isTestUser: response.headers.get(MDA_TEST_USER_HEADER) === "true"
    })
  );

export const alertTextWithoutCTA = (productDetail: ProductDetail) =>
  productDetail.alertText
    ? productDetail.alertText.replace(/Please check .*/g, "")
    : undefined;

export const sortByJoinDate = (a: ProductDetail, b: ProductDetail) =>
  b.joinDate.localeCompare(a.joinDate);

export interface ProductDetail extends WithSubscription {
  isTestUser: boolean; // THIS IS NOT PART OF THE RESPONSE (but inferred from a header)
  regNumber?: string;
  tier: string;
  isPaidTier: boolean;
  joinDate: string;
  alertText?: string;
}

export function hasProduct(
  data: MembersDataApiResponse | undefined
): data is ProductDetail {
  return !!data && data.hasOwnProperty("tier");
}

export interface Card extends CardProps {
  stripePublicKeyForUpdate: string;
  email?: string;
}

export interface DirectDebitDetails {
  accountName: string;
  accountNumber: string;
  sortCode: string;
}

export interface SubscriptionPlan {
  currency: string;
  currencyISO: string;
  interval: string;
}

export interface SubscriptionPlanWithAmount extends SubscriptionPlan {
  amount: number;
}

export interface Subscription {
  subscriptionId: string;
  start?: string;
  end: string;
  cancelledAt: boolean;
  nextPaymentDate?: string;
  nextPaymentPrice?: number;
  paymentMethod?: string;
  card?: Card;
  payPalEmail?: string;
  mandate?: DirectDebitDetails;
  autoRenew: boolean;
  plan: SubscriptionPlanWithAmount;
  trialLength: number;
}

export interface WithSubscription {
  subscription: Subscription;
}
