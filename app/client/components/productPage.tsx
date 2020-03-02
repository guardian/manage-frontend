import { css } from "@emotion/core";
import { palette, space } from "@guardian/src-foundations";
import { Link } from "@reach/router";
import { startCase } from "lodash";
import { toWords } from "number-to-words";
import Raven from "raven-js";
import React from "react";
import {
  alertTextWithoutCTA,
  augmentInterval,
  formatDate,
  getFuturePlanIfVisible,
  getMainPlan,
  isGift,
  isPaidSubscriptionPlan,
  isProduct,
  MembersDataApiItem,
  MembersDatApiAsyncLoader,
  ProductDetail,
  sortByJoinDate
} from "../../shared/productResponse";
import {
  createProductDetailFetcher,
  hasDeliveryRecordsFlow,
  ProductTypeWithProductPageProperties
} from "../../shared/productTypes";
import {
  ProductPageProperties,
  ProductType,
  shouldHaveHolidayStopsFlow
} from "../../shared/productTypes";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { Button, LinkButton } from "./buttons";
import { getCancellationSummary } from "./cancel/cancellationSummary";
import { DeliveryAddressDisplay } from "./delivery/address/deliveryAddressDisplay";
import { InlineContactUs } from "./inlineContactUs";
import { NoProduct } from "./noProduct";
import {
  PageContainer,
  PageHeaderContainer,
  PageNavAndContentContainer
} from "./page";
import { CardDisplay } from "./payment/cardDisplay";
import { DirectDebitDisplay } from "./payment/directDebitDisplay";
import { PayPalDisplay } from "./payment/paypalDisplay";
import { GiftIcon } from "./svgs/giftIcon";
import { UpdatableAmount } from "./updatableAmount";
import { RouteableProductProps } from "./wizardRouterAdapter";

interface ProductRowProps {
  label: string;
  data: string | React.ReactNode;
  alignItemsAtTop?: true;
}

export const wrappingContainerCSS = css({
  [minWidth.mobileLandscape]: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  }
});

const giftFlag = (
  <i
    css={css`
      line-height: 100%;
      margin-left: ${space[3]}px;
    `}
  >
    <GiftIcon alignArrowToThisSide={"right"} />
  </i>
);

const ProductDetailRow = (props: ProductRowProps) => {
  const alignAtTopObj = props.alignItemsAtTop
    ? { alignItems: "flex-start" }
    : {};
  return (
    <div
      css={{
        textAlign: "left",
        marginBottom: "25px",
        alignItems: "center",
        ...alignAtTopObj,
        [minWidth.phablet]: {
          display: "flex"
        }
      }}
    >
      <div
        css={{
          flexBasis: "320px",
          [minWidth.phablet]: {
            flexShrink: 0
          }
        }}
      >
        <p
          css={{
            fontSize: "18px",
            margin: "5px 0",
            fontWeight: "bold"
          }}
        >
          {props.label}
        </p>
      </div>
      <div>{props.data}</div>
    </div>
  );
};

const getPaymentMethodRow = (
  productDetail: ProductDetail,
  updatePaymentPath: string
) => {
  const addUpdateButton = (displayElement: JSX.Element) => (
    <div css={css(wrappingContainerCSS)}>
      <div css={{ marginRight: "15px", minWidth: "190px" }}>
        {displayElement}
      </div>
      <div
        css={{
          [maxWidth.desktop]: {
            margin: "10px 0"
          }
        }}
      >
        <LinkButton
          text="Update payment details"
          to={updatePaymentPath}
          state={productDetail}
          right
        />
      </div>
    </div>
  );
  if (productDetail.subscription.card) {
    return (
      <ProductDetailRow
        label="Card details"
        data={addUpdateButton(
          <CardDisplay margin="0" {...productDetail.subscription.card} />
        )}
      />
    );
  } else if (productDetail.subscription.payPalEmail) {
    return (
      <ProductDetailRow
        label="Payment method"
        data={
          <PayPalDisplay payPalEmail={productDetail.subscription.payPalEmail} />
        }
      />
    );
  } else if (productDetail.subscription.mandate) {
    return (
      <ProductDetailRow
        label="Payment method"
        data={addUpdateButton(
          <DirectDebitDisplay {...productDetail.subscription.mandate} />
        )}
      />
    );
  } else if (productDetail.subscription.stripePublicKeyForCardAddition) {
    return (
      <ProductDetailRow
        label="Payment method"
        data={addUpdateButton(<span>No Payment Method</span>)}
      />
    );
  } else {
    Raven.captureException("Unknown payment method");
  }
  return undefined;
};

const getPaymentPart = (
  productDetail: ProductDetail,
  productType: ProductType
) => {
  const mainPlan = getMainPlan(productDetail.subscription);
  const futurePlan = getFuturePlanIfVisible(productDetail.subscription);
  if (isPaidSubscriptionPlan(mainPlan)) {
    const mainPlanInterval = augmentInterval(mainPlan.interval);
    return (
      <>
        {productDetail.subscription.nextPaymentDate &&
          productDetail.subscription.autoRenew &&
          !productDetail.alertText && (
            <ProductDetailRow
              label={"Next payment date"}
              data={formatDate(productDetail.subscription.nextPaymentDate)}
            />
          )}
        {productDetail.subscription.autoRenew && (
          <ProductDetailRow
            label={`Next ${mainPlanInterval} payment`}
            data={
              <>
                <UpdatableAmount
                  mainPlan={mainPlan}
                  nextPaymentPrice={productDetail.subscription.nextPaymentPrice}
                  subscriptionId={productDetail.subscription.subscriptionId}
                  productType={productType}
                />
                {futurePlan && futurePlan.amount !== mainPlan.amount && (
                  <div css={{ fontStyle: "italic" }}>
                    {futurePlan.currency}{" "}
                    {(futurePlan.amount / 100.0).toFixed(2)}{" "}
                    {futurePlan.currencyISO}{" "}
                    {futurePlan.interval !== mainPlan.interval && (
                      <strong>
                        {augmentInterval(futurePlan.interval) + " "}
                      </strong>
                    )}
                    starting {formatDate(futurePlan.start)}
                  </div>
                )}
              </>
            }
          />
        )}
        {getPaymentMethodRow(productDetail, "/payment/" + productType.urlPart)}
      </>
    );
  } else {
    return <ProductDetailRow label={"Annual payment"} data={"FREE"} />;
  }
};

const getProductDetailRenderer = (
  originalProductType: ProductType,
  productPageProperties: ProductPageProperties,
  productDetailList: ProductDetail[]
) => (productDetail: ProductDetail, listIndex: number) => {
  const productType = originalProductType.mapGroupedToSpecific
    ? originalProductType.mapGroupedToSpecific(productDetail)
    : originalProductType;
  const alternateManagementCtaLabel =
    productType.alternateManagementCtaLabel &&
    productType.alternateManagementCtaLabel(productDetail);
  const subscription = productDetail.subscription;
  const mainPlan = getMainPlan(subscription);
  return (
    <div
      key={subscription.subscriptionId}
      css={{
        borderTop:
          productDetailList.length > 1
            ? `1px solid ${palette.neutral["86"]}`
            : undefined,
        padding: "5px 0 20px"
      }}
    >
      {subscription.cancelledAt ? (
        getCancellationSummary(productType)(productDetail)
      ) : (
        <>
          {productDetailList.length > 1 && (
            <PageContainer noVerticalMargin>
              {productType.productPage === productPageProperties ? (
                <h2>
                  {startCase(productType.friendlyName.toLowerCase())}{" "}
                  {listIndex + 1}
                </h2>
              ) : (
                <h2>
                  {productType.alternateTierValue || productDetail.tier}
                  {mainPlan.name && <i>&nbsp;({mainPlan.name})</i>}
                  {isGift(subscription) && giftFlag}
                </h2>
              )}
            </PageContainer>
          )}
          {productDetail.alertText && (
            <div
              css={{
                backgroundColor: palette.news.dark,
                color: palette.neutral["100"],
                padding: "10px 15px 15px",
                margin: `30px ${productDetailList.length > 1 ? "15px" : "0"}`
              }}
            >
              <PageContainer noVerticalMargin>
                <h2 css={{ fontWeight: "bold", margin: "0" }}>
                  Action required
                </h2>
                <p
                  id="mma-alert-text"
                  css={{
                    br: {
                      display: "none",
                      [minWidth.tablet]: {
                        display: "inline"
                      }
                    }
                  }}
                >
                  {alertTextWithoutCTA(productDetail)}
                  <br />
                  Please check that the payment details shown are up to date.
                </p>
                <LinkButton
                  text="Update payment details"
                  to={"/payment/" + productType.urlPart}
                  height="42px"
                  fontWeight="bold"
                  state={productDetail}
                  primary
                  right
                />
              </PageContainer>
            </div>
          )}
          <PageContainer>
            {productPageProperties.showSubscriptionId && (
              <ProductDetailRow
                label={"Subscription ID"}
                data={subscription.subscriptionId}
              />
            )}
            {productPageProperties.tierRowLabel &&
              (productDetailList.length === 1 ||
                productPageProperties.tierChangeable) && (
                <ProductDetailRow
                  label={productPageProperties.tierRowLabel}
                  data={
                    <>
                      {productPageProperties.tierChangeable ? (
                        <div css={wrappingContainerCSS}>
                          <div css={{ marginRight: "15px" }}>
                            {productType.alternateTierValue ||
                              productDetail.tier}
                          </div>
                          {/*TODO add a !=="Patron" condition around the Change tier button once we have a direct journey to cancellation*/}
                          <a
                            href={
                              "https://membership." +
                              window.guardian.domain +
                              "/tier/change"
                            }
                          >
                            <Button text="Change tier" right />
                          </a>
                        </div>
                      ) : (
                        productType.alternateTierValue || productDetail.tier
                      )}
                      {mainPlan.name && <i>&nbsp;({mainPlan.name})</i>}
                      {isGift(subscription) && giftFlag}
                    </>
                  }
                />
              )}
            {(productPageProperties.forceShowJoinDateOnly ||
              !subscription.start) && (
              <ProductDetailRow
                label={"Join date"}
                data={formatDate(productDetail.joinDate)}
              />
            )}
            {subscription.start &&
              !productPageProperties.forceShowJoinDateOnly && (
                <ProductDetailRow
                  label={"Start date"}
                  data={formatDate(subscription.start)}
                />
              )}
            {productType.showTrialRemainingIfApplicable &&
              subscription.trialLength > 0 && (
                <ProductDetailRow
                  label={"Trial remaining"}
                  data={`${subscription.trialLength} day${
                    subscription.trialLength !== 1 ? "s" : ""
                  }`}
                />
              )}
            {getPaymentPart(productDetail, productType)}
            {productType.cancellation &&
              productType.cancellation.linkOnProductPage && (
                <Link
                  css={{
                    textDecoration: "underline",
                    color: palette.neutral["7"],
                    ":visited": { color: palette.neutral["7"] }
                  }}
                  to={"/cancel/" + productType.urlPart}
                  state={productDetail}
                >
                  {"Cancel this " + productType.friendlyName}
                </Link>
              )}
            {shouldHaveHolidayStopsFlow(productType) && subscription.autoRenew && (
              <ProductDetailRow
                label="Holiday stop"
                data={
                  <div>
                    <div
                      css={{
                        display: "inline-block",
                        margin: "10px",
                        marginLeft: 0
                      }}
                    >
                      Going on holiday?
                    </div>
                    <LinkButton
                      text="Manage your suspensions"
                      to={"/suspend/" + productType.urlPart}
                      state={productDetail}
                      right
                    />
                  </div>
                }
              />
            )}
            {productType.delivery?.showAddress?.(subscription) && (
              <ProductDetailRow
                label="Delivery address"
                alignItemsAtTop
                data={
                  <DeliveryAddressDisplay
                    {...subscription.deliveryAddress}
                    withEditButton={true}
                    allProductDetails={productDetailList}
                    productUrlPart={productType.urlPart}
                  />
                }
              />
            )}
            {hasDeliveryRecordsFlow(productType) && (
              <ProductDetailRow
                label="Delivery history"
                data={
                  <LinkButton
                    text={
                      productType.delivery.records.canReportProblem
                        ? "Report problem"
                        : "View delivery history"
                    }
                    to={`/delivery/${productType.urlPart}/records`}
                    state={productDetail}
                    right
                  />
                }
              />
            )}
            {productType.alternateManagementUrl &&
              alternateManagementCtaLabel &&
              (productDetailList.length > 1 ? (
                <div css={{ fontWeight: "bold" }}>
                  To {alternateManagementCtaLabel}, please <InlineContactUs />
                </div>
              ) : (
                <a href={productType.alternateManagementUrl}>
                  <Button
                    text={
                      alternateManagementCtaLabel.substr(0, 1).toUpperCase() +
                      alternateManagementCtaLabel.substr(1)
                    }
                    right
                  />
                </a>
              ))}
          </PageContainer>
        </>
      )}
    </div>
  );
};

const getProductRenderer = (
  productType: ProductTypeWithProductPageProperties
) => (apiResponse: MembersDataApiItem[]) => {
  const productDetailList = apiResponse.filter(isProduct).sort(sortByJoinDate);
  return (
    <>
      {productDetailList.length > 1 && (
        <PageContainer>
          <h3>
            You have <strong>{toWords(productDetailList.length)}</strong>{" "}
            concurrent {productType.friendlyName}s:
          </h3>
        </PageContainer>
      )}
      {productDetailList.length > 0 ? (
        productDetailList.map(
          getProductDetailRenderer(
            productType,
            productType.productPage,
            productDetailList
          )
        )
      ) : (
        <NoProduct
          inTab={true}
          supportRefererSuffix={"product_page"}
          productType={productType}
        />
      )}
    </>
  );
};

export interface RouteableProductPropsWithProductPage
  extends RouteableProductProps {
  productType: ProductTypeWithProductPageProperties;
}

export const ProductPage = (props: RouteableProductPropsWithProductPage) => (
  <>
    <PageHeaderContainer
      selectedNavItem={props.productType.productPage.navLink}
    >
      <h1>{props.productType.productPage.title}</h1>
    </PageHeaderContainer>
    <PageNavAndContentContainer
      selectedNavItem={props.productType.productPage.navLink}
    >
      <MembersDatApiAsyncLoader
        fetch={createProductDetailFetcher(props.productType)}
        render={getProductRenderer(props.productType)}
        loadingMessage={`Loading your ${props.productType.friendlyName} details...`}
      />
    </PageNavAndContentContainer>
  </>
);
