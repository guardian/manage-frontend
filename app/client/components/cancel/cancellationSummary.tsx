import React from "react";
import { formatDate, Subscription } from "../user";

const actuallyCancelled = (cancelType: string, subscription: Subscription) => (
  <React.Fragment>
    <h2>Your {cancelType} is cancelled.</h2>
    <p>
      You will continue to receive the benefits of your {cancelType} until{" "}
      {formatDate(subscription.end)}
    </p>
  </React.Fragment>
);

const notCancelled = () => <h2>Not Cancelled - please call the call centre</h2>; // TODO genericise this

export const CancellationSummary = (cancelType: string) => (
  subscription: Subscription
) =>
  subscription.cancelledAt
    ? actuallyCancelled(cancelType, subscription)
    : notCancelled;
