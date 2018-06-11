import { Link, Router, ServerLocation } from "@reach/router";
import React from "react";
import { injectGlobal } from "../styles/emotion";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { ContributionsFlow } from "./cancel/contributionsFlow";
import { MembershipFlow } from "./cancel/membershipFlow";
import { NotFound } from "./cancel/notFound";
import { AreYouSure } from "./cancel/stages/areYouSure";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
import { CardProps } from "./card";
import { Main } from "./main";
import { Membership } from "./membership";

export interface MeResponse {
  userId: string;
  tier: string;
  membershipJoinDate: string;
  contentAccess: {
    member: boolean;
    paidMember: boolean;
    recurringContributor: boolean;
    digitalPack: boolean;
  };
}

export interface Subscription {
  start: string;
  end: string;
  cancelledAt: boolean;
  nextPaymentDate: string;
  card?: CardProps;
  plan: {
    amount: number;
    currency: string;
  };
}

export interface HasSubscription {
  subscription: Subscription;
}

const zuoraCancellationReasonMapping: { [zuoraReasonKey: string]: string } = {
  mma_editorial: "I am unhappy with Guardian journalism",
  mma_support_another_way:
    "I am going to support The Guardian in another way, eg. by subscribing",
  mma_values: "I don't feel that the Guardian values my support",
  mma_payment_issue: "I didn't expect The Guardian to take another payment",
  mma_health: "Ill-health",
  mma_none: "None of the membership benefits are of interest to me",
  mma_financial_circumstances: "A change in my financial circumstances",
  mma_other: "Other"
};

export const fetchMe: () => Promise<MeResponse> = async () => {
  return (await fetch("/api/me", { credentials: "include" })).json();
};

export const CancellationReasonContext: React.Context<
  string
> = React.createContext("");

export const CancellationTypeContext: React.Context<
  string
> = React.createContext("error");

export const CancellationUrlSuffixContext: React.Context<
  string
> = React.createContext("");

export const HasSubscriptionGetterContext: React.Context<
  () => Promise<HasSubscription | {}>
> = React.createContext(() => Promise.resolve({}));

export const formatDate = (shortForm: string) => {
  return new Date(shortForm).toDateString();
};

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}

    <Router>
      <Membership path="/" />

      <MembershipFlow path="/cancel/membership">
        {Object.keys(zuoraCancellationReasonMapping).map(
          (zuoraReason: string) => (
            <GenericSaveAttempt
              key={zuoraReason}
              path={zuoraReason}
              linkLabel={zuoraCancellationReasonMapping[zuoraReason]}
            >
              <AreYouSure path="areYouSure">
                <ExecuteCancellation path="confirmed" />
              </AreYouSure>
            </GenericSaveAttempt>
          )
        )}
      </MembershipFlow>

      <ContributionsFlow path="/cancel/contributions" />

      <NotFound default={true} />
    </Router>
  </Main>
);

export const ServerUser = (url: string) => (
  <ServerLocation url={url}>
    ...{/* wait for https://github.com/reach/router/issues/27 fix and then reenable */}
  </ServerLocation>
);

export const BrowserUser = <User />;
