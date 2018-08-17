import React from "react";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { StripeTokenResponseContext } from "./cardInputForm";

export const handleNoToken = (props: RouteableStepProps) => {
  if (props.navigate) {
    props.navigate("..", { replace: true }); // step back up a level
    return null;
  }
  return <GenericErrorScreen />;
};

// TODO this should load an async loader to fetch membership details (passed in)
export interface PaymentUpdatedProps extends RouteableStepProps {
  fetch: () => Promise<Response>;
}

export const PaymentUpdated = (props: PaymentUpdatedProps) => (
  <StripeTokenResponseContext.Consumer>
    {tokenResponse =>
      tokenResponse.token && tokenResponse.token.card ? (
        <WizardStep routeableStepProps={props}>
          <span>updated</span>
        </WizardStep>
      ) : (
        handleNoToken(props)
      )
    }
  </StripeTokenResponseContext.Consumer>
);
