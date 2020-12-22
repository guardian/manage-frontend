import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import * as Sentry from "@sentry/browser";
import React from "react";
import { GenericErrorMessage } from "../../identity/GenericErrorMessage";
import { WithStandardTopMargin } from "../../page";
import { ProgressIndicator } from "../../progressIndicator";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { CancellationReason } from "../cancellationReason";

const innerContent = (reason: CancellationReason, updatedAmount: number) => (
  <>
    <ProgressIndicator
      steps={[
        { title: "Reason" },
        { title: "Review" },
        { title: "Confirmation", isCurrentStep: true }
      ]}
      additionalCSS={css`
        margin: ${space[5]}px 0 ${space[12]}px;
      `}
    />
    <WithStandardTopMargin>
      {reason.savedBody && <reason.savedBody amount={updatedAmount} />}
    </WithStandardTopMargin>
  </>
);

interface SavedCancellationStepProps extends RouteableStepProps {
  reason: CancellationReason;
}

export interface SavedBodyProps {
  amount: number;
}

export const SavedCancellation = (props: SavedCancellationStepProps) => {
  const updatedAmount = props.location?.state.updatedAmount;

  if (!updatedAmount) {
    Sentry.captureMessage("Updated amount not passed to SavedCancellation");
  }

  return (
    <WizardStep routeableStepProps={props}>
      {updatedAmount ? (
        innerContent(props.reason, updatedAmount)
      ) : (
        <GenericErrorMessage />
      )}
    </WizardStep>
  );
};
