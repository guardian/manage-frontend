import { css } from "@emotion/core";
import { toWords } from "number-to-words";
import React from "react";
import {
  alertTextWithoutCTA,
  annotateMdaResponseWithTestUserFromHeaders,
  augmentInterval,
  formatDate,
  getMainPlan,
  hasProduct,
  isPaidSubscriptionPlan,
  MembersDataApiResponse,
  MembersDatApiAsyncLoader,
  ProductDetail,
  sortByJoinDate,
  Subscription
} from "../../shared/productResponse";
import {
  createProductDetailFetcher,
  hasProductPageProperties
} from "../../shared/productTypes";
import palette from "../colours";
import { Button } from "./buttons";
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

const flexCSS = (display: "inline-flex" | "flex") =>
  css({
    display,
    alignItems: "center",
    flexWrap: "wrap",
    "span, div": {
      marginRight: "10px"
    }
  });

const getPaymentPart = (productDetail: ProductDetail) => {
  const mainPlan = getMainPlan(productDetail.subscription);
  if (isPaidSubscriptionPlan(mainPlan)) {
    return (
      <>
        <span>
          &nbsp;
          {mainPlan.currency}
          {(
            (productDetail.subscription.nextPaymentPrice || mainPlan.amount) /
            100.0
          ).toFixed(2)}{" "}
          {augmentInterval(mainPlan.interval)}
        </span>
        <PaymentTypeRenderer {...productDetail.subscription} />
      </>
    );
  }
  return " FREE";
};

const getProductDetailSelector = (
  props: FlowStartMultipleProductDetailHandlerProps,
  selectProductDetail: (productDetail: ProductDetail) => void,
  supportRefererSuffix: string
) => (data: MembersDataApiResponse[]) => {
  const activeList = data
    .filter(hasProduct)
    .filter(_ => !_.subscription.cancelledAt)
    .sort(sortByJoinDate);
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
              You have <strong>{toWords(activeList.length)}</strong> concurrent{" "}
              {props.productType.friendlyName}s, please select the one you would
              like to proceed with:
            </p>
          </PageContainer>
          {activeList.map((productDetail, listIndex) => (
            <div
              key={productDetail.subscription.subscriptionId}
              css={{
                padding: "10px",
                background:
                  (listIndex + 1) % 2 !== 0 ? palette.neutral["7"] : undefined
              }}
            >
              <PageContainer noVerticalMargin>
                {getMainPlan(productDetail.subscription).name && (
                  <i>({getMainPlan(productDetail.subscription).name})</i>
                )}
                <div css={flexCSS("flex")}>
                  {hasProductPageProperties(props.productType) &&
                    props.productType.productPage.tierRowLabel && (
                      <span>
                        <strong>Tier: </strong> {productDetail.tier}{" "}
                      </span>
                    )}
                  {((hasProductPageProperties(props.productType) &&
                    props.productType.productPage.forceShowJoinDateOnly) ||
                    !productDetail.subscription.start) && (
                    <span>
                      <strong>Join Date:</strong>{" "}
                      {formatDate(productDetail.joinDate)}{" "}
                    </span>
                  )}
                  {productDetail.subscription.start &&
                    !(
                      hasProductPageProperties(props.productType) &&
                      props.productType.productPage.forceShowJoinDateOnly
                    ) && (
                      <span>
                        <strong>Start Date:</strong>{" "}
                        {formatDate(productDetail.subscription.start)}{" "}
                      </span>
                    )}
                  <div css={flexCSS("inline-flex")}>
                    <strong>Payment:</strong>
                    {getPaymentPart(productDetail)}
                  </div>
                  {productDetail.subscription.nextPaymentDate &&
                    !productDetail.alertText && (
                      <span>
                        <strong>Next payment date:</strong>{" "}
                        {formatDate(productDetail.subscription.nextPaymentDate)}
                      </span>
                    )}
                </div>
                {productDetail.alertText && (
                  <div css={{ color: palette.red.dark }}>
                    <strong>{alertTextWithoutCTA(productDetail)}</strong>
                  </div>
                )}
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
                    maxWidthIfWrapping="290px"
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
    <NoProduct
      inTab={false}
      supportRefererSuffix={supportRefererSuffix}
      productType={props.productType}
    />
  );
};

export interface FlowStartMultipleProductDetailHandlerProps
  extends RouteableStepProps {
  headingPrefix: string;
  hideHeading?: true;
  supportRefererSuffix: string;
  loadingMessagePrefix: string;
  singleProductDetailRenderer: (
    routeableStepProps: RouteableStepProps,
    productDetail: ProductDetail
  ) => React.ReactNode;
}

export interface FlowStartMultipleProductDetailHandlerState {
  selectedProductDetail?: ProductDetail | null;
}

export class FlowStartMultipleProductDetailHandler extends React.Component<
  FlowStartMultipleProductDetailHandlerProps,
  FlowStartMultipleProductDetailHandlerState
> {
  public state: FlowStartMultipleProductDetailHandlerState = {};

  private readonly preWiredProductDetailSelector = getProductDetailSelector(
    this.props,
    (productDetail: ProductDetail) =>
      this.setState({ selectedProductDetail: productDetail }),
    this.props.supportRefererSuffix
  );

  // client side render only
  public componentDidMount(): void {
    this.setState({
      selectedProductDetail:
        this.props.location && hasProduct(this.props.location.state)
          ? this.props.location.state
          : null
    });
  }

  public render(): React.ReactNode {
    return (
      <div>
        {!this.props.hideHeading && (
          <PageContainer>
            <h1 css={{ fontSize: "24px" }}>
              {this.props.headingPrefix + " your "}
              {this.props.productType.includeGuardianInTitles
                ? "Guardian "
                : ""}
              {this.props.productType.friendlyName}
            </h1>
          </PageContainer>
        )}
        {this.renderInner()}
      </div>
    );
  }

  private renderInner = () => {
    if (this.state.selectedProductDetail) {
      return this.preWiredProductDetailSelector([
        this.state.selectedProductDetail
      ]);
    } else if (this.state.selectedProductDetail === null) {
      return (
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
      );
    }
  };
}
