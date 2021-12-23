import { PageContainer, PageContainerProps } from "./page";
import {
  ProductDetailProvider,
  ProductDetailProviderProps,
} from "./productDetailProvider";

type FlowWrapperProps = PageContainerProps & ProductDetailProviderProps;

export const FlowWrapper = (props: FlowWrapperProps) => (
  <PageContainer {...props}>
    <ProductDetailProvider {...props}>
      {(productDetail) => props.children(productDetail)}
    </ProductDetailProvider>
  </PageContainer>
);
