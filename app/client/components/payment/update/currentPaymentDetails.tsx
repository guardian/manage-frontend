import React from "react";
import { Subscription } from "../../../../shared/productResponse";
import { CardDisplay } from "../cardDisplay";
import { DirectDebitInlineDisplay } from "../directDebitDisplay";
import { PayPalDisplay } from "../paypalDisplay";

export const CurrentPaymentDetails = (subscription: Subscription) => {
  if (subscription.card) {
    return <CardDisplay {...subscription.card} />;
  } else if (subscription.payPalEmail) {
    return <PayPalDisplay payPalId={subscription.payPalEmail} />;
  } else if (subscription.mandate) {
    return <DirectDebitInlineDisplay {...subscription.mandate} />;
  }
  return <span>No Payment Method</span>;
};
