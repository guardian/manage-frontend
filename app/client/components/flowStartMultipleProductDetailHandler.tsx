import React from "react";
import {
  annotateMdaResponseWithTestUserFromHeaders,
  hasProduct,
  MembersDataApiResponse,
  MembersDatApiAsyncLoader,
  ProductDetail
} from "../../shared/productResponse";
import { createProductDetailFetcher } from "../../shared/productTypes";
import { Button } from "./buttons";
import { CheckFlowIsValid } from "./checkFlowIsValid";
import { NoProduct } from "./noProduct";
import { PageContainer } from "./page";
import { RouteableStepProps } from "./wizardRouterAdapter";

const getProductDetailSelector = (
  props: FlowStartMultipleProductDetailHandlerProps,
  selectProductDetail: (productDetail: ProductDetail) => void,
  supportRefererSuffix: string
) => (data: MembersDataApiResponse[]) => {
  if (data && data.length > 0) {
    const first = data[0];
    if (data.length === 1 && hasProduct(first)) {
      return props.singleProductDetailRenderer(props, first);
    }
    if (data.length > 1) {
      return (
        <PageContainer>
          <p>
            It looks like you have {data.length}{" "}
            {props.productType.friendlyName}s, please select the one you would
            like to proceed with...
          </p>
          {data.filter(hasProduct).map(productDetail => (
            <div
              key={productDetail.subscription.subscriberId}
              css={{ margin: "5px" }}
            >
              <Button
                text={productDetail.subscription.subscriberId}
                onClick={() => selectProductDetail(productDetail)}
                right
                primary
              />
            </div>
          ))}
        </PageContainer>
      );
    }
  }
  return (
    <PageContainer>
      <NoProduct
        inTab={false}
        supportRefererSuffix={supportRefererSuffix}
        productType={props.productType}
      />
    </PageContainer>
  );
};

export interface FlowStartMultipleProductDetailHandlerProps
  extends RouteableStepProps {
  headingPrefix: string;
  supportRefererSuffix: string;
  loadingMessagePrefix: string;
  singleProductDetailRenderer: (
    routeableStepProps: RouteableStepProps,
    productDetail: ProductDetail
  ) => React.ReactNode;
}

export interface FlowStartMultipleProductDetailHandlerState {
  selectedProductDetail?: any;
}

export class FlowStartMultipleProductDetailHandler extends React.Component<
  FlowStartMultipleProductDetailHandlerProps,
  FlowStartMultipleProductDetailHandlerState
> {
  public state = {
    selectedProductDetail: this.props.location
      ? this.props.location.state
      : undefined
  };

  private readonly preWiredProductDetailSelector = getProductDetailSelector(
    this.props,
    (productDetail: ProductDetail) =>
      this.setState({ selectedProductDetail: productDetail }),
    this.props.supportRefererSuffix
  );

  public render(): React.ReactNode {
    return (
      <div>
        <PageContainer>
          <h1 css={{ fontSize: "24px" }}>
            {this.props.headingPrefix + " your "}
            {this.props.productType.includeGuardianInTitles ? "Guardian " : ""}
            {this.props.productType.friendlyName}
          </h1>
        </PageContainer>

        {hasProduct(this.state.selectedProductDetail) ? (
          this.preWiredProductDetailSelector([this.state.selectedProductDetail])
        ) : (
          <CheckFlowIsValid
            {...this.props.productType}
            supportRefererSuffix={this.props.supportRefererSuffix}
          >
            <MembersDatApiAsyncLoader
              fetch={
                createProductDetailFetcher(
                  this.props.productType
                ) /*TODO reload on 'back' to page*/
              }
              readerOnOK={annotateMdaResponseWithTestUserFromHeaders}
              render={this.preWiredProductDetailSelector}
              loadingMessage={
                this.props.loadingMessagePrefix +
                " " +
                this.props.productType.friendlyName +
                "..."
              }
            />
          </CheckFlowIsValid>
        )}
      </div>
    );
  }
}
