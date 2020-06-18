import React from "react";
import { PageContainer, PageContainerProps } from "./page";
import {
  ProductDetailProvider,
  ProductDetailProviderProps
} from "./productDetailProvider";

type FlowWrapperProps = PageContainerProps & ProductDetailProviderProps;

export const FlowWrapper = (props: FlowWrapperProps) => (
  <ProductDetailProvider {...props}>
    {productDetail => (
      <PageContainer {...props}>{props.children(productDetail)}</PageContainer>
    )}
  </ProductDetailProvider>
);
