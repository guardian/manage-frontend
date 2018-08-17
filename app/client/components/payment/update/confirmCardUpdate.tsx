import React from "react";
import palette from "../../../colours";
import { Button } from "../../buttons";
import { MembersDataApiResponseContext } from "../../user";
import { RouteableStepProps, WizardStep } from "../../wizardRouterAdapter";
import { CardDisplay } from "../cardDisplay";
import { StripeTokenResponseContext } from "./cardInputForm";
import { handleNoToken } from "./paymentUpdated";

export const ConfirmCardUpdate = (props: RouteableStepProps) => (
  <MembersDataApiResponseContext.Consumer>
    {mdaResponse => (
      <StripeTokenResponseContext.Consumer>
        {tokenResponse =>
          props.navigate && tokenResponse.token && tokenResponse.token.card ? (
            <WizardStep routeableStepProps={props} backButtonLevelsUp>
              {/*TODO add 'from' display - new re-usable component that requires a subscription*/}
              <span>please confirm</span>
              <CardDisplay
                last4={tokenResponse.token.card.last4}
                type={
                  tokenResponse.token.card.brand.toLowerCase() /*TODO need to research how MDA calcs 'type'*/
                }
              />
              <div css={{ textAlign: "right" }}>
                <Button
                  color={palette.neutral["1"]}
                  textColor={palette.white}
                  text="Complete Payment Update"
                  onClick={() =>
                    props.navigate
                      ? props.navigate("updated")
                      : handleNoToken(props)
                  }
                />
              </div>
            </WizardStep>
          ) : (
            handleNoToken(props)
          )
        }
      </StripeTokenResponseContext.Consumer>
    )}
  </MembersDataApiResponseContext.Consumer>
);
