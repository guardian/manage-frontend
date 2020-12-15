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
    navigate(
      `mma_financial_circumstances/saved?updatedAmount=${updatedAmount}`
    );
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
              <div>
                <Button onClick={() => setShowUpdateForm(true)}>
                  Reduce amount
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
