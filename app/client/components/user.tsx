import { Redirect, Router, ServerLocation } from "@reach/router";
import React from "react";
import {
  hasCancellationFlow,
  hasProductPageRedirect,
  ProductType,
  ProductTypes,
  ProductTypeWithCancellationFlow,
  ProductTypeWithProductPageProperties
} from "../../shared/productTypes";
import {
  hasProductPageProperties,
  ProductTypeWithProductPageRedirect
} from "../../shared/productTypes";
import { injectGlobal } from "../styles/emotion";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { AnalyticsTracker } from "./analytics";
import { CancellationFlow } from "./cancel/cancellationFlow";
import { CancellationReason } from "./cancel/cancellationReason";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
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
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}

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

      {Object.values(ProductTypes).map((productType: ProductType) => (
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
