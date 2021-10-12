import { css, Global } from "@emotion/core";
import { Redirect, Router } from "@reach/router";
import React, { lazy, Suspense } from "react";
import {
  GROUPED_PRODUCT_TYPES,
  GroupedProductType,
  PRODUCT_TYPES,
  ProductType,
  ProductTypeWithDeliveryRecordsProperties,
  ProductTypeWithHolidayStopsFlow
} from "../../shared/productTypes";
import {
  hasCancellationFlow,
  hasDeliveryFlow,
  hasDeliveryRecordsFlow,
  shouldHaveHolidayStopsFlow
} from "../productUtils";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import { CancellationReason } from "./cancel/cancellationReason";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
import { SavedCancellation } from "./cancel/stages/savedCancellation";
import { CMPBanner } from "./consent/CMPBanner";
import { DeliveryAddressEditConfirmation } from "./delivery/address/deliveryAddressEditConfirmation";
import { DeliveryAddressReview } from "./delivery/address/deliveryAddressReview";
import { DeliveryRecordsProblemConfirmation } from "./delivery/records/deliveryRecordsProblemConfirmation";
import { DeliveryRecordsProblemReview } from "./delivery/records/deliveryRecordsProblemReview";
import { HolidayConfirmed } from "./holiday/holidayConfirmed";
import { HolidayDateChooser } from "./holiday/holidayDateChooser";
import { HolidayReview } from "./holiday/holidayReview";
import { Main } from "./main";
import MMAPageSkeleton from "./MMAPageSkeleton";
import { ConfirmPaymentUpdate } from "./payment/update/confirmPaymentUpdate";
import { PaymentUpdated } from "./payment/update/paymentUpdated";
import { ScrollToTop } from "./scrollToTop";
import { ClientContextProvider } from "react-fetching-library";
import { fetchClient} from "../fetchClient";
// The code below uses magic comments to instruct Webpack on
// how to name the chunks these dynamic imports produce
// More information: https://webpack.js.org/api/module-methods/#magic-comments

const AccountOverview = lazy(() =>
  import(
    /* webpackChunkName: "AccountOverview" */ "./accountoverview/accountOverview"
  )
);
const Billing = lazy(() =>
  import(/* webpackChunkName: "Billing" */ "./billing/billing")
);
const ManageProduct = lazy(() =>
  import(
    /* webpackChunkName: "ManageProduct" */ "./accountoverview/manageProduct"
  )
);
const CancellationFlow = lazy(() =>
  import(/* webpackChunkName: "CancellationFlow" */ "./cancel/cancellationFlow")
);
const PaymentUpdateFlow = lazy(() =>
  import(
    /* webpackChunkName: "PaymentUpdateFlow" */ "./payment/update/updatePaymentFlow"
  )
);
const HolidaysOverview = lazy(() =>
  import(
    /* HolidaysOverview: "holidaysoverview" */ "./holiday/holidaysOverview"
  )
);
const DeliveryAddressForm = lazy(() =>
  import(
    /* webpackChunkName: "DeliveryAddressForm" */ "./delivery/address/deliveryAddressForm"
  )
);
const DeliveryRecords = lazy(() =>
  import(
    /* webpackChunkName: "DeliveryRecords" */ "./delivery/records/deliveryRecords"
  )
);
const EmailAndMarketing = lazy(() =>
  import(
    /* webpackChunkName: "EmailAndMarketing" */ "./identity/EmailAndMarketing"
  )
);
const PublicProfile = lazy(() =>
  import(/* webpackChunkName: "PublicProfile" */ "./identity/PublicProfile")
);
const Settings = lazy(() =>
  import(/* webpackChunkName: "Settings" */ "./identity/Settings")
);
const Help = lazy(() => import(/* webpackChunkName: "Help" */ "./help"));
const CancelReminders = lazy(() =>
  import(/* webpackChunkName: "CancelReminders" */ "./cancelReminders")
);

const MMARouter = () => (
    <ClientContextProvider client={fetchClient}>
  <Main>
    <Global styles={css(`${global}`)} />
    <Global styles={css(`${fonts}`)} />
    <Suspense fallback={<MMAPageSkeleton />}>
      <Router primary={true} css={{ height: "100%" }}>
        <AccountOverview path="/" />
        <Billing path="/billing" />

        {Object.values(GROUPED_PRODUCT_TYPES).map(
          (groupedProductType: GroupedProductType) => (
            <ManageProduct
              key={groupedProductType.urlPart}
              path={"/" + groupedProductType.urlPart}
              groupedProductType={groupedProductType}
            />
          )
        )}
        {Object.values(PRODUCT_TYPES).map((productType: ProductType) => (
          <CancellationFlow
            key={productType.urlPart}
            path={"/cancel/" + productType.urlPart}
            productType={productType}
          >
            {hasCancellationFlow(productType) &&
              productType.cancellation.reasons.map(
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
                    {!!reason.savedBody && (
                      <SavedCancellation
                        path="saved"
                        reason={reason}
                        productType={productType}
                      />
                    )}
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
                  <HolidayConfirmed
                    path="confirmed"
                    productType={productType}
                  />
                </HolidayReview>
              </HolidayDateChooser>
              <HolidayDateChooser
                path="amend"
                productType={productType}
                requiresExistingHolidayStopToAmendInContext
              >
                <HolidayReview path="review" productType={productType}>
                  <HolidayConfirmed
                    path="confirmed"
                    productType={productType}
                  />
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

        <Redirect default from="/*" to="/" noThrow />

        {/*Does not require sign in*/}
        <CancelReminders path="/cancel-reminders/*reminderCode" />
      </Router>
    </Suspense>
  </Main>
    </ClientContextProvider>
);

export const MMAPage = (
  <>
    <AnalyticsTracker />
    <MMARouter />
    <CMPBanner />
    <ScrollToTop />
  </>
);
