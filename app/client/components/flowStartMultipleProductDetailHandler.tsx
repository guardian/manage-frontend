import { css } from "@emotion/core";
import { toWords } from "number-to-words";
import React, { ReactElement } from "react";
import {
  alertTextWithoutCTA,
  augmentInterval,
  formatDate,
  getMainPlan,
  isPaidSubscriptionPlan,
  isProduct,
  MembersDataApiItem,
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
import { minWidth } from "../styles/breakpoints";
import { sans } from "../styles/fonts";
import { Button } from "./buttons";
import { CallCentreNumbers } from "./callCentreNumbers";
import { NavItem } from "./nav";
import { NoProduct } from "./noProduct";
import {
  PageContainer,
  PageHeaderContainer,
  PageNavAndContentContainer
} from "./page";
import { CardDisplay } from "./payment/cardDisplay";
import { DirectDebitDisplay } from "./payment/directDebitDisplay";
import {
  ReturnToYourProductButton,
  RouteableStepProps
} from "./wizardRouterAdapter";

interface WithLeftNavProps {
  condition: boolean | undefined;
  wrapper: (children: ReactElement | null) => ReactElement;
  children: ReactElement | null;
}
const WithLeftNav = ({ condition, wrapper, children }: WithLeftNavProps) =>
  condition ? wrapper(children) : children;

const flexCSS = (display: "inline-flex" | "flex") =>
  css({
    display,
    alignItems: "center",
    flexWrap: "wrap",
    "span, div": {
      marginRight: "10px"
    }
  });

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
) => (data: MembersDataApiItem[]) => {
  const sortedList = data.filter(isProduct).sort(sortByJoinDate);
  if (sortedList.length > 0) {
    const first = sortedList[0];
    if (sortedList.length === 1 && isProduct(first)) {
      return first.subscription.cancelledAt &&
        !props.allowCancelledSubscription ? (
        <PageContainer>
          <h4>{props.cancelledExplainer}</h4>
          <CallCentreNumbers />
          <div css={{ marginTop: "30px" }}>
            <ReturnToYourProductButton productType={props.productType} />
          </div>
        </PageContainer>
      ) : (
        props.singleProductDetailRenderer(props, first)
      );
    }
    if (sortedList.length > 1) {
      return (
        <WithLeftNav
          condition={props.hasLeftNav !== undefined}
          wrapper={(children: ReactElement | null) => (
            <>
              {props.hasLeftNav && (
                <PageHeaderContainer
                  selectedNavItem={props.hasLeftNav?.selectedNavItem}
                  title={props.hasLeftNav?.pageTitle}
                />
              )}
              <PageNavAndContentContainer
                selectedNavItem={props.hasLeftNav?.selectedNavItem}
              >
                {children}
              </PageNavAndContentContainer>
            </>
          )}
        >
          <>
            <PageContainer>
              <p>
                You have <strong>{toWords(sortedList.length)}</strong>{" "}
                concurrent {props.productType.friendlyName}s, please select the
                one you would like to proceed with:
              </p>
            </PageContainer>
            {sortedList.map((productDetail, listIndex) => (
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
                    {productDetail.subscription.cancelledAt && (
                      <span
                        css={{
                          fontFamily: sans,
                          background: palette.neutral["5"],
                          marginRight: "10px",
                          borderRadius: "5px",
                          padding: "2px 5px 0 6px",
                          fontWeight: "bold"
                        }}
                      >
                        CANCELLED
                      </span>
                    )}
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
                          {formatDate(
                            productDetail.subscription.nextPaymentDate
                          )}
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
                      right
                      primary
                    />
                  </div>
                </PageContainer>
              </div>
            ))}
          </>
        </WithLeftNav>
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

interface WithLeftNavLayoutOptions {
  pageTitle: string;
  selectedNavItem: NavItem;
}
export interface FlowStartMultipleProductDetailHandlerProps
  extends RouteableStepProps {
  headingPrefix: string;
  hideHeading?: true;
  hasLeftNav?: WithLeftNavLayoutOptions;
  supportRefererSuffix: string;
  loadingMessagePrefix: string;
  cancelledExplainer: string;
  singleProductDetailRenderer: (
    routeableStepProps: RouteableStepProps,
    productDetail: ProductDetail
  ) => React.ReactNode;
  allowCancelledSubscription?: true;
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
        this.props.location && isProduct(this.props.location.state)
          ? this.props.location.state
          : null
    });
  }

  public render(): React.ReactNode {
    return (
      <div
        css={
          !this.props.hasLeftNav && {
            padding: "0 0.625rem",

            [minWidth.tablet]: {
              padding: "0 1.25rem"
            }
          }
        }
      >
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
