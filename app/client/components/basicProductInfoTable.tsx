import React from "react";
import { formatDateStr } from "../../shared/dates";
import { ProductDetail } from "../../shared/productResponse";
import { GroupedProductType } from "../../shared/productTypes";
import { ProductDescriptionListTable } from "./productDescriptionListTable";

interface BasicProductInfoTableProps {
  groupedProductType: GroupedProductType;
  productDetail: ProductDetail;
}
export const BasicProductInfoTable = (props: BasicProductInfoTableProps) => {
  return (
    <ProductDescriptionListTable
      content={[
        ...(props.groupedProductType.shouldRevealSubscriptionId
          ? [
              {
                title: "Subscription ID",
                value: props.productDetail.subscription.subscriptionId
              }
            ]
          : []),
        ...(props.groupedProductType.tierLabel
          ? [
              {
                title: props.groupedProductType.tierLabel,
                value: props.productDetail.tier
              }
            ]
          : []),
        ...(props.groupedProductType.shouldShowJoinDateNotStartDate
          ? [
              {
                title: "Join date",
                value: formatDateStr(props.productDetail.joinDate)
              }
            ]
          : [
              {
                title: "Start date",
                value: props.productDetail.subscription.start
                  ? formatDateStr(props.productDetail.subscription.start)
                  : "-"
              }
            ])
      ]}
    />
  );
};
