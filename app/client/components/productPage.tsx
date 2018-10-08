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
import { ProductType, ProductTypes } from "../../shared/productTypes";
import palette from "../colours";
import { maxWidth, minWidth } from "../styles/breakpoints";
import { serif } from "../styles/fonts";
import { Button, LinkButton } from "./buttons";
import { CancellationSummary } from "./cancel/cancellationSummary";
import { MembershipLinks } from "./membershipLinks";
import { navLinks } from "./nav";
import { PageContainer, PageHeaderContainer } from "./page";
import { CardDisplay } from "./payment/cardDisplay";
import { DirectDebitDisplay } from "./payment/directDebitDisplay";
import { PayPalDisplay } from "./payment/paypalDisplay";
import { RouteableProps } from "./wizardRouterAdapter";

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
                text="Update Payment Details"
                to={updatePaymentPath}
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

const getPaymentPart = (data: ProductDetail, updatePaymentPath: string) => {
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
            data.subscription.plan.currency +
            (data.subscription.nextPaymentPrice / 100.0).toFixed(2)
          }
        />
        {getPaymentMethodRow(data.subscription, updatePaymentPath)}
      </>
    );
  } else {
    return <ProductDetailRow label={"Annual payment"} data={"FREE"} />;
  }
};

const getProductRenderer = (productType: ProductType) => (
  apiResponse: MembersDataApiResponse
) => {
  if (hasProduct(apiResponse)) {
    const data: ProductDetail = apiResponse;
    if (data.subscription.cancelledAt) {
      return CancellationSummary(productType.friendlyName)(data.subscription);
    }
    return (
      <div>
        {data.alertText ? (
          <div
            css={{
              backgroundColor: palette.blue.dark,
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
                text="Update Payment Details"
                to={"/payment/" + productType.urlPart}
                primary
                right
              />
            </PageContainer>
          </div>
        ) : (
          undefined
        )}
        <PageContainer>
          {data.regNumber ? (
            <ProductDetailRow
              label={"Registration number"}
              data={data.regNumber}
            />
          ) : (
            undefined
          )}
          {productType.tierRowLabel &&
          productType.tierRowLabel.toLowerCase() !== "patron" ? (
            <ProductDetailRow
              label={productType.tierRowLabel}
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
                    <Button text="Change tier" />
                  </a>
                </div>
              }
            />
          ) : (
            undefined
          )}
          <ProductDetailRow
            label={"Start date"}
            data={formatDate(data.subscription.start || data.joinDate)}
          />
          {getPaymentPart(data, "/payment/" + productType.urlPart)}
        </PageContainer>
      </div>
    );
  }
  return <PageContainer>{productType.invalidComponentRenderer}</PageContainer>;
};

const headerCss = css({
  fontSize: "2rem",
  lineHeight: "2.25rem",
  fontFamily: serif,
  marginBottom: "30px"
});

export const Membership = (props: RouteableProps) => (
  <>
    <PageHeaderContainer selectedNavItem={navLinks.membership}>
      <h1 className={headerCss}>Membership</h1>
    </PageHeaderContainer>
    <MembersDatApiAsyncLoader
      fetch={ProductTypes.membership.fetchProductDetail}
      render={getProductRenderer(ProductTypes.membership)}
      loadingMessage="Loading your membership details..."
    />
    <PageContainer>
      <MembershipLinks />
    </PageContainer>
  </>
);

export const Contributions = (props: RouteableProps) => (
  <>
    <PageHeaderContainer selectedNavItem={navLinks.contributions}>
      <h1 className={headerCss}>Contributions</h1>
    </PageHeaderContainer>
    <MembersDatApiAsyncLoader
      fetch={ProductTypes.contributions.fetchProductDetail}
      render={getProductRenderer(ProductTypes.contributions)}
      loadingMessage="Loading details of your contributions..."
    />
    <PageContainer>
      <MembershipLinks /> {/*TODO need to have contributions FAQ*/}
    </PageContainer>
  </>
);
