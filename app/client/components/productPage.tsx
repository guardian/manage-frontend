import { Link } from "@reach/router";
import { css } from "emotion";
import { startCase } from "lodash";
import { toWords } from "number-to-words";
import Raven from "raven-js";
import React from "react";
import {
  alertTextWithoutCTA,
  annotateMdaResponseWithTestUserFromHeaders,
  formatDate,
  hasProduct,
  MembersDataApiResponse,
  MembersDatApiAsyncLoader,
  ProductDetail,
  sortByJoinDate
} from "../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductTypeWithProductPageProperties
} from "../../shared/productTypes";
import palette from "../colours";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { headline } from "../styles/fonts";
import { Button, LinkButton } from "./buttons";
import { getCancellationSummary } from "./cancel/cancellationSummary";
import { MembershipLinks } from "./membershipLinks";
import { NoProduct } from "./noProduct";
import { PageContainer, PageHeaderContainer } from "./page";
import { CardDisplay } from "./payment/cardDisplay";
import { DirectDebitDisplay } from "./payment/directDebitDisplay";
import { PayPalDisplay } from "./payment/paypalDisplay";
import { UpdatableAmount } from "./updatableAmount";
import { RouteableProductProps } from "./wizardRouterAdapter";

interface ProductRowProps {
  label: string;
  data: string | React.ReactNode;
}

const productRowStyles = css({
  textAlign: "left",
  marginBottom: "25px",
  alignItems: "center",

  [minWidth.phablet]: {
    display: "flex"
  }
});

export const wrappingContainerCSS = {
  [minWidth.mobileLandscape]: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  }
};

const ProductDetailRow = (props: ProductRowProps) => {
  return (
    <div className={productRowStyles}>
      <div
        css={{
          flexBasis: "320px",
          [minWidth.phablet]: {
            flexShrink: "0"
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
    <div css={wrappingContainerCSS}>
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
  } else {
    Raven.captureException("Unknown payment method");
  }
  return undefined;
};

const getPaymentPart = (
  productDetail: ProductDetail,
  productType: ProductTypeWithProductPageProperties
) => {
  if (productDetail.isPaidTier) {
    return (
      <>
        {productDetail.subscription.nextPaymentDate && (
          <ProductDetailRow
            label={"Next payment date"}
            data={formatDate(productDetail.subscription.nextPaymentDate)}
          />
        )}
        <ProductDetailRow
          label={
            productDetail.subscription.plan.interval.charAt(0).toUpperCase() +
            productDetail.subscription.plan.interval.substr(1) +
            "ly payment"
          }
          data={
            <UpdatableAmount
              subscription={productDetail.subscription}
              productType={productType}
            />
          }
        />
        {getPaymentMethodRow(productDetail, "/payment/" + productType.urlPart)}
      </>
    );
  } else {
    return <ProductDetailRow label={"Annual payment"} data={"FREE"} />;
  }
};

const getProductRenderer = (
  productType: ProductTypeWithProductPageProperties
) => (apiResponse: MembersDataApiResponse[]) => {
  const productDetailList = apiResponse.filter(hasProduct).sort(sortByJoinDate);
  return (
    <>
      {productDetailList.length > 1 ? (
        <PageContainer>
          <h3>
            You have <strong>{toWords(productDetailList.length)}</strong>{" "}
            concurrent {productType.friendlyName}s:
          </h3>
        </PageContainer>
      ) : (
        undefined
      )}
      {productDetailList.length > 0 ? (
        productDetailList.map((productDetail, listIndex) => (
          <div
            key={productDetail.subscription.subscriberId}
            css={{
              background:
                productDetailList.length > 1 && (listIndex + 1) % 2 !== 0
                  ? palette.neutral["7"]
                  : undefined,
              padding: "5px 0 20px"
            }}
          >
            {productDetail.subscription.cancelledAt ? (
              getCancellationSummary(productType)(productDetail.subscription)
            ) : (
              <>
                {productDetailList.length > 1 ? (
                  <PageContainer noVerticalMargin>
                    <h2>
                      {startCase(productType.friendlyName.toLowerCase())}{" "}
                      {listIndex + 1}
                    </h2>
                  </PageContainer>
                ) : (
                  undefined
                )}
                {productDetail.alertText ? (
                  <div
                    css={{
                      backgroundColor: palette.red.dark,
                      color: palette.white,
                      padding: "10px 15px 15px",
                      margin: `30px ${
                        productDetailList.length > 1 ? "15px" : "0"
                      }`
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
                        Please check that the payment details shown are up to
                        date.
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
                ) : (
                  undefined
                )}
                <PageContainer>
                  {productType.productPage.showSubscriberId ? (
                    <ProductDetailRow
                      label={"Subscriber ID"}
                      data={productDetail.subscription.subscriberId}
                    />
                  ) : (
                    undefined
                  )}
                  {productType.productPage.tierRowLabel ? (
                    <>
                      {productDetail.regNumber ? (
                        <ProductDetailRow
                          label={"Registration number"}
                          data={productDetail.regNumber}
                        />
                      ) : (
                        undefined
                      )}
                      <ProductDetailRow
                        label={productType.productPage.tierRowLabel}
                        data={
                          productType.productPage.tierChangeable ? (
                            <div css={wrappingContainerCSS}>
                              <div css={{ marginRight: "15px" }}>
                                {productDetail.tier}
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
                            productDetail.tier
                          )
                        }
                      />
                    </>
                  ) : (
                    undefined
                  )}
                  <ProductDetailRow
                    label={"Start date"}
                    data={formatDate(
                      productDetail.subscription.start || productDetail.joinDate
                    )}
                  />
                  {productType.showTrialRemainingIfApplicable &&
                  productDetail.subscription.trialLength > 0 ? (
                    <ProductDetailRow
                      label={"Trial remaining"}
                      data={`${productDetail.subscription.trialLength} day${
                        productDetail.subscription.trialLength !== 1 ? "s" : ""
                      }`}
                    />
                  ) : (
                    undefined
                  )}
                  {getPaymentPart(productDetail, productType)}
                  {productType.cancellation &&
                  productType.cancellation.linkOnProductPage ? (
                    <Link
                      css={{
                        textDecoration: "underline",
                        color: palette.neutral["1"],
                        ":visited": { color: palette.neutral["1"] }
                      }}
                      to={"/cancel/" + productType.urlPart}
                      state={productDetail}
                    >
                      {"Cancel this " + productType.friendlyName}
                    </Link>
                  ) : (
                    undefined
                  )}
                </PageContainer>
              </>
            )}
          </div>
        ))
      ) : (
        <PageContainer>
          <NoProduct
            inTab={true}
            supportRefererSuffix={"product_page"}
            productType={productType}
          />
        </PageContainer>
      )}
    </>
  );
};

const headerCss = css({
  fontSize: "2rem",
  lineHeight: "2.25rem",
  fontFamily: headline,
  marginBottom: "30px",
  marginTop: "0"
});

export interface RouteableProductPropsWithProductPage
  extends RouteableProductProps {
  productType: ProductTypeWithProductPageProperties;
}

export const ProductPage = (props: RouteableProductPropsWithProductPage) => (
  <>
    <PageHeaderContainer
      selectedNavItem={props.productType.productPage.navLink}
    >
      <h1 className={headerCss}>{props.productType.productPage.title}</h1>
    </PageHeaderContainer>
    <MembersDatApiAsyncLoader
      fetch={createProductDetailFetcher(props.productType)}
      render={getProductRenderer(props.productType)}
      readerOnOK={annotateMdaResponseWithTestUserFromHeaders}
      loadingMessage={`Loading your ${
        props.productType.friendlyName
      } details...`}
    />
    <PageContainer>
      <MembershipLinks /> {/*TODO need to have contributions FAQ*/}
    </PageContainer>
  </>
);
