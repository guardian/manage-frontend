import React, { ReactNode } from "react";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../shared/identity";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { trackEvent } from "./analytics";
import AsyncLoader from "./asyncLoader";
import { EmptyPageContainer } from "./page";
import { SupportTheGuardianButton } from "./supportTheGuardianButton";

const fetchExistingPaymentOptions = () =>
  fetch("/api/existing-payment-options", {
    credentials: "include",
    mode: "same-origin",
    headers: {
      [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
        window.location.href
      )
    }
  });

interface ExistingPaymentSubscriptionInfo {
  name: string;
  isCancelled: boolean;
  isActive: boolean;
}

interface ExistingPaymentOption {
  paymentType: "Card" | "DirectDebit";
  billingAccountId: string;
  subscriptions: ExistingPaymentSubscriptionInfo[];
  card?: string;
  mandate?: string;
}

class ExistingPaymentOptionsAsyncLoader extends AsyncLoader<
  ExistingPaymentOption[]
> {}

const getThrasher = (props: ResubscribeThrasherProps) => (
  existingPaymentOptions: ExistingPaymentOption[]
) => {
  const eligiblePaymentOptionsIfNoActiveExistingContribution = existingPaymentOptions.find(
    option =>
      !!option.subscriptions.find(
        sub => sub.isActive && sub.name.indexOf("Contribution") !== -1
      )
  )
    ? []
    : existingPaymentOptions;

  if (eligiblePaymentOptionsIfNoActiveExistingContribution.length) {
    trackEvent({
      eventCategory: "impression",
      eventAction: "resubscribe_thrasher",
      eventLabel: props.usageContext
    });
    return (
      <div
        css={{
          backgroundColor: palette.yellow.medium,
          padding: "10px 15px 15px",
          margin: "30px 0"
        }}
      >
        <EmptyPageContainer noVerticalMargin>
          <h2 css={{ fontWeight: "bold", margin: "0" }}>
            Have you considered a monthly or annual contribution?
          </h2>
          <p
            css={{
              br: {
                display: "none",
                [minWidth.tablet]: {
                  display: "inline"
                }
              }
            }}
          >
            Support The Guardian with a recurring contribution of your choice.
            You can use your existing payment details so setting it up only
            takes a minute.
          </p>
          <SupportTheGuardianButton
            supportReferer={`resubscribe_thrasher_${props.usageContext}`}
            alternateButtonText="Make a recurring contribution"
            urlSuffix="contribute"
            fontWeight="bold"
            height="42px"
            notPrimary
          />
        </EmptyPageContainer>
      </div>
    );
  }
  return props.children;
};

interface ResubscribeThrasherProps {
  children: ReactNode;
  usageContext: string;
}

export const ResubscribeThrasher = (props: ResubscribeThrasherProps) => (
  <ExistingPaymentOptionsAsyncLoader
    fetch={fetchExistingPaymentOptions}
    render={getThrasher(props)}
    loadingMessage={"Loading..."}
  />
);
