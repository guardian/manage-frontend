import React from "react";
import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import { brand, neutral, news } from "@guardian/src-foundations/palette";
import { maxWidth, minWidth } from "../../../styles/breakpoints";
import { getMainPlan, ProductDetail } from "../../../../shared/productResponse";
import { CardDisplay } from "../cardDisplay";
import { DirectDebitDisplay } from "../directDebitDisplay";
import { PayPalDisplay } from "../paypalDisplay";
import { SepaDisplay } from "../sepaDisplay";
import { GROUPED_PRODUCT_TYPES } from "../../../../shared/productTypes";
import { textSans } from "@guardian/src-foundations/typography";

/*
function renderPaymentMethodDisplay(subscription: Subscription) {
  if (subscription.card) {
    return <CardDisplay {...subscription.card} />;
  } else if (subscription.payPalEmail) {
    return <PayPalDisplay payPalId={subscription.payPalEmail} />;
  } else if (subscription.mandate) {
    return <DirectDebitDisplay {...subscription.mandate} />;
  } else if (subscription.sepaMandate) {
    return <SepaDisplay {...subscription.sepaMandate} />;
  }
  return <span>No Payment Method</span>;
};
*/

const CurrentPaymentDetails = (props: ProductDetail) => {
  const { subscription } = props;

  const mainPlan = getMainPlan(subscription);
  const hasCancellationPending: boolean = subscription.cancelledAt;

  const groupedProductType = GROUPED_PRODUCT_TYPES[props.mmaCategory];

  const specificProductType = groupedProductType.mapGroupedToSpecific(props);

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
    width: 14ch;
  `;

  const valueCss = css`
    ${textSans.medium()};
    padding: 0;
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 15ch);
  `;

  const hasPaymentFailure: boolean = !!props.alertText;

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
          background-color: ${hasCancellationPending
            ? neutral[97]
            : brand[400]};
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
            color: ${hasCancellationPending ? neutral[7] : neutral[100]};
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
        <div
          css={css`
            display: flex;
            align-items: center;
            padding: ${space[3]}px 0;
            ${maxWidth.mobileLandscape} {
              flex-direction: column;
              align-items: end;
            }
          `}
        ></div>
      </div>
      <div
        css={css`
          padding: ${space[5]}px ${space[3]}px;
          ${minWidth.tablet} {
            padding: ${space[5]}px;
            display: flex;
          }
        `}
      >
        <div
          css={css`
            margin: ${space[6]}px 0 0 0;
            padding: ${space[6]}px 0 0 0;
            ${minWidth.tablet} {
              flex: 1;
              display: flex;
              flex-flow: column nowrap;
              padding: 0;
              margin: 0;
            }
          `}
        >
          {props.isPaidTier && (
            <>
              <ul css={keyValuePairCss}>
                <li css={keyCss}>Payment method</li>
                <li css={valueCss}>
                  {subscription.card && (
                    <CardDisplay
                      inErrorState={hasPaymentFailure}
                      margin="0"
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
                      inErrorState={hasPaymentFailure}
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
              margin: ${space[6]}px 0 0 0;
              padding: ${space[6]}px 0 0 0;
              ${minWidth.tablet} {
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
            {subscription.card.expiry && (
              <>
                <span css={keyCss}>Expiry</span>
                <span
                  css={css`
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
    </div>
  );
};

export default CurrentPaymentDetails;
