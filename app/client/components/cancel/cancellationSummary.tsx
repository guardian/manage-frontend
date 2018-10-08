import React from "react";
import { formatDate } from "../../../shared/productResponse";
import { Subscription } from "../../../shared/productResponse";
import palette from "../../colours";
import { GenericErrorScreen } from "../genericErrorScreen";
import { PageContainerSection } from "../page";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";

const actuallyCancelled = (cancelType: string, subscription: Subscription) => (
  <PageContainerSection>
    <h2
      css={{
        padding: "0.9375rem 0 0.9375rem 0.25rem",
        margin: "2rem 0 0.9375rem",
        backgroundColor: palette.yellow.light,
        borderTop: `0.0625rem solid ${palette.neutral["3"]}`,
        borderBottom: `0.0625rem solid ${palette.neutral["3"]}`,
        fontSize: "1.25rem",
        lineHeight: "1.5rem",
        fontWeight: 900,
        color: palette.neutral["1"]
      }}
    >
      Your {cancelType} is cancelled.
    </h2>
    {subscription.end ? (
      <p>
        You will continue to receive the benefits of your {cancelType} until{" "}
        <b>{formatDate(subscription.end)}</b>. You will not be charged again.
      </p>
    ) : (
      <p>Your cancellation is effective immediately.</p>
    )}
    <p>
      If you are interested in supporting our journalism in other ways, please
      consider either a contribution or a subscription.
    </p>
    <div css={{ textAlign: "right" }}>
      <SupportTheGuardianButton supportReferer="cancellation_summary" />
    </div>
  </PageContainerSection>
);

export const isCancelled = (subscription: Subscription) =>
  Object.keys(subscription).length === 0 || subscription.cancelledAt;

export const CancellationSummary = (cancelType: string) => (
  subscription: Subscription
) =>
  isCancelled(subscription) ? (
    actuallyCancelled(cancelType, subscription)
  ) : (
    <GenericErrorScreen loggingMessage="Not actually cancelled" />
  );
