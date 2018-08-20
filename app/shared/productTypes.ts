import { MeValidator } from "../client/components/cancellationFlowWrapper";
import { MeResponse } from "./meResponse";

export type ProductName = "membership" | "recurring contribution";

export interface ProductType {
  productName: ProductName;
  validator: MeValidator;
}

export const ProductTypes: { [productKey: string]: ProductType } = {
  membership: {
    productName: "membership",
    validator: (me: MeResponse) => me.contentAccess.member
  },
  contributions: {
    productName: "recurring contribution",
    validator: (me: MeResponse) => me.contentAccess.recurringContributor
  }
};
