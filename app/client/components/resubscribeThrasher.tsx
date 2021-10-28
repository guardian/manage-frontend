import React from "react";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { trackEvent } from "./analytics";
import { SupportTheGuardianButton } from "./supportTheGuardianButton";
import { fetcher } from "../fetchClient";
import DataFetcher from "./DataFetcher";
import useSWR from "swr";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../shared/identity";

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

interface GetThrasherProps {
  args: ResubscribeThrasherProps;
}

const headers = {
  headers: {
    [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
      window.location.href
    )
  }
};

const GetThrasher = ({ args }: GetThrasherProps) => {
  const existingPaymentOptions = useSWR(
    ["/api/existing-payment-options", headers],
    fetcher,
    { suspense: true }
  ).data as ExistingPaymentOption[];

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
      eventLabel: args.usageContext
    });
    return (
      <div
        css={{
          backgroundColor: palette.yellow.medium,
          padding: "10px 15px 15px",
          margin: "30px 0"
        }}
      >
        <div>
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
            supportReferer={`resubscribe_thrasher_${args.usageContext}`}
            alternateButtonText="Make a recurring contribution"
            urlSuffix="contribute"
            fontWeight="bold"
            height="42px"
            notPrimary
          />
        </div>
      </div>
    );
  }

  return args.children;
};

interface ResubscribeThrasherProps {
  children: JSX.Element;
  usageContext: string;
}

export const ResubscribeThrasher = (props: ResubscribeThrasherProps) => (
  <DataFetcher loadingMessage="Loading...">
    <GetThrasher args={props} />
  </DataFetcher>
);
