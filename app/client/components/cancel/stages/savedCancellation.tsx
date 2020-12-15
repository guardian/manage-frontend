import { css } from "@emotion/core";
import { space } from "@guardian/src-foundations";
import React from "react";
import { WithStandardTopMargin } from "../../page";
import { ProgressIndicator } from "../../progressIndicator";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { CancellationReason } from "../cancellationReason";

const innerContent = (reason: CancellationReason) => (
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
    <WithStandardTopMargin>{reason.savedBody}</WithStandardTopMargin>
  </>
);

interface SavedCancellationStepProps extends RouteableStepProps {
  reason: CancellationReason;
}

export const SavedCancellation = (props: SavedCancellationStepProps) => (
  <WizardStep routeableStepProps={props}>
    {innerContent(props.reason)}
  </WizardStep>
);
