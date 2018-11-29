import * as React from "react";
import {
  DirectDebitDetails,
  Subscription
} from "../../../../../shared/productResponse";
import { maxWidth, minWidth } from "../../../../styles/breakpoints";
import { cleanSortCode, DirectDebitDisplay } from "../../directDebitDisplay";
import { CONFIRM_BUTTON_TEXT } from "../confirmPaymentUpdate";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";
import { DirectDebitLegalPre } from "./directDebitLegalPre";

export interface SubscriptionWithMandate extends Subscription {
  mandate: DirectDebitDetails;
}

function isSubscriptionWithMandate(
  subscription?: Subscription
): subscription is SubscriptionWithMandate {
  return subscription !== undefined && subscription.mandate !== undefined;
}

export class NewDirectDebitPaymentMethodDetail
  implements NewPaymentMethodDetail {
  public readonly apiUrlPart = "dd";
  public readonly name = "direct_debit";
  public readonly friendlyName = "direct debit";

  public readonly subHasExpectedPaymentType = isSubscriptionWithMandate;

  public readonly extraConfirmElement = (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        textAlign: "left",
        [maxWidth.tablet]: {
          flexDirection: "column"
        }
      }}
    >
      <DirectDebitLegalPre />
      <div
        css={{
          [minWidth.tablet]: {
            marginLeft: "20px"
          }
        }}
      >
        <h3>Declaration</h3>
        <p>
          I have confirmed that I am the account holder and that I am solely
          able to authorise debit from the account.
        </p>
        <p>
          If the details above are correct press '{CONFIRM_BUTTON_TEXT}' to set
          up your direct debit, otherwise press 'Back' to make changes.
        </p>
      </div>
    </div>
  );

  private readonly ddDetail: DirectDebitDetails;

  constructor(ddDetail: DirectDebitDetails) {
    this.ddDetail = ddDetail;
  }

  public readonly detailToPayloadObject = () => this.ddDetail;

  public readonly matchesResponse = (response: DirectDebitDetails) =>
    response.accountNumber === this.ddDetail.accountNumber &&
    response.accountName === this.ddDetail.accountName &&
    response.sortCode === cleanSortCode(this.ddDetail.sortCode);

  public readonly render = (subscription?: Subscription) =>
    isSubscriptionWithMandate(subscription) ? (
      <DirectDebitDisplay {...subscription.mandate} />
    ) : (
      <DirectDebitDisplay {...this.ddDetail} showAccountName />
    );
}
