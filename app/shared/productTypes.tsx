import React from "react";
import { MeValidator } from "../client/components/cancel/cancellationFlowWrapper";
import { NoMembership } from "../client/components/noMembership";
import { MeResponse } from "./meResponse";

export type ProductFriendlyName = "membership" | "recurring contribution";
export type ProductUrlPart = "membership" | "contributions";

export interface ProductType {
  friendlyName: ProductFriendlyName;
  urlPart: ProductUrlPart;
  validator: MeValidator;
  invalidComponentRenderer: JSX.Element;
  fetchProductDetail: () => Promise<Response>;
  tierRowLabel?: string; // no label means row is not displayed
}

const createProductFetcher = (productApiKeyword: string) => async () =>
  await fetch(
    `/api/me/${productApiKeyword}`, // TODO create shared file for all api endpoints
    {
      credentials: "include",
      mode: "same-origin"
    }
  );

export const ProductTypes: { [productKey: string]: ProductType } = {
  membership: {
    friendlyName: "membership",
    urlPart: "membership",
    validator: (me: MeResponse) => me.contentAccess.member,
    fetchProductDetail: createProductFetcher("membership"), // TODO re-use urlPart somehow
    invalidComponentRenderer: <NoMembership />,
    tierRowLabel: "Membership tier"
  },
  contributions: {
    friendlyName: "recurring contribution",
    urlPart: "contributions",
    validator: (me: MeResponse) => me.contentAccess.recurringContributor,
    fetchProductDetail: createProductFetcher("contributions"),
    invalidComponentRenderer: <h2>You do not have a Recurring Contribution.</h2>
  }
};
