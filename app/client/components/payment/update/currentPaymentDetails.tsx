import React from "react";
import { Subscription } from "../../../../shared/productResponse";
import { CardDisplay } from "../cardDisplay";
import { DirectDebitDisplay } from "../directDebitDisplay";
import { PayPalDisplay } from "../paypalDisplay";

export const CurrentPaymentDetails = (subscription: Subscription) => {
  if (subscription.card) {
    return <CardDisplay {...subscription.card} />;
  } else if (subscription.payPalEmail) {
    return <PayPalDisplay payPalEmail={subscription.payPalEmail} />;
  } else if (subscription.account) {
    return <DirectDebitDisplay {...subscription.account} />;
  }
  return <span>Other Payment Method</span>; // Direct Debit ???
};
