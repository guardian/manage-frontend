import React from "react";
import {
  CancellationReason,
  OptionalCancellationReasonId
} from "../client/components/cancel/cancellationReason";
import { contributionsCancellationFlowStart } from "../client/components/cancel/contributions/contributionsCancellationFlowStart";
import { contributionsCancellationReasons } from "../client/components/cancel/contributions/contributionsCancellationReasons";
import { membershipCancellationFlowStart } from "../client/components/cancel/membership/membershipCancellationFlowStart";
import { membershipCancellationReasons } from "../client/components/cancel/membership/membershipCancellationReasons";
import { MeValidator } from "../client/components/checkFlowIsValid";
import { NavItem, navLinks } from "../client/components/nav";
import { MeResponse } from "./meResponse";
import { formatDate, Subscription } from "./productResponse";

export type ProductFriendlyName = "membership" | "recurring contribution"; // TODO use payment frequency instead of 'recurring' e.g. monthly annual etc
export type ProductUrlPart = "membership" | "contributions";
export type SfProduct = "Membership" | "Contribution";
export type ProductTitle = "Membership" | "Contributions";

export interface ProductType {
  friendlyName: ProductFriendlyName;
  productPageTitle: ProductTitle;
  urlPart: ProductUrlPart;
  navLink: NavItem;
  validator: MeValidator;
  sfProduct: SfProduct;
  noProductInTabCopy: string;
  updateAmountMdaEndpoint?: string;
  cancelLinkOnProductPage?: true;
  cancellationReasons: CancellationReason[];
  cancellationStartPageBody: JSX.Element;
  cancellationSaveTitlePrefix?: string;
  cancellationSummaryMainPara: (
    subscription: Subscription
  ) => JSX.Element | string;
  cancellationSummaryReasonSpecificPara: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  cancellationOnlyShowSupportSectionIfAlternateText: boolean;
  cancellationAlternateSupportButtonText: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  cancellationAlternateSupportButtonUrlSuffix: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  cancellationSwapFeedbackAndContactUs?: true;
  tierRowLabel?: string; // no label means row is not displayed
  includeGuardianInTitles?: true;
}

export interface WithProductType {
  productType: ProductType;
}

export const createProductDetailFetcher = (
  productType: ProductType
) => async () =>
  await fetch(`/api/me/${productType.urlPart}`, {
    credentials: "include",
    mode: "same-origin"
  });

export const ProductTypes: { [productKey: string]: ProductType } = {
  membership: {
    friendlyName: "membership",
    urlPart: "membership",
    navLink: navLinks.membership,
    validator: (me: MeResponse) => me.contentAccess.member,
    sfProduct: "Membership",
    productPageTitle: "Membership",
    noProductInTabCopy:
      "To manage your existing contribution or subscription, please select from the tabs above.",
    includeGuardianInTitles: true,
    cancellationReasons: membershipCancellationReasons,
    cancellationStartPageBody: membershipCancellationFlowStart,
    cancellationSummaryMainPara: (subscription: Subscription) =>
      subscription.end ? (
        <>
          You will continue to receive the benefits of your membership until{" "}
          <b>{formatDate(subscription.end)}</b>. You will not be charged again.
        </>
      ) : (
        "Your cancellation is effective immediately."
      ),
    cancellationSummaryReasonSpecificPara: () => undefined,
    cancellationOnlyShowSupportSectionIfAlternateText: false,
    cancellationAlternateSupportButtonText: () => undefined,
    cancellationAlternateSupportButtonUrlSuffix: () => undefined,
    tierRowLabel: "Membership tier"
  },
  contributions: {
    friendlyName: "recurring contribution",
    urlPart: "contributions",
    navLink: navLinks.contributions,
    validator: (me: MeResponse) => me.contentAccess.recurringContributor,
    sfProduct: "Contribution",
    productPageTitle: "Contributions",
    noProductInTabCopy:
      "To manage your existing membership or subscription, please select from the tabs above.",
    updateAmountMdaEndpoint: "contribution-update-amount",
    cancelLinkOnProductPage: true,
    cancellationReasons: contributionsCancellationReasons,
    cancellationStartPageBody: contributionsCancellationFlowStart,
    cancellationSaveTitlePrefix: "Reason: ",
    cancellationSummaryMainPara: () => "Thank you for your valuable support.",
    cancellationSummaryReasonSpecificPara: (
      reasonId: OptionalCancellationReasonId
    ) => {
      switch (reasonId) {
        case "mma_financial_circumstances":
        case "mma_value_for_money":
        case "mma_one_off":
          return "You can support The Guardian’s independent journalism with a single contribution, from as little as £1 – and it only takes a minute.";
        case "mma_wants_annual_contribution":
          return "You can support The Guardian’s independent journalism for the long term with an annual contribution.";
        case "mma_wants_monthly_contribution":
          return "You can support The Guardian’s independent journalism for the long term with a monthly contribution.";
        default:
          return undefined;
      }
    },
    cancellationOnlyShowSupportSectionIfAlternateText: true,
    cancellationAlternateSupportButtonText: (
      reasonId: OptionalCancellationReasonId
    ) => {
      switch (reasonId) {
        case "mma_financial_circumstances":
        case "mma_value_for_money":
        case "mma_one_off":
          return "Make a single contribution";
        case "mma_wants_annual_contribution":
          return "Make an annual contribution";
        case "mma_wants_monthly_contribution":
          return "Make a monthly contribution";
        default:
          return undefined;
      }
    },
    cancellationAlternateSupportButtonUrlSuffix: (
      reasonId: OptionalCancellationReasonId
    ) => {
      switch (reasonId) {
        /*TODO tweak the support url to preselect single/monthly/annual once functionality is available*/
        default:
          return "/contribute";
      }
    },
    cancellationSwapFeedbackAndContactUs: true
  }
};
