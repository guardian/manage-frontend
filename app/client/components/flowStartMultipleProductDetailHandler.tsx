import React from "react";
import {
  annotateMdaResponseWithTestUserFromHeaders,
  formatDate,
  hasProduct,
  MembersDataApiResponse,
  MembersDatApiAsyncLoader,
  ProductDetail,
  Subscription
} from "../../shared/productResponse";
import { createProductDetailFetcher } from "../../shared/productTypes";
import palette from "../colours";
import { Button } from "./buttons";
import { CheckFlowIsValid } from "./checkFlowIsValid";
import { NoProduct } from "./noProduct";
import { PageContainer } from "./page";
import { CardDisplay } from "./payment/cardDisplay";
import { DirectDebitDisplay } from "./payment/directDebitDisplay";
import { RouteableStepProps } from "./wizardRouterAdapter";

const PaymentTypeRenderer = (subscription: Subscription) => {
  if (subscription.card) {
    return <CardDisplay margin="0" {...subscription.card} inline />;
  } else if (subscription.mandate) {
    return <DirectDebitDisplay {...subscription.mandate} inline />;
  } else if (subscription.payPalEmail) {
    return <span>via PayPal</span>;
  }
  return null;
};

const commonFlexCSS = {
  alignItems: "center",
  flexWrap: "wrap",
  "span, div": {
    marginRight: "10px"
  }
};

const getProductDetailSelector = (
  props: FlowStartMultipleProductDetailHandlerProps,
  selectProductDetail: (productDetail: ProductDetail) => void,
  supportRefererSuffix: string
) => (data: MembersDataApiResponse[]) => {
  const activeList = data
    .filter(hasProduct)
    .filter(_ => !_.subscription.cancelledAt);
  if (activeList.length > 0) {
    const first = activeList[0];
    if (activeList.length === 1 && hasProduct(first)) {
      return props.singleProductDetailRenderer(props, first);
    }
    if (activeList.length > 1) {
      return (
        <>
          <PageContainer>
            <p>
              It looks like you have {activeList.length}{" "}
              {props.productType.friendlyName}s, please select the one you would
              like to proceed with...
            </p>
          </PageContainer>
          {activeList.map((productDetail, listIndex) => (
            <div
              key={productDetail.subscription.subscriberId}
              css={{
                padding: "10px",
                background:
                  (listIndex + 1) % 2 !== 0 ? palette.neutral["7"] : undefined
              }}
            >
              <PageContainer noVerticalMargin>
                <div
                  css={{
                    display: "flex",
                    ...commonFlexCSS
                  }}
                >
                  {props.productType.productPage &&
                  props.productType.productPage.tierRowLabel ? (
                    <span>
                      <strong>Tier: </strong> {productDetail.tier}{" "}
                    </span>
                  ) : (
                    undefined
                  )}
                  <span>
                    <strong>Start Date:</strong>{" "}
                    {formatDate(
                      productDetail.subscription.start || productDetail.joinDate
                    )}{" "}
                  </span>
                  <div
                    css={{
                      display: "inline-flex",
                      ...commonFlexCSS
                    }}
                  >
                    <strong>Payment:</strong>
                    {productDetail.isPaidTier ? (
                      <>
                        <span>
                          {" "}
                          {productDetail.subscription.plan.currency}
                          {(
                            productDetail.subscription.nextPaymentPrice / 100.0
                          ).toFixed(2)}{" "}
                          {productDetail.subscription.plan.interval}ly
                        </span>
                        <PaymentTypeRenderer {...productDetail.subscription} />
                      </>
                    ) : (
                      " FREE"
                    )}
                  </div>
                  <span>
                    <strong>Next payment date:</strong>{" "}
                    {formatDate(productDetail.subscription.nextPaymentDate)}
                  </span>
                </div>
                <div css={{ marginTop: "10px" }}>
                  <Button
                    text={
                      props.headingPrefix +
                      " this " +
                      (props.productType.includeGuardianInTitles
                        ? "Guardian "
                        : "") +
                      props.productType.friendlyName
                    }
                    onClick={() => selectProductDetail(productDetail)}
                    right
                    primary
                  />
                </div>
              </PageContainer>
            </div>
          ))}
        </>
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
