import { css, Global } from "@emotion/core";
import { Redirect, Router, ServerLocation } from "@reach/router";
import React from "react";
import {
  hasCancellationFlow,
  hasProductPageRedirect,
  ProductType,
  ProductTypes,
  ProductTypeWithCancellationFlow,
  ProductTypeWithHolidayStopsFlow,
  ProductTypeWithProductPageProperties,
  shouldCreatePaymentUpdateFlow,
  shouldHaveHolidayStopsFlow
} from "../../shared/productTypes";
import {
  hasProductPageProperties,
  ProductTypeWithProductPageRedirect
} from "../../shared/productTypes";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import { CancellationFlow } from "./cancel/cancellationFlow";
import { CancellationReason } from "./cancel/cancellationReason";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
import {
  ConsentsBanner,
  SuppressConsentBanner
} from "./consent/consentsBanner";
import { HolidayConfirmed } from "./holiday/holidayConfirmed";
import { HolidayDateChooser } from "./holiday/holidayDateChooser";
import { HolidayReview } from "./holiday/holidayReview";
import { HolidaysOverview } from "./holiday/holidaysOverview";
import { AccountDetails } from "./identity/AccountDetails";
import { EmailAndMarketing } from "./identity/EmailAndMarketing";
import { PublicProfile } from "./identity/PublicProfile";
import { Main } from "./main";
import { MembershipFAQs } from "./membershipFAQs";
import { NotFound } from "./notFound";
import { ConfirmPaymentUpdate } from "./payment/update/confirmPaymentUpdate";
import { PaymentUpdated } from "./payment/update/paymentUpdated";
import { PaymentUpdateFlow } from "./payment/update/updatePaymentFlow";
import { ProductPage } from "./productPage";
import { RedirectOnMeResponse } from "./redirectOnMeResponse";

const User = () => (
  <Main>
    <Global styles={css(`${global}`)} />
    <Global styles={css(`${fonts}`)} />

    <Router>
      <RedirectOnMeResponse path="/" />

      {Object.values(ProductTypes)
        .filter(hasProductPageProperties)
        .map((productType: ProductTypeWithProductPageProperties) => (
          <ProductPage
            key={productType.urlPart}
            path={"/" + productType.urlPart}
            productType={productType}
          />
        ))}
      {Object.values(ProductTypes)
        .filter(hasProductPageRedirect)
        .map((productType: ProductTypeWithProductPageRedirect) => (
          <Redirect
            key={productType.urlPart}
            from={"/" + productType.urlPart}
            to={"/" + productType.productPage}
            noThrow
          />
        ))}
      {Object.values(ProductTypes)
        .filter(hasCancellationFlow)
        .map((productType: ProductTypeWithCancellationFlow) => (
          <CancellationFlow
            key={productType.urlPart}
            path={"/cancel/" + productType.urlPart}
            productType={productType}
            currentStep={1}
          >
            {productType.cancellation.reasons.map(
              (reason: CancellationReason) => (
                <GenericSaveAttempt
                  path={reason.reasonId}
                  productType={productType}
                  reason={reason}
                  key={reason.reasonId}
                  linkLabel={reason.linkLabel}
                  currentStep={2}
                >
                  <ExecuteCancellation
                    path="confirmed"
                    productType={productType}
                    currentStep={3}
                  />
                </GenericSaveAttempt>
              )
            )}
          </CancellationFlow>
        ))}

      {Object.values(ProductTypes)
        .filter(shouldCreatePaymentUpdateFlow)
        .map((productType: ProductType) => (
          <PaymentUpdateFlow
            key={productType.urlPart}
            path={"/payment/" + productType.urlPart}
            productType={productType}
            currentStep={1}
          >
            <ConfirmPaymentUpdate
              path="confirm"
              productType={productType}
              currentStep={2}
            >
              <PaymentUpdated
                path="updated"
                productType={productType}
                currentStep={3}
              />
            </ConfirmPaymentUpdate>
          </PaymentUpdateFlow>
        ))}

      {Object.values(ProductTypes)
        .filter(shouldHaveHolidayStopsFlow)
        .map((productType: ProductTypeWithHolidayStopsFlow) => (
          <HolidaysOverview
            key={productType.urlPart}
            path={"/suspend/" + productType.urlPart}
            productType={productType}
            currentStep={0}
          >
            <HolidayDateChooser
              path="create"
              productType={productType}
              currentStep={1}
            >
              <HolidayReview
                path="review"
                productType={productType}
                currentStep={2}
              >
                <HolidayConfirmed
                  path="confirmed"
                  productType={productType}
                  currentStep={3}
                />
              </HolidayReview>
            </HolidayDateChooser>
            <HolidayDateChooser
              path="amend"
              productType={productType}
              currentStep={1}
              requiresExistingHolidayStopToAmendInContext
            >
              <HolidayReview
                path="review"
                productType={productType}
                currentStep={2}
              >
                <HolidayConfirmed
                  path="confirmed"
                  productType={productType}
                  currentStep={3}
                />
              </HolidayReview>
            </HolidayDateChooser>
          </HolidaysOverview>
        ))}

      <MembershipFAQs path="/help" />

      <EmailAndMarketing path="/email-prefs" />

      <PublicProfile path="/public-settings" />

      <AccountDetails path="/account-settings" />

      <NotFound default={true} />
    </Router>
    <Router>
      <SuppressConsentBanner path="/payment/*" />
      <ConsentsBanner default={true} />
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
