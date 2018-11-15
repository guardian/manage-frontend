import { Link } from "@reach/router";
import { css } from "emotion";
import Raven from "raven-js";
import React from "react";
import {
  formatDate,
  hasProduct,
  MembersDataApiResponse,
  MembersDatApiAsyncLoader,
  ProductDetail,
  Subscription
} from "../../shared/productResponse";
import {
  createProductDetailFetcher,
  ProductTypeWithCancellationFlow,
  ProductTypeWithProductPage
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
  subscription: Subscription,
  updatePaymentPath: string
) => {
  if (subscription.card) {
    return (
      <ProductDetailRow
        label="Card details"
        data={
          <div css={wrappingContainerCSS}>
            <div css={{ marginRight: "15px", minWidth: "190px" }}>
              <CardDisplay margin="0" {...subscription.card} />
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
                right
              />
            </div>
          </div>
        }
      />
    );
  } else if (subscription.payPalEmail) {
    return (
      <ProductDetailRow
        label="Payment method"
        data={<PayPalDisplay payPalEmail={subscription.payPalEmail} />}
      />
    );
  } else if (subscription.account) {
    return (
      <ProductDetailRow
        label="Payment method"
        data={<DirectDebitDisplay {...subscription.account} />}
      />
    );
  } else {
    Raven.captureException("Unknown payment method");
  }
  return undefined;
};

const getPaymentPart = (
  data: ProductDetail,
  productType: ProductTypeWithProductPage
) => {
  if (data.isPaidTier) {
    return (
      <>
        <ProductDetailRow
          label={"Next payment date"}
          data={formatDate(data.subscription.nextPaymentDate)}
        />
        <ProductDetailRow
          label={
            data.subscription.plan.interval.charAt(0).toUpperCase() +
            data.subscription.plan.interval.substr(1) +
            "ly payment"
          }
          data={
            <UpdatableAmount
              subscription={data.subscription}
              productType={productType}
            />
          }
        />
        {getPaymentMethodRow(
          data.subscription,
          "/payment/" + productType.urlPart
        )}
      </>
    );
  } else {
    return <ProductDetailRow label={"Annual payment"} data={"FREE"} />;
  }
};

const getProductRenderer = (productType: ProductTypeWithProductPage) => (
  apiResponse: MembersDataApiResponse
) => {
  if (hasProduct(apiResponse)) {
    const data: ProductDetail = apiResponse;
    if (data.subscription.cancelledAt) {
      return getCancellationSummary(productType)(data.subscription);
    }
    return (
      <div>
        {data.alertText ? (
          <div
            css={{
              backgroundColor: palette.red.dark,
              color: palette.white,
              padding: "10px 15px 15px",
              marginTop: "30px",
              marginBottom: "30px"
            }}
          >
            <PageContainer noVerticalMargin>
              <h2 css={{ fontWeight: "bold", margin: "0" }}>Action required</h2>
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
                {data.alertText.replace(
                  "Please check that the card details shown are up to date.",
                  ""
                )}
                <br />
                Please check that the card details shown are up to date.
              </p>
              <LinkButton
                text="Update payment details"
                to={"/payment/" + productType.urlPart}
                height="42px"
                fontWeight="bold"
                primary
                right
              />
            </PageContainer>
          </div>
        ) : (
          undefined
        )}
        <PageContainer>
          {productType.productPage.tierRowLabel ? (
            <>
              {data.regNumber ? (
                <ProductDetailRow
                  label={"Registration number"}
                  data={data.regNumber}
                />
              ) : (
                undefined
              )}
              <ProductDetailRow
                label={productType.productPage.tierRowLabel}
                data={
                  <div css={wrappingContainerCSS}>
                    <div css={{ marginRight: "15px" }}>{data.tier}</div>
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
                }
              />
            </>
          ) : (
            undefined
          )}
          <ProductDetailRow
            label={"Start date"}
            data={formatDate(data.subscription.start || data.joinDate)}
          />
          {getPaymentPart(data, productType)}
          {productType.cancellation &&
          productType.cancellation.linkOnProductPage ? (
            <Link
              css={{
                textDecoration: "underline",
                color: palette.neutral["1"],
                ":visited": { color: palette.neutral["1"] }
              }}
              to={"/cancel/" + productType.urlPart}
            >
              {"Cancel your " + productType.friendlyName}
            </Link>
          ) : (
            undefined
          )}
        </PageContainer>
      </div>
    );
  }
  return (
    <PageContainer>
      <NoProduct
        inTab={true}
        supportRefererSuffix={"product_page"}
        productType={productType}
      />
    </PageContainer>
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
  productType: ProductTypeWithProductPage;
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
      loadingMessage={`Loading your ${props.productType.urlPart} details...`}
    />
    <PageContainer>
      <MembershipLinks /> {/*TODO need to have contributions FAQ*/}
    </PageContainer>
  </>
);
