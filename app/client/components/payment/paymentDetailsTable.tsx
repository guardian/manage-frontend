import { neutral } from "@guardian/src-foundations/palette";
import React from "react";
import { ProductDetail } from "../../../shared/productResponse";
import { ProductDescriptionListTable } from "../productDescriptionListTable";
import { CardDisplay } from "./cardDisplay";
import { DirectDebitDisplay } from "./directDebitDisplay";
import { NewPaymentPriceAlert, NextPaymentDetails } from "./nextPaymentDetails";
import { PayPalDisplay } from "./paypalDisplay";
import { SepaDisplay } from "./sepaDisplay";

interface PaymentDetailsTableProps {
  productDetail: ProductDetail;
  nextPaymentDetails: NextPaymentDetails | undefined;
  hasCancellationPending: boolean;
  tableHeading?: string;
}
export const PaymentDetailsTable = (props: PaymentDetailsTableProps) => (
  <ProductDescriptionListTable
    borderColour={neutral[86]}
    alternateRowBgColors
    tableHeading={props.tableHeading}
    content={[
      ...(props.nextPaymentDetails &&
      props.productDetail.subscription.autoRenew &&
      !props.hasCancellationPending
        ? [
            {
              title: props.nextPaymentDetails.paymentKey,
              value: (
                <span>
                  {props.nextPaymentDetails.isNewPaymentValue && (
                    <NewPaymentPriceAlert />
                  )}
                  {props.nextPaymentDetails.paymentValue}
                </span>
              )
            },
            {
              title: props.nextPaymentDetails.nextPaymentDateKey,
              ...(props.productDetail.subscription.nextPaymentDate && {
                value: props.nextPaymentDetails.nextPaymentDateValue
              })
            }
          ]
        : []),
      {
        title: `Payment${props.productDetail.isPaidTier ? " method" : ""}`,
        value: props.productDetail.isPaidTier ? (
          <>
            {props.productDetail.subscription.card && (
              <CardDisplay
                margin="0"
                inErrorState={!!props.productDetail.alertText}
                {...props.productDetail.subscription.card}
              />
            )}
            {props.productDetail.subscription.payPalEmail && (
              <PayPalDisplay
                payPalId={props.productDetail.subscription.payPalEmail}
                shouldIncludePrefixCopy
              />
            )}
            {props.productDetail.subscription.mandate && (
              <DirectDebitDisplay
                inErrorState={!!props.productDetail.alertText}
                {...props.productDetail.subscription.mandate}
              />
            )}
            {props.productDetail.subscription.sepaMandate && (
              <SepaDisplay {...props.productDetail.subscription.sepaMandate} />
            )}
            {props.productDetail.subscription
              .stripePublicKeyForCardAddition && <span>No Payment Method</span>}
          </>
        ) : (
          <span>FREE</span>
        ),
        spanTwoCols: props.productDetail.subscription.payPalEmail
          ? true
          : undefined
      },
      {
        title: "Expiry date",
        ...(props.productDetail.subscription.card?.expiry && {
          value: `${
            props.productDetail.subscription.card.expiry.month < 10 ? "0" : ""
          }${props.productDetail.subscription.card.expiry.month}
                    ${" / "}
                    ${props.productDetail.subscription.card.expiry.year}`
        })
      }
    ]}
  />
);
