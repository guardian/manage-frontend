import React from "react";
import { CancellationTypeContext, formatDate, Subscription } from "../user";

const actuallyCancelled = (subscription: Subscription) => (
  cancelType: string
) => (
  <React.Fragment>
    <h2>Your {cancelType} is cancelled.</h2>
    <p>
      You will continue to receive the benefits of your {cancelType} until{" "}
      {formatDate(subscription.end)}
    </p>
  </React.Fragment>
);

const notCancelled = () => <h2>No Cancelled - call centre</h2>; // TODO genericise this

export const CancellationSummary = (subscription: Subscription) => (
  <CancellationTypeContext.Consumer>
    {subscription.cancelledAt ? actuallyCancelled(subscription) : notCancelled}
  </CancellationTypeContext.Consumer>
);
