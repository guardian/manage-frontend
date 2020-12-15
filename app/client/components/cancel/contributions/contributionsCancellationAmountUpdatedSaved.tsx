import React from "react";
import { formatDateStr } from "../../../../shared/dates";
import {
  isPaidSubscriptionPlan,
  MembersDataApiItemContext
} from "../../../../shared/productResponse";
import { getMainPlan, isProduct } from "../../../../shared/productResponse";

const ContributionsCancellationAmountUpdatedSaved: React.FC = () => {
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

        if (!productDetail.subscription.nextPaymentDate) {
          return null;
        }

        return (
          <>
            <h3>Thank you for updating your contribution</h3>
            <p>
              We have successfully updated the amount of your contribution. New
              amount, {mainPlan.currency}
              {mainPlan.amount / 100}, will be taken on{" "}
              {formatDateStr(productDetail.subscription.nextPaymentDate)}. Thank
              you for supporting the Guardian.
            </p>
          </>
        );
      }}
    </MembersDataApiItemContext.Consumer>
  );
};

export default ContributionsCancellationAmountUpdatedSaved;
