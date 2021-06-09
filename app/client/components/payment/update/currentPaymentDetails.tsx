import React from "react";
import { Subscription } from "../../../../shared/productResponse";
import { CardDisplay } from "../cardDisplay";
import { DirectDebitDisplay } from "../directDebitDisplay";
import { PayPalDisplay } from "../paypalDisplay";
import { SepaDisplay } from "../sepaDisplay";

export const CurrentPaymentDetails = (subscription: Subscription) => {
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
