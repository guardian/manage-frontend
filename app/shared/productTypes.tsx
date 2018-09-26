import React from "react";
import { NoMembership } from "../client/components/cancel/membership/noMembership";
import { MeValidator } from "../client/components/cancellationFlowWrapper";
import { MeResponse } from "./meResponse";

export type ProductName = "membership" | "recurring contribution";

export interface ProductType {
  productName: ProductName;
  validator: MeValidator;
  invalidComponentRenderer: JSX.Element;
}

export const ProductTypes: { [productKey: string]: ProductType } = {
  membership: {
    productName: "membership",
    validator: (me: MeResponse) => me.contentAccess.member,
    invalidComponentRenderer: <NoMembership />
  },
  contributions: {
    productName: "recurring contribution",
    validator: (me: MeResponse) => me.contentAccess.recurringContributor,
    invalidComponentRenderer: <h2>You do not have a Recurring Contribution.</h2>
  }
};
