import React, { useState } from "react";
import {
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  ProductDetail
} from "../../shared/productResponse";
import { createProductDetailFetcher } from "../../shared/productTypes";
import {
  RouteableStepProps,
  visuallyNavigateToParent
} from "./wizardRouterAdapter";

interface ProductDetailProviderProps extends RouteableStepProps {
  children: (productDetail: ProductDetail) => JSX.Element;
  allowCancelledSubscription?: true;
  loadingMessagePrefix: string;
}

export const ProductDetailProvider = (props: ProductDetailProviderProps) => {
  const productDetailFromBrowserHistoryState =
    isProduct(props.location?.state) && props.location?.state;

  // NOTE: this react state is required so that any productDetail in the
  // 'browser history state' at the beginning of the flow is available
  // throughout the flow when re-renders occur based on route changes.
  // Without this, flows would have to pass the productDetail in the
  // browser history state in every page navigation, otherwise users
  // end up stuck on the first step they were on
  const [selectedProductDetail, setSelectedProductDetail] = useState(
    productDetailFromBrowserHistoryState
  );

  if (selectedProductDetail) {
    return props.children(selectedProductDetail);
  }
  return (
    <MembersDatApiAsyncLoader
      fetch={
        createProductDetailFetcher(
          props.productType
        ) /*TODO reload on 'back' to page*/
      }
      render={renderSingleProductOrReturnToAccountOverview(
        props,
        setSelectedProductDetail
      )}
      loadingMessage={
        props.loadingMessagePrefix +
        " " +
        props.productType.friendlyName +
        "..."
      }
    />
  );
};

const renderSingleProductOrReturnToAccountOverview = (
  props: ProductDetailProviderProps,
  setSelectedProductDetail: (productDetail: ProductDetail) => void
) => (data: MembersDataApiItem[]) => {
  const filteredProductDetails = data
    .filter(isProduct)
    .filter(
      productDetail =>
        props.allowCancelledSubscription ||
        !productDetail.subscription.cancelledAt
    );

  if (filteredProductDetails.length === 1) {
    setSelectedProductDetail(filteredProductDetails[0]);
    return null;
  }
  return visuallyNavigateToParent(props, true);
};
