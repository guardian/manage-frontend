import * as React from "react";
import {
  DirectDebitDetails,
  Subscription
} from "../../../../../shared/productResponse";
import { DirectDebitDisplay } from "../../directDebitDisplay";
import { NewPaymentMethodDetail } from "../newPaymentMethodDetail";

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

  private readonly ddDetail: DirectDebitDetails;

  constructor(ddDetail: DirectDebitDetails) {
    this.ddDetail = ddDetail;
  }

  public readonly detailToPayloadObject = () => this.ddDetail;

  public readonly matchesResponse = (response: DirectDebitDetails) =>
    response.accountNumber === this.ddDetail.accountNumber &&
    response.accountName === this.ddDetail.accountName &&
    response.sortCode === this.ddDetail.sortCode;

  public readonly render = (subscription?: Subscription) =>
    isSubscriptionWithMandate(subscription) ? (
      <DirectDebitDisplay {...subscription.mandate} />
    ) : (
      <DirectDebitDisplay {...this.ddDetail} />
    );
}
