import { css } from "@emotion/core";
import { LinkButton } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { SvgArrowLeftStraight } from "@guardian/src-icons";
import { navigate } from "@reach/router";
import * as Sentry from "@sentry/browser";
import React from "react";
import { GenericErrorMessage } from "../../identity/GenericErrorMessage";
import { ProgressIndicator } from "../../progressIndicator";
import { WithStandardTopMargin } from "../../WithStandardTopMargin";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { CancellationReason } from "../cancellationReason";

const innerContent = (reason: CancellationReason, updatedAmount: number) => {
  const onReturnClicked = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate("/");
  };

  return (
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

        <div
          css={css`
            margin-top: ${space[24]}px;
          `}
        >
          <LinkButton
            href="/"
            onClick={onReturnClicked}
            priority="tertiary"
            icon={<SvgArrowLeftStraight />}
            iconSide="left"
          >
            Return to your account
          </LinkButton>
        </div>
      </WithStandardTopMargin>
    </>
  );
};

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
