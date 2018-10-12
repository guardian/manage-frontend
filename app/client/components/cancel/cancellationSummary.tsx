import React from "react";
import { Subscription } from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
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
    <p>{productType.cancellationSummaryMainPara(subscription)}</p>
    <CancellationReasonContext.Consumer>
      {reason =>
        !productType.cancellationOnlyShowSupportSectionIfAlternateText ||
        productType.cancellationSummaryReasonSpecificPara(reason) ? (
          <>
            <p>
              {productType.cancellationSummaryReasonSpecificPara(reason) ||
                "If you are interested in supporting our journalism in other ways, please consider either a contribution or a subscription."}
            </p>
            <div css={{ textAlign: "right" }}>
              <SupportTheGuardianButton
                urlSuffix={productType.cancellationAlternateSupportButtonUrlSuffix(
                  reason
                )}
                alternateButtonText={productType.cancellationAlternateSupportButtonText(
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
