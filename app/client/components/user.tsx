import { Router, ServerLocation } from "@reach/router";
import React from "react";
import { ProductTypes } from "../../shared/productTypes";
import { injectGlobal } from "../styles/emotion";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import { CancellationFlow } from "./cancel/cancellationFlow";
import { CancellationReason } from "./cancel/cancellationReason";
import { ContributionsCancellationFlow } from "./cancel/contributions/contributionsCancellationFlow";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
import { Main } from "./main";
import { MembershipFAQs } from "./membershipFAQs";
import { navLinks } from "./nav";
import { NotFound } from "./notFound";
import { ConfirmCardUpdate } from "./payment/update/confirmCardUpdate";
import { PaymentUpdated } from "./payment/update/paymentUpdated";
import { PaymentUpdateFlow } from "./payment/update/updatePaymentFlow";
import { ProductPage } from "./productPage";
import { RedirectOnMeResponse } from "./redirectOnMeResponse";

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}

    <Router>
      <RedirectOnMeResponse path="/" />

      {/*TODO map over ProductTypes to produce all the routes for a product (after implementing contributions cancellation flow*/}

      <ProductPage
        path={navLinks.membership.link}
        productType={ProductTypes.membership}
      />
      <CancellationFlow
        path="/cancel/membership"
        productType={ProductTypes.membership}
        currentStep={1}
      >
        {ProductTypes.membership.cancellationReasons.map(
          (reason: CancellationReason) => (
            <GenericSaveAttempt
              path={reason.reasonId}
              productType={ProductTypes.membership}
              reason={reason}
              key={reason.reasonId}
              linkLabel={reason.linkLabel}
              currentStep={2}
            >
              <ExecuteCancellation
                path="confirmed"
                cancelApiUrlSuffix="membership"
                cancelType="membership"
                productType={ProductTypes.membership}
                currentStep={3}
              />
            </GenericSaveAttempt>
          )
        )}
      </CancellationFlow>
      <PaymentUpdateFlow
        path="/payment/membership"
        productType={ProductTypes.membership}
        currentStep={1}
      >
        <ConfirmCardUpdate
          path="confirm"
          productType={ProductTypes.membership}
          currentStep={2}
        >
          <PaymentUpdated
            path="updated"
            productType={ProductTypes.membership}
            currentStep={3}
          />
        </ConfirmCardUpdate>
      </PaymentUpdateFlow>

      {/*TODO change this to use navLinks once we fully migrate contributions tab*/}
      <ProductPage
        path="/contributions"
        productType={ProductTypes.contributions}
      />
      <ContributionsCancellationFlow // TODO replace with generic CancellationFlow
        path="/cancel/contributions"
        productType={ProductTypes.contributions}
        currentStep={1}
      />
      <PaymentUpdateFlow
        path="/payment/contributions"
        productType={ProductTypes.contributions}
        currentStep={1}
      >
        <ConfirmCardUpdate
          path="confirm"
          productType={ProductTypes.contributions}
          currentStep={2}
        >
          <PaymentUpdated
            path="updated"
            productType={ProductTypes.contributions}
            currentStep={3}
          />
        </ConfirmCardUpdate>
      </PaymentUpdateFlow>

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
