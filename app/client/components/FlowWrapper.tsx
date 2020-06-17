import React, { ReactElement } from "react";
import { NavItem } from "./nav/navConfig";
import { Breadcrumbs, PageContainer } from "./page";
import {
  ProductDetailProvider,
  ProductDetailProviderProps
} from "./productDetailProvider";

interface FlowWrapperProps extends ProductDetailProviderProps {
  selectedNavItem: NavItem;
  pageTitle: string | ReactElement;
  breadcrumbs?: Breadcrumbs[] | undefined;
}

export const FlowWrapper = (props: FlowWrapperProps) => {
  const {
    selectedNavItem,
    pageTitle,
    breadcrumbs,
    ...productDetailProviderProps
  } = props;
  return (
    <ProductDetailProvider {...productDetailProviderProps}>
      {productDetail => {
        const pageContainerChildren = props.children(productDetail);
        return (
          <PageContainer
            selectedNavItem={props.selectedNavItem}
            pageTitle={props.pageTitle}
            breadcrumbs={props.breadcrumbs}
          >
            {pageContainerChildren}
          </PageContainer>
        );
      }}
    </ProductDetailProvider>
  );
};
