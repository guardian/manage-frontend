import React, { ReactNode } from "react";
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../shared/identity";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { trackEvent } from "./analytics";
import AsyncLoader from "./asyncLoader";
import { SupportTheGuardianButton } from "./supportTheGuardianButton";
<<<<<<< HEAD
import { fetchWithDefaultParameters } from "../fetch";

const fetchExistingPaymentOptions = () =>
  fetchWithDefaultParameters("/api/existing-payment-options", {
    headers: {
      [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
        window.location.href
      )
    }
  });
=======
import { fetcher } from "../fetchClient";
import DataFetcher from "./DataFetcher";
import useSWR from "swr";
<<<<<<< HEAD
>>>>>>> 2106fd23 (componetized address form)
=======
import {
  getScopeFromRequestPathOrEmptyString,
  X_GU_ID_FORWARDED_SCOPE
} from "../../shared/identity";
>>>>>>> 91cfa81b (formatting and spacings)

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
<<<<<<< HEAD
  headers: {
    [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
      window.location.href
    )
  }
=======
  [X_GU_ID_FORWARDED_SCOPE]: getScopeFromRequestPathOrEmptyString(
    window.location.href
  )
>>>>>>> 91cfa81b (formatting and spacings)
};

const GetThrasher = ({ args }: GetThrasherProps) => {
  const existingPaymentOptions = useSWR(
<<<<<<< HEAD
    "/api/existing-payment-options",
<<<<<<< HEAD
    url => fetcher(url, headers),
=======
=======
    ["/api/existing-payment-options", headers],
>>>>>>> 91cfa81b (formatting and spacings)
    fetcher,
>>>>>>> 2106fd23 (componetized address form)
    { suspense: true }
  ).data as ExistingPaymentOption[];

const getThrasher = (args: ResubscribeThrasherProps) => (
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
