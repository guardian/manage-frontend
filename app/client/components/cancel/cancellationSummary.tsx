import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { Link } from "@reach/router";
import React from "react";
import { ProductDetail, Subscription } from "../../../shared/productResponse";
import {
  hasDeliveryRecordsFlow,
  ProductType
} from "../../../shared/productTypes";
import { GenericErrorScreen } from "../genericErrorScreen";
import { PageContainer } from "../page";
import { ResubscribeThrasher } from "../resubscribeThrasher";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { CancellationReasonContext } from "./cancellationContexts";

const actuallyCancelled = (
  productType: ProductType,
  productDetail: ProductDetail
) => {
  const deliveryRecordsLink: string = `/delivery/${productType.urlPart}/records`;
  return (
    <>
      <PageContainer>
        <h3>Your {productType.friendlyName} is cancelled.</h3>
        {productType.cancellation ? (
          <p>
            {productType.cancellation.summaryMainPara(
              productDetail.subscription
            )}
          </p>
        ) : (
          undefined
        )}
      </PageContainer>
      <ResubscribeThrasher
        usageContext={`${productType.urlPart}_cancellation_summary`}
      >
        <PageContainer>
          {hasDeliveryRecordsFlow(productType) && (
            <p>
              You can still{" "}
              <Link
                css={css`
                  color: ${palette.brand[500]};
                  text-decoration: underline;
                  :visited {
                    color: ${palette.brand[500]};
                  }
                `}
                to={deliveryRecordsLink}
                state={productDetail}
              >
                view your previous deliveries
              </Link>{" "}
              and{" "}
              <Link
                css={css`
                  color: ${palette.brand[500]};
                  text-decoration: underline;
                  :visited {
                    color: ${palette.brand[500]};
                  }
                `}
                to={deliveryRecordsLink}
                state={productDetail}
              >
                report a delivery problem
              </Link>
              .
            </p>
          )}
          <CancellationReasonContext.Consumer>
            {reason =>
              (!productType.cancellation ||
                !productType.cancellation
                  .onlyShowSupportSectionIfAlternateText ||
                productType.cancellation.summaryReasonSpecificPara(reason)) && (
                <>
                  <p>
                    {productType.cancellation &&
                    productType.cancellation.summaryReasonSpecificPara &&
                    productType.cancellation.summaryReasonSpecificPara(reason)
                      ? productType.cancellation.summaryReasonSpecificPara(
                          reason
                        )
                      : "If you are interested in supporting our journalism in other ways, " +
                        "please consider either a contribution or a subscription."}
                  </p>
                  <div css={{ marginBottom: "30px" }}>
                    <SupportTheGuardianButton
                      urlSuffix={
                        productType.cancellation &&
                        productType.cancellation
                          .alternateSupportButtonUrlSuffix &&
                        productType.cancellation.alternateSupportButtonUrlSuffix(
                          reason
                        )
                      }
                      alternateButtonText={
                        productType.cancellation &&
                        productType.cancellation.alternateSupportButtonText &&
                        productType.cancellation.alternateSupportButtonText(
                          reason
                        )
                      }
                      supportReferer={
                        productType.urlPart + "_cancellation_summary"
                      }
                    />
                  </div>
                </>
              )
            }
          </CancellationReasonContext.Consumer>
        </PageContainer>
      </ResubscribeThrasher>
    </>
  );
};

export const isCancelled = (subscription: Subscription) =>
  Object.keys(subscription).length === 0 || subscription.cancelledAt;

export const getCancellationSummary = (productType: ProductType) => (
  productDetail: ProductDetail
) =>
  isCancelled(productDetail.subscription) ? (
    actuallyCancelled(productType, productDetail)
  ) : (
    <GenericErrorScreen
      loggingMessage={
        productType.friendlyName +
        " cancellation call succeeded but subsequent product detail doesn't show as cancelled"
      }
    />
  );
