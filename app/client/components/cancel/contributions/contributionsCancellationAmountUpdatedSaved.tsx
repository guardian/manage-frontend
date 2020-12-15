import { useLocation } from "@reach/router";
import React from "react";
import { formatDateStr } from "../../../../shared/dates";
import {
  isPaidSubscriptionPlan,
  MembersDataApiItemContext
} from "../../../../shared/productResponse";
import { getMainPlan, isProduct } from "../../../../shared/productResponse";

const getUrlParameter = (search: string, name: string): string => {
  const nameForRegex = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + nameForRegex + "=([^&#]*)");
  const results = regex.exec(search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const ContributionsCancellationAmountUpdatedSaved: React.FC = () => {
  const location = useLocation();
  const amount = Number(getUrlParameter(location.search, "updatedAmount"));

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
              {amount.toFixed(2)}, will be taken on{" "}
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
