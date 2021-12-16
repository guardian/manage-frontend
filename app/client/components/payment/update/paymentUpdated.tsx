import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, neutral, news } from "@guardian/src-foundations/palette";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import React from "react";
import {
  formatDate,
  getMainPlan,
  isPaidSubscriptionPlan,
  isProduct,
  MembersDataApiItemContext,
  ProductDetail,
  Subscription,
  WithSubscription
} from "../../../../shared/productResponse";
import { GROUPED_PRODUCT_TYPES } from "../../../../shared/productTypes";
import { LinkButton } from "../../buttons";
import { GenericErrorScreen } from "../../genericErrorScreen";
import {
  ReturnToAccountOverviewButton,
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../../wizardRouterAdapter";
import {
  isNewPaymentMethodDetail,
  NewPaymentMethodContext,
  NewPaymentMethodDetail
} from "./newPaymentMethodDetail";
import { NewSubscriptionContext } from "./newSubscriptionDetail";
import { textSans } from "@guardian/src-foundations/typography";
import { CardDisplay } from "../cardDisplay";
import { DirectDebitDisplay } from "../directDebitDisplay";
import { PayPalDisplay } from "../paypalDisplay";
import { SepaDisplay } from "../sepaDisplay";

interface ConfirmedNewPaymentDetailsRendererProps {
  subscription: Subscription;
  newPaymentMethodDetail: NewPaymentMethodDetail;
  previousProductDetail: ProductDetail;
}

const keyValuePairCss = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const keyCss = css`
  ${textSans.medium({ fontWeight: "bold" })};
  padding: 0 ${space[2]}px 0 0;
  display: inline-block;
  vertical-align: top;
  width: 50%;

  ${minWidth.tablet} {
    width: 14ch;
  }
`;

const valueCss = css`
  ${textSans.medium()};
  padding: 0;
  display: inline-block;
  vertical-align: top;
  width: 50%;

  ${minWidth.tablet} {
    width: calc(100% - 15ch);
  }
`;

function getPaymentInterval(interval: string) {
  if (interval === "year") {
    return "annual";
  } else if (interval === "month") {
    return "monthly";
  }
}

export const ConfirmedNewPaymentDetailsRenderer = ({
  subscription,
  newPaymentMethodDetail,
  previousProductDetail
}: ConfirmedNewPaymentDetailsRendererProps) => {
  const mainPlan = getMainPlan(subscription);
  const groupedProductType =
    GROUPED_PRODUCT_TYPES[previousProductDetail.mmaCategory];
  const specificProductType = groupedProductType.mapGroupedToSpecific(
    previousProductDetail
  );

  const hasPaymentFailure: boolean = !!previousProductDetail.alertText;

  if (
    newPaymentMethodDetail.subHasExpectedPaymentType(subscription) &&
    isPaidSubscriptionPlan(mainPlan)
  ) {
    return (
      <div
        css={css`
          border: 1px solid ${neutral[86]};
          margin-bottom: ${space[6]}px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: start;
            background-color: ${brand[400]};
            ${minWidth.mobileLandscape} {
              align-items: center;
            }
          `}
        >
          <h2
            css={css`
              font-size: 17px;
              font-weight: bold;
              margin: 0;
              padding: ${space[3]}px;
              color: ${neutral[100]};
              ${maxWidth.mobileLandscape} {
                padding: ${space[3]}px;
              }
              ${minWidth.tablet} {
                font-size: 20px;
                padding: ${space[3]}px ${space[5]}px;
              }
            `}
          >
            {specificProductType.productTitle(mainPlan)}
          </h2>
        </div>
        <div
          css={css`
            padding: ${space[3]}px;
            ${minWidth.tablet} {
              padding: ${space[5]}px;
              display: flex;
            }
          `}
        >
          <div
            css={css`
              ${minWidth.tablet} {
                flex: 1;
                display: flex;
                flex-flow: column nowrap;
              }
            `}
          >
            {previousProductDetail.isPaidTier && (
              <>
                <ul css={keyValuePairCss}>
                  <li css={keyCss}>Payment method</li>
                  <li css={valueCss}>
                    {subscription.card && (
                      <CardDisplay
                        inErrorState={false}
                        cssOverrides={css`
                          margin: 0;
                        `}
                        {...subscription.card}
                      />
                    )}
                    {subscription.payPalEmail && (
                      <PayPalDisplay payPalId={subscription.payPalEmail} />
                    )}
                    {subscription.sepaMandate && (
                      <SepaDisplay
                        accountName={subscription.sepaMandate.accountName}
                        iban={subscription.sepaMandate.iban}
                      />
                    )}
                    {subscription.mandate && (
                      <DirectDebitDisplay
                        inErrorState={false}
                        {...subscription.mandate}
                      />
                    )}
                    {subscription.stripePublicKeyForCardAddition && (
                      <span>No Payment Method</span>
                    )}
                  </li>
                </ul>
              </>
            )}
          </div>
          {subscription.card && (
            <div
              css={css`
                padding: ${space[3]}px 0 0 0;
                ${minWidth.tablet} {
                  flex: 1;
                  display: inline-block;
                  flex-flow: column nowrap;
                  margin: 0;
                  padding: 0 0 0 ${space[5]}px;
                }
                ul:last-of-type {
                  margin-bottom: ${space[5]}px;
                }
              `}
            >
              {subscription.card.expiry && (
                <>
                  <span
                    css={css`
                      ${keyCss};
                      ${minWidth.tablet} {
                        text-align: right;
                      }
                    `}
                  >
                    Expiry
                  </span>
                  <span
                    css={css`
                      ${valueCss};
                      color: ${hasPaymentFailure ? news[400] : neutral[7]};
                    `}
                  >
                    {subscription.card.expiry.month} /{" "}
                    {subscription.card.expiry.year}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {subscription.nextPaymentPrice && subscription.nextPaymentDate && (
          <div
            css={css`
              padding: ${space[3]}px;
              border-top: 1px solid ${neutral[86]};
              ${minWidth.tablet} {
                padding: ${space[5]}px;
                display: flex;
              }
            `}
          >
            <div
              css={css`
                ${minWidth.tablet} {
                  margin: ${space[6]}px 0 0 0;
                  padding: ${space[6]}px 0 0 0;
                  flex: 1;
                  display: flex;
                  flex-flow: column nowrap;
                  padding: 0;
                  margin: 0;
                }
              `}
            >
              <>
                <ul css={keyValuePairCss}>
                  <li css={keyCss}>Next Payment</li>
                  <li css={valueCss}>
                    {mainPlan.currency}
                    {(subscription.nextPaymentPrice / 100.0).toFixed(2)} /{" "}
                    {getPaymentInterval(subscription.plan?.interval)}
                    {subscription.stripePublicKeyForCardAddition && (
                      <span>No Payment Method</span>
                    )}
                  </li>
                </ul>
              </>
            </div>

            <div
              css={css`
                padding: ${space[3]}px 0 0 0;
                ${minWidth.tablet} {
                  margin: ${space[6]}px 0 0 0;
                  flex: 1;
                  display: inline-block;
                  flex-flow: column nowrap;
                  padding: 0 0 0 ${space[5]}px;
                  margin: 0;
                  padding: 0 0 0 ${space[5]}px;
                }
                ul:last-of-type {
                  margin-bottom: ${space[5]}px;
                }
              `}
            >
              <>
                <span css={keyCss}>Next payment date</span>
                <span css={valueCss}>
                  {formatDate(subscription.nextPaymentDate)}
                </span>
              </>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <GenericErrorScreen loggingMessage="Unsupported new payment method" />; // unsupported operation currently
};

interface PaymentMethodUpdatedProps {
  subs: WithSubscription[] | {};
  newPaymentMethodDetail: NewPaymentMethodDetail;
  previousProductDetail: ProductDetail;
}

const PaymentMethodUpdated = ({
  subs,
  newPaymentMethodDetail,
  previousProductDetail
}: PaymentMethodUpdatedProps) =>
  Array.isArray(subs) && subs.length === 1 ? (
    <>
      <h1
        css={css`
          margin: ${space[9]}px 0 ${space[5]}px 0;
          ${textSans.large({ fontWeight: "bold" })};
        `}
      >
        Your payment details were updated successfully
      </h1>
      <ConfirmedNewPaymentDetailsRenderer
        subscription={subs[0].subscription}
        newPaymentMethodDetail={newPaymentMethodDetail}
        previousProductDetail={previousProductDetail}
      />
      <h2
        css={css`
          margin-bottom: 0;

          ${textSans.large({ fontWeight: "bold" })};
        `}
      >
        Thank you
      </h2>
      <span> You are helping to support independent journalism.</span>
      <div css={{ marginTop: "20px" }}>
        <LinkButton
          to="/"
          text="Back to Account overview"
          colour={brand[400]}
          textColour={neutral[100]}
          fontWeight="bold"
          right
        />
      </div>
    </>
  ) : (
    <>
      <GenericErrorScreen
        loggingMessage={`${Array.isArray(subs) &&
          subs.length} subs returned when one was expected`}
      />
      <ReturnToAccountOverviewButton />
    </>
  );

export const PaymentUpdated = (props: RouteableStepProps) => {
  return (
    <MembersDataApiItemContext.Consumer>
      {previousProductDetail => (
        <NewPaymentMethodContext.Consumer>
          {newPaymentMethodDetail =>
            isNewPaymentMethodDetail(newPaymentMethodDetail) &&
            isProduct(previousProductDetail) ? (
              <NewSubscriptionContext.Consumer>
                {newSubscriptionData => (
                  <WizardStep routeableStepProps={props}>
                    <PaymentMethodUpdated
                      subs={newSubscriptionData}
                      newPaymentMethodDetail={newPaymentMethodDetail}
                      previousProductDetail={previousProductDetail}
                    />
                  </WizardStep>
                )}
              </NewSubscriptionContext.Consumer>
            ) : (
              visuallyNavigateToParent(props)
            )
          }
        </NewPaymentMethodContext.Consumer>
      )}
    </MembersDataApiItemContext.Consumer>
  );
};
