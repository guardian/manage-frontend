import { css, Global } from "@emotion/core";
import { Redirect, Router, ServerLocation } from "@reach/router";
import React from "react";
import {
  GROUPED_PRODUCT_TYPES,
  GroupedProductType,
  hasCancellationFlow,
  hasDeliveryFlow,
  hasDeliveryRecordsFlow,
  PRODUCT_TYPES,
  ProductType,
  ProductTypeWithCancellationFlow,
  ProductTypeWithDeliveryRecordsProperties,
  ProductTypeWithHolidayStopsFlow,
  shouldHaveHolidayStopsFlow
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
import { DeliveryAddressEditConfirmation } from "./delivery/address/deliveryAddressEditConfirmation";
import { DeliveryAddressForm } from "./delivery/address/deliveryAddressForm";
import { DeliveryRecords } from "./delivery/records/deliveryRecords";
import { DeliveryRecordsProblemConfirmation } from "./delivery/records/deliveryRecordsProblemConfirmation";
import { DeliveryRecordsProblemReview } from "./delivery/records/deliveryRecordsProblemReview";

import { AccountOverview } from "./accountoverview/accountOverview";
import { ManageProduct } from "./accountoverview/manageProduct";
import { DeliveryAddressReview } from "./delivery/address/deliveryAddressReview";
import { Help } from "./help";
import { HolidayConfirmed } from "./holiday/holidayConfirmed";
import { HolidayDateChooser } from "./holiday/holidayDateChooser";
import { HolidayReview } from "./holiday/holidayReview";
import { HolidaysOverview } from "./holiday/holidaysOverview";
import { EmailAndMarketing } from "./identity/EmailAndMarketing";
import { PublicProfile } from "./identity/PublicProfile";
import { Settings } from "./identity/Settings";
import { Main } from "./main";
import { ConfirmPaymentUpdate } from "./payment/update/confirmPaymentUpdate";
import { PaymentUpdated } from "./payment/update/paymentUpdated";
import { PaymentUpdateFlow } from "./payment/update/updatePaymentFlow";

const User = () => (
  <Main>
    <Global styles={css(`${global}`)} />
    <Global styles={css(`${fonts}`)} />

    <Router>
      <AccountOverview path="/" />

      {Object.values(GROUPED_PRODUCT_TYPES).map(
        (groupedProductType: GroupedProductType) => (
          <ManageProduct
            key={groupedProductType.urlPart}
            path={"/" + groupedProductType.urlPart}
            groupedProductType={groupedProductType}
          />
        )
      )}
      {Object.values(PRODUCT_TYPES)
        .filter(hasCancellationFlow)
        .map((productType: ProductTypeWithCancellationFlow) => (
          <CancellationFlow
            key={productType.urlPart}
            path={"/cancel/" + productType.urlPart}
            productType={productType}
          >
            {productType.cancellation.reasons.map(
              (reason: CancellationReason) => (
                <GenericSaveAttempt
                  path={reason.reasonId}
                  productType={productType}
                  reason={reason}
                  key={reason.reasonId}
                  linkLabel={reason.linkLabel}
                >
                  <ExecuteCancellation
                    path="confirmed"
                    productType={productType}
                  />
                </GenericSaveAttempt>
              )
            )}
          </CancellationFlow>
        ))}

      {Object.values(PRODUCT_TYPES).map((productType: ProductType) => (
        <PaymentUpdateFlow
          key={productType.urlPart}
          path={"/payment/" + productType.urlPart}
          productType={productType}
        >
          <ConfirmPaymentUpdate path="confirm" productType={productType}>
            <PaymentUpdated path="updated" productType={productType} />
          </ConfirmPaymentUpdate>
        </PaymentUpdateFlow>
      ))}

      {Object.values(PRODUCT_TYPES)
        .filter(shouldHaveHolidayStopsFlow)
        .map((productType: ProductTypeWithHolidayStopsFlow) => (
          <HolidaysOverview
            key={productType.urlPart}
            path={"/suspend/" + productType.urlPart}
            productType={productType}
          >
            <HolidayDateChooser path="create" productType={productType}>
              <HolidayReview path="review" productType={productType}>
                <HolidayConfirmed path="confirmed" productType={productType} />
              </HolidayReview>
            </HolidayDateChooser>
            <HolidayDateChooser
              path="amend"
              productType={productType}
              requiresExistingHolidayStopToAmendInContext
            >
              <HolidayReview path="review" productType={productType}>
                <HolidayConfirmed path="confirmed" productType={productType} />
              </HolidayReview>
            </HolidayDateChooser>
          </HolidaysOverview>
        ))}

      {Object.values(PRODUCT_TYPES)
        .filter(hasDeliveryFlow)
        .map((productType: ProductType) => (
          <DeliveryAddressForm
            key={productType.urlPart}
            path={`/delivery/${productType.urlPart}/address`}
            productType={productType}
          >
            <DeliveryAddressReview path="review" productType={productType}>
              <DeliveryAddressEditConfirmation
                path="confirmed"
                productType={productType}
              />
            </DeliveryAddressReview>
          </DeliveryAddressForm>
        ))}

      {Object.values(PRODUCT_TYPES)
        .filter(hasDeliveryRecordsFlow)
        .map((productType: ProductTypeWithDeliveryRecordsProperties) => (
          <DeliveryRecords
            key={productType.urlPart}
            path={`/delivery/${productType.urlPart}/records`}
            productType={productType}
          >
            <DeliveryRecordsProblemReview
              path="review"
              productType={productType}
            >
              <DeliveryRecordsProblemConfirmation
                path="confirmed"
                productType={productType}
              />
            </DeliveryRecordsProblemReview>
          </DeliveryRecords>
        ))}

      <EmailAndMarketing path="/email-prefs" />

      <PublicProfile path="/public-settings" />

      <Settings path="/account-settings" />

      <Help path="/help" />

      {/* otherwise redirect to root instead of having a "not found page" */}
      <Redirect default={true} to="/" />
    </Router>
    <Router>
      <SuppressConsentBanner path="/payment/*" />
      <ConsentsBanner default={true} />
    </Router>
  </Main>
);

export const ServerUser = (url: string) => (
  <ServerLocation url={url}>
    <User />
  </ServerLocation>
);

export const BrowserUser = (
  <>
    <AnalyticsTracker />
    <User />
  </>
);
