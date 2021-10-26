import React, {useEffect, useState} from "react";
import {
  isProduct, MembersDataApiItem,
  ProductDetail
} from "../../shared/productResponse";
import {createProductDetailEndpoint} from "../productUtils";
import {
  RouteableStepProps,
  visuallyNavigateToParent
} from "./wizardRouterAdapter";
import DataFetcher from "./DataFetcher";
import useSWR from "swr";
import {fetcher} from "../fetchClient";

export interface ProductDetailProviderProps extends RouteableStepProps {
  children: (productDetail: ProductDetail) => JSX.Element;
  allowCancelledSubscription?: true;
  loadingMessagePrefix: string;
  forceRedirectToAccountOverviewIfNoBrowserHistoryState?: true;
}

export const ProductDetailProvider = (props: ProductDetailProviderProps): JSX.Element | null => {
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
    const productDetailNestedFromBrowserHistoryState =
      isProduct(props.location?.state?.productDetail) &&
      props.location?.state?.productDetail;

    const productDetailDirectFromBrowserHistoryState =
      isProduct(props.location?.state) && props.location?.state;

    setSelectedProductDetail(
      productDetailNestedFromBrowserHistoryState ||
      productDetailDirectFromBrowserHistoryState ||
      null
    );
  }, []); // Equivalent to componentDidMount (ie only happens on the client)

  if (selectedProductDetail) {
    return props.children(selectedProductDetail);
  }

  else if (selectedProductDetail === null) {
    return props.forceRedirectToAccountOverviewIfNoBrowserHistoryState ? (
      visuallyNavigateToParent(props, true)
    ) : (
      <DataFetcher
        loadingMessage={
          props.loadingMessagePrefix +
          " " +
          props.productType.friendlyName +
          "..."
        }>
        <RenderSingleProductOrReturnToAccountOverview productDetailProviderProps={props} setSelectedProductDetail={setSelectedProductDetail} />
      </DataFetcher>
    );
  }

  return null;
};

type SetSelectedProductDetail = (productDetail: ProductDetail) => void;

interface RenderSingleProductProps {
  productDetailProviderProps: ProductDetailProviderProps;
  setSelectedProductDetail: SetSelectedProductDetail;
}

export const RenderSingleProductOrReturnToAccountOverview = ({ productDetailProviderProps, setSelectedProductDetail }: RenderSingleProductProps): JSX.Element | null => {
  const { endpoint } = createProductDetailEndpoint(productDetailProviderProps.productType);

  const res = useSWR(endpoint, fetcher, { suspense: true });
  const data = res.data as MembersDataApiItem[];
  console.log(data);

    const filteredProductDetails = data
        .filter(isProduct)
        .filter(
            productDetail =>
              productDetailProviderProps.allowCancelledSubscription ||
                !productDetail.subscription.cancelledAt
        );

    if (filteredProductDetails.length === 1) {
      setSelectedProductDetail(filteredProductDetails[0]);
      return null;
    }

    return visuallyNavigateToParent(productDetailProviderProps, true);
}

