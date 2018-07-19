import React from "react";
import palette from "../../colours";
import { Button } from "../buttons";
import { GenericErrorScreen } from "../genericErrorScreen";
import { PageContainerSection } from "../page";
import { formatDate, Subscription } from "../user";

const actuallyCancelled = (cancelType: string, subscription?: Subscription) => (
  <PageContainerSection>
    <h2>Your {cancelType} is cancelled.</h2>
    {subscription ? (
      <p>
        You will continue to receive the benefits of your {cancelType} until{" "}
        <b>{formatDate(subscription.end)}</b>. You will not be charged again.
      </p>
    ) : (
      undefined
    )}
    <p>
      If you are interested in supporting our journalism in other ways, please
      consider either a contribution or a subscription.
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
  </PageContainerSection>
);

export const CancellationSummary = (cancelType: string) => (
  subscription?: Subscription
) =>
  subscription && subscription.cancelledAt ? (
    actuallyCancelled(cancelType, subscription)
  ) : (
    <GenericErrorScreen />
  );
