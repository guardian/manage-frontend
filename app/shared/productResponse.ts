import Raven from "raven-js";
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
  ((await response.json()) as MembersDataApiResponse[]).map(data => ({
    ...data,
    isTestUser: response.headers.get(MDA_TEST_USER_HEADER) === "true",
    subscription: hasProduct(data)
      ? ({
          ...data.subscription,
          deliveryAddress: {
            addressLine1: "The Guardian, Kings Place",
            addressLine2: "90 York Way",
            town: "London",
            county_state: "",
            postcode_zipcode: "N1 9GU",
            country: "United Kingdom"
          },
          contactId: "ABDEF12345"
        } as Subscription)
      : undefined
  }));

export const alertTextWithoutCTA = (productDetail: ProductDetail) =>
  productDetail.alertText
    ? productDetail.alertText.replace(/Please check .*/g, "")
    : undefined;

export const sortByJoinDate = (a: ProductDetail, b: ProductDetail) =>
  b.joinDate.localeCompare(a.joinDate);

export interface ProductDetail extends WithSubscription {
  isTestUser: boolean; // THIS IS NOT PART OF THE RESPONSE (but inferred from a header)
  isPaidTier: boolean;
  regNumber?: string;
  tier: string;
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
  name: string | null;
  start?: string;
  shouldBeVisible: boolean;
}

export interface CurrencyAndIntervalDetail {
  currency: string;
  currencyISO: string;
  interval: string;
}

export const augmentInterval = (interval: string) =>
  interval === "6 weeks" ? "One-off" : `${interval}ly`;

export interface PaidSubscriptionPlan
  extends SubscriptionPlan,
    CurrencyAndIntervalDetail {
  start: string;
  end: string;
  chargedThrough?: string;
  amount: number;
}

export function isPaidSubscriptionPlan(
  subscriptionPlan: SubscriptionPlan
): subscriptionPlan is PaidSubscriptionPlan {
  return !!subscriptionPlan && subscriptionPlan.hasOwnProperty("amount");
}

export interface DeliveryAddress {
  addressLine1: string;
  addressLine2?: string;
  town?: string;
  county_state?: string;
  postcode_zipcode: string;
  country: string;
}

export interface Subscription {
  subscriptionId: string;
  start?: string;
  end: string;
  renewalDate: string;
  cancelledAt: boolean;
  nextPaymentDate: string | null;
  nextPaymentPrice: number | null;
  paymentMethod?: string;
  stripePublicKeyForCardAddition?: string;
  safeToUpdatePaymentMethod: boolean;
  card?: Card;
  payPalEmail?: string;
  mandate?: DirectDebitDetails;
  autoRenew: boolean;
  currentPlans: SubscriptionPlan[];
  futurePlans: SubscriptionPlan[];
  trialLength: number;
  deliveryAddress?: DeliveryAddress;
  contactId?: string;
}

export interface WithSubscription {
  subscription: Subscription;
}

export const getMainPlan: (subscription: Subscription) => SubscriptionPlan = (
  subscription: Subscription
) => {
  if (subscription.currentPlans.length > 0) {
    if (subscription.currentPlans.length > 1) {
      Raven.captureException(
        "User with more than one 'current plan' for a given subscription"
      );
    }
    return subscription.currentPlans[0];
  } else if (subscription.futurePlans.length > 0) {
    // fallback to use the first future plan (contributions for example are always future plans)
    return subscription.futurePlans[0];
  }
  return {
    name: null,
    start: subscription.start,
    shouldBeVisible: true
  };
};

export const getFuturePlanIfVisible = (subscription: Subscription) => {
  const indexToFetch = subscription.currentPlans.length === 0 ? 1 : 0; // if main plan is using the first future plan use the 2nd future plan
  return subscription.futurePlans
    .filter(isPaidSubscriptionPlan)
    .filter(plan => plan.shouldBeVisible)[indexToFetch];
};
