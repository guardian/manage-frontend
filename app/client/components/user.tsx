import { css, Global } from "@emotion/core";
import { Redirect, Router } from "@reach/router";
import React, { lazy, Suspense } from "react";
import {
  GROUPED_PRODUCT_TYPES,
  GroupedProductType,
  hasCancellationFlow,
  hasDeliveryFlow,
  hasDeliveryRecordsFlow,
  PRODUCT_TYPES,
  ProductType,
  ProductTypeWithDeliveryRecordsProperties,
  ProductTypeWithHolidayStopsFlow,
  shouldHaveHolidayStopsFlow
} from "../../shared/productTypes";
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
import PageSkeleton from "./pageSkeleton";
import { ConfirmPaymentUpdate } from "./payment/update/confirmPaymentUpdate";
import { PaymentUpdated } from "./payment/update/paymentUpdated";
import { ScrollToTop } from "./scrollToTop";

const AccountOverview = lazy(() => import("./accountoverview/accountOverview"));
const Billing = lazy(() => import("./billing/billing"));
const ManageProduct = lazy(() => import("./accountoverview/manageProduct"));
const CancellationFlow = lazy(() => import("./cancel/cancellationFlow"));
const PaymentUpdateFlow = lazy(() =>
  import("./payment/update/updatePaymentFlow")
);
const HolidaysOverview = lazy(() => import("./holiday/holidaysOverview"));
const DeliveryAddressForm = lazy(() =>
  import("./delivery/address/deliveryAddressForm")
);
const DeliveryRecords = lazy(() =>
  import("./delivery/records/deliveryRecords")
);
const EmailAndMarketing = lazy(() => import("./identity/EmailAndMarketing"));
const PublicProfile = lazy(() => import("./identity/PublicProfile"));
const Settings = lazy(() => import("./identity/Settings"));
const Help = lazy(() => import("./help"));
const HelpCentre = lazy(() => import("./helpCentre/helpCentre"));
const ContactUs = lazy(() => import("./contactUs/contactUs"));

const User = () => (
  <Main>
    <Global styles={css(`${global}`)} />
    <Global styles={css(`${fonts}`)} />
    {/* replace with a real fallback component */}
    <Suspense fallback={<PageSkeleton />}>
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
        <HelpCentre path="/help-centre" />

        <ContactUs path="/contact-us" />
        <ContactUs path="/contact-us/:urlTopicId" />
        <ContactUs path="/contact-us/:urlTopicId/:urlSubTopicId" />
        <ContactUs path="/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId" />
        <ContactUs path="/contact-us/:urlTopicId/:urlSubTopicId/:urlSubSubTopicId/:urlSuccess" />

        {/* otherwise redirect to root instead of having a "not found page" */}
        <Redirect default from="/*" to="/" noThrow />
      </Router>
    </Suspense>
  </Main>
);

export const BrowserUser = (
  <>
    <AnalyticsTracker />
    <User />
    <CMPBanner />
    <ScrollToTop />
  </>
);
