import { css } from "@emotion/core";
import { brand } from "@guardian/src-foundations/palette";
import { Link } from "@reach/router";
import React from "react";
import { cancellationFormatDate } from "../../../shared/dates";
import { ProductDetail, Subscription } from "../../../shared/productResponse";
import { ProductType } from "../../../shared/productTypes";
import { hasDeliveryRecordsFlow } from "../../productUtils";
import { GenericErrorScreen } from "../genericErrorScreen";
import { ResubscribeThrasher } from "../resubscribeThrasher";
import { SupportTheGuardianButton } from "../supportTheGuardianButton";
import { WithStandardTopMargin } from "../WithStandardTopMargin";
import { hrefStyle } from "./cancellationConstants";
import { CancellationReasonContext } from "./cancellationContexts";
import { CancellationContributionReminder } from "./cancellationContributionReminder";
import {Action, useSuspenseQuery} from "react-fetching-library";
import {getCaseUpdateWithCancelOutcome} from "./stages/executeCancellation";
import {useSWRConfig} from "swr";

const actuallyCancelled = (
  productType: ProductType,
  productDetail: ProductDetail
) => {
  const deliveryRecordsLink: string = `/delivery/${productType.urlPart}/records`;
  const subscription = productDetail.subscription;

  return (
    <>
      <WithStandardTopMargin>
        <h3>Your {productType.friendlyName} is cancelled.</h3>
        {productType.cancellation &&
          !productType.cancellation.shouldHideSummaryMainPara && (
            <p>
              {productType.cancellation?.alternateSummaryMainPara ||
                (subscription.end ? (
                  <>
                    You will continue to receive the benefits of your{" "}
                    {productType.friendlyName} until{" "}
                    <b>
                      {cancellationFormatDate(
                        subscription.cancellationEffectiveDate
                      )}
                    </b>
                    . You will not be charged again. If you think you’re owed a
                    refund, please contact us at{" "}
                    <a
                      css={hrefStyle}
                      href="mailto:customer.help@theguardian.com"
                    >
                      customer.help@theguardian.com
                    </a>
                    .
                  </>
                ) : (
                  "Your cancellation is effective immediately."
                ))}
            </p>
          )}
      </WithStandardTopMargin>
      {productType.cancellation?.shouldShowReminder && (
        <CancellationContributionReminder />
      )}

      {!productType.cancellation?.shouldHideThrasher && (
        <ResubscribeThrasher
          usageContext={`${productType.urlPart}_cancellation_summary`}
        >
          <WithStandardTopMargin>
            {hasDeliveryRecordsFlow(productType) && (
              <p>
                You can still{" "}
                <Link
                  css={css`
                    color: ${brand[500]};
                    text-decoration: underline;
                    :visited {
                      color: ${brand[500]};
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
                    color: ${brand[500]};
                    text-decoration: underline;
                    :visited {
                      color: ${brand[500]};
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
                  productType.cancellation.summaryReasonSpecificPara(
                    reason
                  )) && (
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
          </WithStandardTopMargin>
        </ResubscribeThrasher>
      )}
    </>
  );
};

export const isCancelled = (subscription: Subscription) =>
  Object.keys(subscription).length === 0 || subscription.cancelledAt;

interface CancellationSummaryProps {
  productType: ProductType;
  productDetail: ProductDetail;
  caseId: string | "";
  fetch?: boolean;
}

export const CancellationSummary = (props: CancellationSummaryProps) => {
  const { productDetail, productType, caseId, fetch } = props;

  // we don't always call the patch endpoint so using this hook conditionally
  useSuspenseQuery(fetch ? getCaseUpdateWithCancelOutcome(caseId, productDetail) : null as unknown as Action<unknown>);
  const { mutate } = useSWRConfig();

  if(fetch) {
    mutate('/api/case/')
  }

  return isCancelled(productDetail.subscription) ? (
    actuallyCancelled(productType, productDetail)
  ) : (
    <GenericErrorScreen
      loggingMessage={
        productType.friendlyName +
        " cancellation call succeeded but subsequent product detail doesn't show as cancelled"
      }
    />
  );
}
