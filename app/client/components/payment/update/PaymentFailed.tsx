import React from "react";
import {
  isProduct,
  MembersDataApiItemContext,
} from "../../../../shared/productResponse";
import {
  RouteableStepProps,
  visuallyNavigateToParent,
} from "../../wizardRouterAdapter";
import { css } from "@emotion/core";
import { neutral, brand } from "@guardian/src-foundations/palette";
import { space } from "@guardian/src-foundations";
import { minWidth } from "../../../styles/breakpoints";
import { Button } from "@guardian/src-button";
import {
  isNewPaymentMethodDetail,
  NewPaymentMethodContext,
} from "./newPaymentMethodDetail";
import { CallCentreNumbers } from "../../callCentreNumbers";
import { textSans } from "@guardian/src-foundations/typography";

export default function PaymentFailed(props: RouteableStepProps) {
  return (
    <MembersDataApiItemContext.Consumer>
      {(previousProductDetail) => (
        <NewPaymentMethodContext.Consumer>
          {(newPaymentMethodDetail) =>
            isNewPaymentMethodDetail(newPaymentMethodDetail) &&
            isProduct(previousProductDetail) ? (
              <>
                <div
                  css={css`
                    border-top: 1px solid ${neutral["86"]};
                    text-align: left;
                    margin-top: ${space[9]}px;
                    margin-bottom: ${space[6]}px;
                    ${textSans.medium()}
                  `}
                >
                  <p
                    css={css`
                      padding-top: ${space[1]}px;
                    `}
                  >
                    Sorry, the {newPaymentMethodDetail.friendlyName} update
                    failed.
                    <br />
                    To try again please go back and re-enter your new{" "}
                    {newPaymentMethodDetail.friendlyName} details.
                  </p>
                </div>
                <Button
                  priority="primary"
                  onClick={() => visuallyNavigateToParent(props)}
                  icon={
                    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 15.95h19.125l-7.5 8.975.975.975 10.425-10.45v-1L16.6 4l-.975.975 7.5 8.975H4v2z"
                      />
                    </svg>
                  }
                  iconSide="right"
                >
                  Try again
                </Button>
                <div
                  css={css`
                    border-top: 1px solid ${neutral[86]};
                    ${textSans.medium()};
                    color: ${neutral[46]};
                    padding-top: ${space[4]}px;
                    margin-top: ${space[6]}px;

                    a {
                      color: ${brand[500]};
                    }

                    ${minWidth.tablet} {
                      padding-top: ${space[9]}px;
                      margin-top: ${space[9]}px;
                    }
                  `}
                >
                  <CallCentreNumbers prefixText="Alternatively, to contact us" />
                </div>
              </>
            ) : (
              visuallyNavigateToParent(props)
            )
          }
        </NewPaymentMethodContext.Consumer>
      )}
    </MembersDataApiItemContext.Consumer>
  );
}
