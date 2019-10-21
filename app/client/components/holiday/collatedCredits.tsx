import React from "react";
import { friendlyLongDateFormat, HolidayStopDetail } from "./holidayStopApi";

interface CollatedCreditByInvoiceDate {
  [invoiceDateString: string]: number;
}

const collateCreditsByInvoiceDate = (
  publicationsImpacted: HolidayStopDetail[]
) =>
  publicationsImpacted.reduce(
    (accumulator, currentValue) => {
      const credit = currentValue.actualPrice || currentValue.estimatedPrice;
      if (currentValue.invoiceDate && credit) {
        const invoiceDateAsString = currentValue.invoiceDate.format(
          friendlyLongDateFormat
        );
        return {
          ...accumulator,
          [invoiceDateAsString]:
            credit + (accumulator[invoiceDateAsString] || 0)
        };
      }
      return {}; // if we don't have credits and dates for every entry we shouldn't show anything
    },
    {} as CollatedCreditByInvoiceDate
  );

export interface CollatedCreditsProps {
  publicationsImpacted: HolidayStopDetail[];
  currency?: string;
  withBullet?: true;
}

export const CollatedCredits = (props: CollatedCreditsProps) => {
  const collatedCreditsByInvoiceDate = collateCreditsByInvoiceDate(
    props.publicationsImpacted
  );

  const invoiceDateStrings = Object.keys(collatedCreditsByInvoiceDate);

  return (
    <div>
      {invoiceDateStrings.length === 0 && "Unavailable at this time."}
      {invoiceDateStrings.map((invoiceDateString, index) => (
        <div key={`cc-${index}`}>
          {props.withBullet && "- "}
          <strong>
            {props.currency}
            {Math.abs(collatedCreditsByInvoiceDate[invoiceDateString]).toFixed(
              2
            )}
          </strong>{" "}
          off your {invoiceDateString} payment
        </div>
      ))}
    </div>
  );
};
