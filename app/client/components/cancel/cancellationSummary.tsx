import React from "react";
import { Subscription } from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { GenericErrorScreen } from "../genericErrorScreen";
import { PageContainer } from "../page";
import { ResubscribeThrasher } from "../resubscribeThrasher";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { CancellationReasonContext } from "./cancellationContexts";

const actuallyCancelled = (
  productType: ProductType,
  subscription: Subscription
) => (
  <>
    <PageContainer>
      <h3>Your {productType.friendlyName} is cancelled.</h3>
      {productType.cancellation ? (
        <p>{productType.cancellation.summaryMainPara(subscription)}</p>
      ) : (
        undefined
      )}
    </PageContainer>
    <ResubscribeThrasher
      usageContext={`${productType.urlPart}_cancellation_summary`}
    >
      <PageContainer>
        <CancellationReasonContext.Consumer>
          {reason =>
            !productType.cancellation ||
            !productType.cancellation.onlyShowSupportSectionIfAlternateText ||
            productType.cancellation.summaryReasonSpecificPara(reason) ? (
              <>
                <p>
                  {productType.cancellation &&
                  productType.cancellation.summaryReasonSpecificPara &&
                  productType.cancellation.summaryReasonSpecificPara(reason)
                    ? productType.cancellation.summaryReasonSpecificPara(reason)
                    : "If you are interested in supporting our journalism in other ways, " +
                      "please consider either a contribution or a subscription."}
                </p>
                <div css={{ marginBottom: "30px" }}>
                  <SupportTheGuardianButton
                    urlSuffix={
                      productType.cancellation &&
                      productType.cancellation.alternateSupportButtonUrlSuffix
                        ? productType.cancellation.alternateSupportButtonUrlSuffix(
                            reason
                          )
                        : undefined
                    }
                    alternateButtonText={
                      productType.cancellation &&
                      productType.cancellation.alternateSupportButtonText
                        ? productType.cancellation.alternateSupportButtonText(
                            reason
                          )
                        : undefined
                    }
                    supportReferer={
                      productType.urlPart + "_cancellation_summary"
                    }
                  />
                </div>
              </>
            ) : (
              undefined
            )
          }
        </CancellationReasonContext.Consumer>
      </PageContainer>
    </ResubscribeThrasher>
  </>
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
