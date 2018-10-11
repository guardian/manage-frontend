import React from "react";
import { CancellationReason } from "../client/components/cancel/cancellationReason";
import { contributionsCancellationFlowStart } from "../client/components/cancel/contributions/contributionsCancellationFlowStart";
import { contributionsCancellationReasons } from "../client/components/cancel/contributions/contributionsCancellationReasons";
import { membershipCancellationFlowStart } from "../client/components/cancel/membership/membershipCancellationFlowStart";
import { membershipCancellationReasons } from "../client/components/cancel/membership/membershipCancellationReasons";
import { MeValidator } from "../client/components/checkFlowIsValid";
import { NavItem, navLinks } from "../client/components/nav";
import { MeResponse } from "./meResponse";

export type ProductFriendlyName = "membership" | "recurring contribution"; // TODO use payment frequency instead of 'recurring' e.g. monthly annual etc
export type ProductUrlPart = "membership" | "contributions";
export type SfProduct = "Membership" | "Contributions";
export type ProductTitle = "Membership" | "Contributions";

export interface ProductType {
  friendlyName: ProductFriendlyName;
  productPageTitle: ProductTitle;
  urlPart: ProductUrlPart;
  navLink: NavItem;
  validator: MeValidator;
  sfProduct: SfProduct;
  cancellationReasons: CancellationReason[];
  cancellationStartPageBody: JSX.Element;
  tierRowLabel?: string; // no label means row is not displayed
}

export interface WithProductType {
  productType: ProductType;
}

export const createProductDetailFetcher = (
  productType: ProductType
) => async () =>
  await fetch(
    `/api/me/${productType.urlPart}`, // TODO create shared file for all api endpoints
    {
      credentials: "include",
      mode: "same-origin"
    }
  );

export const ProductTypes: { [productKey: string]: ProductType } = {
  membership: {
    friendlyName: "membership",
    urlPart: "membership",
    navLink: navLinks.membership,
    validator: (me: MeResponse) => me.contentAccess.member,
    sfProduct: "Membership",
    productPageTitle: "Membership",
    cancellationReasons: membershipCancellationReasons,
    cancellationStartPageBody: membershipCancellationFlowStart,
    tierRowLabel: "Membership tier"
  },
  contributions: {
    friendlyName: "recurring contribution",
    urlPart: "contributions",
    navLink: navLinks.contributions,
    validator: (me: MeResponse) => me.contentAccess.recurringContributor,
    sfProduct: "Contributions",
    productPageTitle: "Contributions",
    cancellationReasons: contributionsCancellationReasons,
    cancellationStartPageBody: contributionsCancellationFlowStart
  }
};
