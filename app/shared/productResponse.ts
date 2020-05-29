import * as Sentry from "@sentry/browser";
import React from "react";
import AsyncLoader from "../client/components/asyncLoader";
import { DeliveryRecordDetail } from "../client/components/delivery/records/deliveryRecordsApi";
import { CardProps } from "../client/components/payment/cardDisplay";

export type DeliveryRecordApiItem = DeliveryRecordDetail;

export type MembersDataApiItem = ProductDetail | {};

export class MembersDatApiAsyncLoader extends AsyncLoader<
  MembersDataApiItem[]
> {}

export const MembersDataApiItemContext: React.Context<MembersDataApiItem> = React.createContext(
  {}
);

export const formatDate = (shortForm: string) => {
  return new Date(shortForm).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

export const MDA_TEST_USER_HEADER = "X-Gu-Membership-Test-User";

export const alertTextWithoutCTA = (productDetail: ProductDetail) =>
  productDetail.alertText
    ? productDetail.alertText.replace(/Please check .*/g, "")
    : undefined;

export const sortByJoinDate = (a: ProductDetail, b: ProductDetail) =>
  b.joinDate.localeCompare(a.joinDate);

export interface ProductDetail extends WithSubscription {
  isTestUser: boolean; // THIS IS NOT PART OF THE members-data-api RESPONSE (but inferred from a header)
  isPaidTier: boolean;
  regNumber?: string;
  tier: string;
  joinDate: string;
  mmaCategory: "subscriptions" | "contributions" | "membership";
  alertText?: string;
}

export function isProduct(
  data: MembersDataApiItem | undefined
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
  daysOfWeek?: string[];
}

export interface CurrencyAndIntervalDetail {
  currency: string;
  currencyISO: string;
  interval: string;
}

// 6 weeks interval referes to GW 6 for 6 up front payment (not to be confused with one off contributions which don't come through in this response
export const augmentInterval = (interval: string) =>
  interval === "6 weeks" ? "one-off" : `${interval}ly`;

export const isSixForSix = (planName: string | null) =>
  planName && planName.indexOf("6 for 6") !== -1;

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
  region?: string;
  postcode: string;
  country: string;
  instructions?: string;
  addressChangeInformation?: string;
}

export type ReaderType = "Gift" | "Direct" | "Agent" | "Complementary";

export interface Subscription {
  subscriptionId: string;
  start?: string;
  end: string;
  renewalDate: string;
  cancelledAt: boolean;
  nextPaymentDate: string | null;
  lastPaymentDate: string | null;
  chargedThroughDate: string | null;
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
  readerType: ReaderType;
  deliveryAddress?: DeliveryAddress;
  contactId?: string;
  // THIS IS NOT PART OF THE members-data-api RESPONSE (it's injected server-side - see server/routes/api.ts)
  deliveryAddressChangeEffectiveDate?: string;
}

export interface SubscriptionWithDeliveryAddress extends Subscription {
  deliveryAddress: DeliveryAddress;
}

export interface WithSubscription {
  subscription: Subscription;
}

export const isGift = (subscription: Subscription) =>
  subscription.readerType === "Gift";

export const getMainPlan: (subscription: Subscription) => SubscriptionPlan = (
  subscription: Subscription
) => {
  if (subscription.currentPlans.length > 0) {
    if (subscription.currentPlans.length > 1) {
      Sentry.captureException(
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
    .filter(plan => plan.shouldBeVisible)[indexToFetch]; // TODO: check if this is unsafe
};
