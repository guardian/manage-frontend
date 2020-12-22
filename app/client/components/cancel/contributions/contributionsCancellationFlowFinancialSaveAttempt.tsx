import { css } from "@emotion/core";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";
import { navigate } from "@reach/router";
import React, { useState } from "react";
import {
  isPaidSubscriptionPlan,
  MembersDataApiItemContext
} from "../../../../shared/productResponse";
import { getMainPlan, isProduct } from "../../../../shared/productResponse";
import { PRODUCT_TYPES } from "../../../../shared/productTypes";
import { ContributionUpdateAmountForm } from "../../accountoverview/contributionUpdateAmountForm";

const container = css`
  & > * + * {
    margin-top: ${space[6]}px;
`;

const ContributionsCancellationFlowFinancialSaveAttempt: React.FC = () => {
  const [showAmountUpdateForm, setShowUpdateForm] = useState(false);

  const onUpdateConfirmed = (updatedAmount: number) => {
    navigate(`mma_financial_circumstances/saved`, { state: { updatedAmount } });
  };

  const onReduceClicked = () => {
    setShowUpdateForm(true);
  };

  const onCancelClicked = () => {
    navigate(`mma_financial_circumstances/confirmed`);
  };

  return (
    <MembersDataApiItemContext.Consumer>
      {productDetail => {
        if (!isProduct(productDetail)) {
          return null;
        }

        const mainPlan = getMainPlan(productDetail.subscription);

        if (!isPaidSubscriptionPlan(mainPlan)) {
          return null;
        }

        return (
          <div css={container}>
            <div>
              Did you know that you can reduce the size of your contribution
              rather than cancelling it? Simply select a new amount and we’ll do
              the rest.
            </div>

            {showAmountUpdateForm ? (
              <ContributionUpdateAmountForm
                currentAmount={mainPlan.amount / 100}
                subscriptionId={productDetail.subscription.subscriptionId}
                mainPlan={mainPlan}
                productType={PRODUCT_TYPES.contributions}
                nextPaymentDate={productDetail.subscription.nextPaymentDate}
                onUpdateConfirmed={onUpdateConfirmed}
              />
            ) : (
              <div
                css={css`
                  & > * + * {
                    margin-left: ${space[4]}px;
                  }
                `}
              >
                <Button onClick={onReduceClicked}>Reduce amount</Button>

                <Button onClick={onCancelClicked} priority="subdued">
                  I still want to cancel
                </Button>
              </div>
            )}
          </div>
        );
      }}
    </MembersDataApiItemContext.Consumer>
  );
};

export default ContributionsCancellationFlowFinancialSaveAttempt;
