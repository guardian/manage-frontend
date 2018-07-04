import React from "react";
import palette from "../../colours";
import { Button } from "../buttons";
import { GenericErrorScreen } from "../genericErrorScreen";
import { formatDate, Subscription } from "../user";

const actuallyCancelled = (cancelType: string, subscription: Subscription) => (
  <div>
    <h2>Your {cancelType} is cancelled.</h2>
    <p>
      You will continue to receive the benefits of your {cancelType} until{" "}
      <b>{formatDate(subscription.end)}</b>
    </p>
    <p>
      If you change your mind and wish to support the Guardian in the future,
      you can do so below.
    </p>
    <div css={{ textAlign: "right" }}>
      <a href={`https://support.${window.guardian.domain}`}>
        <Button
          text="Support The Guardian"
          textColor={palette.white}
          color={palette.neutral["2"]}
        />
      </a>
    </div>
  </div>
);

export const CancellationSummary = (cancelType: string) => (
  subscription: Subscription
) =>
  subscription.cancelledAt ? (
    actuallyCancelled(cancelType, subscription)
  ) : (
    <GenericErrorScreen />
  );
