import React from "react";
import { oc } from "ts-optchain";
import { Subscription } from "../../../shared/productResponse";
import {
  ProductType,
  ProductTypeWithCancellationFlow
} from "../../../shared/productTypes";
import { GenericErrorScreen } from "../genericErrorScreen";
import { PageContainerSection } from "../page";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { CancellationReasonContext } from "./cancellationContexts";

const actuallyCancelled = (
  productType: ProductType,
  subscription: Subscription
) => (
  <PageContainerSection>
    <h3>Your {productType.friendlyName} is cancelled.</h3>
    {productType.cancellation ? (
      <p>{productType.cancellation.summaryMainPara(subscription)}</p>
    ) : (
      undefined
    )}
    <CancellationReasonContext.Consumer>
      {reason =>
        !productType.cancellation ||
        !productType.cancellation.onlyShowSupportSectionIfAlternateText ||
        productType.cancellation.summaryReasonSpecificPara(reason) ? (
          <>
            <p>
              {oc(productType).cancellation.summaryReasonSpecificPara(
                () => undefined
              )(reason) ||
                "If you are interested in supporting our journalism in other ways, " +
                  "please consider either a contribution or a subscription."}
            </p>
            <div css={{ marginBottom: "30px" }}>
              <SupportTheGuardianButton
                urlSuffix={oc(
                  productType
                ).cancellation.alternateSupportButtonUrlSuffix(() => undefined)(
                  reason
                )}
                alternateButtonText={oc(
                  productType
                ).cancellation.alternateSupportButtonText(() => undefined)(
                  reason
                )}
                supportReferer={productType.urlPart + "_cancellation_summary"}
              />
            </div>
          </>
        ) : (
          undefined
        )
      }
    </CancellationReasonContext.Consumer>
  </PageContainerSection>
);

export const isCancelled = (subscription: Subscription) =>
  Object.keys(subscription).length === 0 || subscription.cancelledAt;

export const getCancellationSummary = (productType: ProductType) => (
  subscription: Subscription
) =>
  isCancelled(subscription) ? (
    actuallyCancelled(productType, subscription)
  ) : (
    <GenericErrorScreen
      loggingMessage={
        productType.friendlyName +
        " cancellation call succeeded but subsequent product detail doesn't show as cancelled"
      }
    />
  );
