import { Router, ServerLocation } from "@reach/router";
import React, { ReactNode } from "react";
import { injectGlobal } from "../styles/emotion";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import { ContributionsCancellationFlow } from "./cancel/contributions/contributionsCancellationFlow";
import { membershipCancellationReasonMatrix } from "./cancel/membership/cancellationReasons";
import { MembershipCancellationFlow } from "./cancel/membership/membershipCancellationFlow";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
import { FAQs } from "./faqs";
import { Main } from "./main";
import {
  loadMembershipData,
  MembersDataApiResponse,
  Membership
} from "./membership";
import { navLinks } from "./nav";
import { NotFound } from "./notFound";
import { CardProps } from "./payment/cardDisplay";
import { ConfirmCardUpdate } from "./payment/update/confirmCardUpdate";
import { PaymentUpdated } from "./payment/update/paymentUpdated";
import { MembershipPaymentUpdateFlow } from "./payment/update/updatePaymentFlow";
import { RedirectOnMeResponse } from "./redirectOnMeResponse";

export interface Card extends CardProps {
  stripePublicKeyForUpdate: string;
}

export interface Subscription {
  subscriberId: string;
  start: string;
  end: string;
  cancelledAt: boolean;
  nextPaymentDate: string;
  nextPaymentPrice: number;
  card?: Card;
  payPalEmail?: string;
  plan: {
    amount: number;
    currency: string;
    interval: string;
  };
}

export interface WithSubscription {
  subscription: Subscription;
}

export interface CancellationReason {
  reasonId: string;
  linkLabel: string;
  saveTitle: string;
  saveBody: string | JSX.Element;
  experimentSaveBody?: JSX.Element;
  experimentTriggerFlag?: string;
  alternateCallUsPrefix?: string;
  alternateFeedbackIntro?: string;
  alternateFeedbackThankYouTitle?: string;
  alternateFeedbackThankYouBody?: string;
  skipFeedback?: boolean;
}

export const MembersDataApiResponseContext: React.Context<
  MembersDataApiResponse
> = React.createContext({});

export const formatDate = (shortForm: string) => {
  return new Date(shortForm).toDateString();
};

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}

    <Router>
      <RedirectOnMeResponse path="/" />

      <Membership path={navLinks.membership.link} />
      <MembershipCancellationFlow path="/cancel/membership" currentStep={1}>
        {membershipCancellationReasonMatrix.map(
          (reason: CancellationReason) => (
            <GenericSaveAttempt
              sfProduct="Membership"
              reason={reason}
              key={reason.reasonId}
              path={reason.reasonId}
              linkLabel={reason.linkLabel}
              currentStep={2}
            >
              <ExecuteCancellation
                path="confirmed"
                cancelApiUrlSuffix="membership"
                cancelType="membership"
                withSubscriptionResponseFetcher={loadMembershipData}
                currentStep={3}
              />
            </GenericSaveAttempt>
          )
        )}
      </MembershipCancellationFlow>
      <MembershipPaymentUpdateFlow path="/payment/membership" currentStep={1}>
        <ConfirmCardUpdate path="confirm" currentStep={2}>
          <PaymentUpdated
            fetch={loadMembershipData}
            path="updated"
            currentStep={3}
          />
        </ConfirmCardUpdate>
      </MembershipPaymentUpdateFlow>

      <ContributionsCancellationFlow
        path="/cancel/contributions"
        currentStep={1}
      />

      <FAQs path="/help" />

      <NotFound default={true} />
    </Router>
  </Main>
);

export const ServerUser = (url: string) => (
  <>
    <ServerLocation url={url}>
      <User />
    </ServerLocation>
  </>
);

export const BrowserUser = (
  <>
    <AnalyticsTracker />
    <User />
  </>
);
