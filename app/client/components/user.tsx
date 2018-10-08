import { Router, ServerLocation } from "@reach/router";
import React from "react";
import { ProductTypes } from "../../shared/productTypes";
import { injectGlobal } from "../styles/emotion";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import {
  CancellationReason,
  membershipCancellationReasonMatrix
} from "./cancel/cancellationReasons";
import { ContributionsCancellationFlow } from "./cancel/contributions/contributionsCancellationFlow";
import { MembershipCancellationFlow } from "./cancel/membership/membershipCancellationFlow";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
import { Main } from "./main";
import { MembershipFAQs } from "./membershipFAQs";
import { navLinks } from "./nav";
import { NotFound } from "./notFound";
import { ConfirmCardUpdate } from "./payment/update/confirmCardUpdate";
import { PaymentUpdated } from "./payment/update/paymentUpdated";
import {
  ContributionsPaymentUpdateFlow,
  MembershipPaymentUpdateFlow
} from "./payment/update/updatePaymentFlow";
import { Contributions, Membership } from "./productPage";
import { RedirectOnMeResponse } from "./redirectOnMeResponse";

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
                withSubscriptionResponseFetcher={
                  ProductTypes.membership.fetchProductDetail
                }
                currentStep={3}
              />
            </GenericSaveAttempt>
          )
        )}
      </MembershipCancellationFlow>
      <MembershipPaymentUpdateFlow path="/payment/membership" currentStep={1}>
        <ConfirmCardUpdate
          path="confirm"
          currentStep={2}
          productType={ProductTypes.membership}
        >
          <PaymentUpdated
            productType={ProductTypes.membership}
            path="updated"
            currentStep={3}
          />
        </ConfirmCardUpdate>
      </MembershipPaymentUpdateFlow>

      {/*TODO change this to use navLinks once we fully mirgrate contributions tab*/}
      <Contributions path="/contributions" />
      <ContributionsCancellationFlow
        path="/cancel/contributions"
        currentStep={1}
      />
      <ContributionsPaymentUpdateFlow
        path="/payment/contributions"
        currentStep={1}
      >
        <ConfirmCardUpdate
          path="confirm"
          currentStep={2}
          productType={ProductTypes.contributions}
        >
          <PaymentUpdated
            productType={ProductTypes.contributions}
            path="updated"
            currentStep={3}
          />
        </ConfirmCardUpdate>
      </ContributionsPaymentUpdateFlow>

      <MembershipFAQs path="/help" />

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
