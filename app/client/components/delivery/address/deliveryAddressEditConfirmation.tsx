import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { NavigateFn } from "@reach/router";
import React, { ReactElement, useContext, useEffect } from "react";
import { LinkButton } from "../../buttons";
import { GenericErrorScreen } from "../../genericErrorScreen";
import { PageContainer } from "../../page";
import { TickInCircle } from "../../svgs/tickInCircle";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
  WizardStep
} from "../../wizardRouterAdapter";
import { DeliveryAddressDisplay } from "./deliveryAddressDisplay";
import { SubscriptionsAffectedList } from "./deliveryAddressForm";
import {
  AddressChangedInformationContext,
  isAddress,
  NewDeliveryAddressContext
} from "./deliveryAddressFormContext";

export const renderConfirmation = (navigate: NavigateFn | undefined) => () => {
  if (navigate) {
    navigate("confirmed", { replace: true });
  }
  return (
    <GenericErrorScreen loggingMessage="No navigate function - very odd" />
  );
};

export const DeliveryAddressEditConfirmation = (props: RouteableStepProps) => {
  const addressContext = useContext(NewDeliveryAddressContext);
  const addressChangeInformation = useContext(AddressChangedInformationContext);
  useEffect(() => {
    return () => {
      addressContext.addressStateReset?.();
    };
  }, []);
  return (
    <WizardStep routeableStepProps={props} hideBackButton>
      {isAddress(addressContext.newDeliveryAddress) ? (
        <PageContainer>
          <h1>Delivery address</h1>
          <SuccessMessage
            message={"We have successfully updated your delivery address."}
          />
          <AddressDisplayContainer title={"New address details"}>
            <>
              <section>
                <DeliveryAddressDisplay
                  {...addressContext.newDeliveryAddress}
                />
                <LinkButton to=".." text="Edit address" left />
              </section>
              <section>
                <SubscriptionsAffectedList
                  title={"Applied to"}
                  addressChangeInformation={addressChangeInformation}
                />
              </section>
            </>
          </AddressDisplayContainer>
        </PageContainer>
      ) : (
        visuallyNavigateToParent(props)
      )}
    </WizardStep>
  );
};

interface AddressDisplayContainerProps {
  title: string;
  children: ReactElement<any> | null;
}
const AddressDisplayContainer = (props: AddressDisplayContainerProps) => (
  <section
    css={css`
      border: 1px solid ${palette.neutral["86"]};
      padding: 48px 0 14px;
      position: relative;
      section {
        margin: 14px 0;
        padding: 0 14px;
        position: relative;
      }
      section + section {
        padding-top: 14px;
        border-top: 1px solid ${palette.neutral["86"]};
      }
    `}
  >
    <h1
      css={css`
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0 14px;
        ${textSans.medium()};
        font-weight: bold;
        line-height: 48px;
        background-color: ${palette.neutral["97"]};
        border-bottom: 1px solid ${palette.neutral["86"]};
      `}
    >
      New address details
    </h1>
    <>{props.children}</>
  </section>
);

interface SuccessMessageProps {
  message: string;
}
const SuccessMessage = (props: SuccessMessageProps) => (
  <div
    css={css`
      position: relative;
      width: 100%;
      text-align: left;
      border: 4px solid ${palette.success.main};
      box-sizing: border-box;
      padding: 14px 14px 14px 50px;
      margin-bottom: 50px;
      ${textSans.medium()};
      font-weight: bold;
    `}
  >
    <i
      css={css`
        position: absolute;
        top: 14px;
        left: 14px;
      `}
    >
      <TickInCircle />
    </i>
    {props.message}
  </div>
);
