import React from "react";
import { Subscription } from "../../user";
import { CardDisplay } from "../cardDisplay";

export const CurrentPaymentDetails = (subscription: Subscription) => {
  if (subscription.card) {
    return <CardDisplay {...subscription.card} />;
  } else if (subscription.payPalEmail) {
    return <div>Using PayPal</div>; // TODO re-use PayPalDisplay
  }
  return <span>Direct Debit ????????</span>;
};
