import React, { useEffect, useState } from "react";
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

export interface ProductDetailProviderProps extends RouteableStepProps {
  children: (productDetail: ProductDetail) => JSX.Element;
  allowCancelledSubscription?: true;
  loadingMessagePrefix: string;
  forceRedirectToAccountOverviewIfNoBrowserHistoryState?: true;
}

export const ProductDetailProvider = (props: ProductDetailProviderProps) => {
  // NOTE: this react state is required so that any productDetail in the
  // 'browser history state' at the beginning of the flow is available
  // throughout the flow when re-renders occur based on route changes.
  // Without this, flows would have to pass the productDetail in the
  // browser history state in every page navigation, otherwise users
  // end up stuck on the first step they were on
  const [selectedProductDetail, setSelectedProductDetail] = useState<
    ProductDetail | null | undefined
  >();

  // Browser history state is inspected inside this hook to avoid race condition with server side rendering
  useEffect(() => {
    const productDetailFromBrowserHistoryState =
      isProduct(props.location?.state) && props.location?.state;
    setSelectedProductDetail(productDetailFromBrowserHistoryState || null);
  }, []); // Equivalent to componentDidMount (ie only happens on the client)

  if (selectedProductDetail) {
    return props.children(selectedProductDetail);
  }
  // ie definitely no browser history state
  else if (selectedProductDetail === null) {
    return props.forceRedirectToAccountOverviewIfNoBrowserHistoryState ? (
      visuallyNavigateToParent(props, true)
    ) : (
      <MembersDatApiAsyncLoader
        fetch={createProductDetailFetcher(props.productType)}
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
  }
  return null;
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
