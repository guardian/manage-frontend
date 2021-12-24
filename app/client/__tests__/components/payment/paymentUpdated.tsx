import React from "react";
import { render } from "@testing-library/react";
import { Subscription } from "../../../../shared/productResponse";
import {
  ConfirmedNewPaymentDetailsRenderer,
  PaymentMethodUpdated,
} from "../../../components/payment/update/paymentUpdated";
import { NewPaymentMethodDetail } from "../../../components/payment/update/newPaymentMethodDetail";
import {
  guardianWeeklyCard,
  guardianWeeklySubscriptionCard,
  digitalDD,
  digitalSubscriptionDD,
  guardianWeeklyExpiredCard,
} from "../../../testData";

// mock functions for NewPaymentMethodDetail type
const matchesResponse = (_: any) => true;
const subHasExpectedPaymentType = (_?: Subscription) => true;
const detailToPayloadObject = () => {
  return {};
};
const newPaymentMethodDetailRender = () => <></>;
const confirmButtonWrapper = () => <></>;

const failureMessage =
  "We will take the outstanding payment within 24 hours, using your new card details.";

const newPaymentMethodDetailCard: NewPaymentMethodDetail = {
  apiUrlPart: "card",
  name: "card",
  friendlyName: "payment card",
  paymentFailureRecoveryMessage: failureMessage,
  matchesResponse,
  subHasExpectedPaymentType,
  render: newPaymentMethodDetailRender,
  detailToPayloadObject,
  confirmButtonWrapper,
  /* add the following property as a new type, look at members-data-api to see if we use a default response from Stripe or build our own

    "stripePaymentMethod": {
        "id": "pm_0K1vCEItVxyc3Q6ndAt3Sc4l",
        "object": "payment_method",
        "billing_details": {
            "address": {
                "city": null,
                "country": null,
                "line1": null,
                "line2": null,
                "postal_code": null,
                "state": null
            },
            "email": "jon.flynn+code@guardian.co.uk",
            "name": "jon.flynn+code@guardian.co.uk",
            "phone": null
        },
        "card": {
            "brand": "visa",
            "checks": {
                "address_line1_check": null,
                "address_postal_code_check": null,
                "cvc_check": null
            },
            "country": "US",
            "exp_month": 4,
            "exp_year": 2024,
            "funding": "credit",
            "generated_from": null,
            "last4": "4242",
            "networks": {
                "available": [
                    "visa"
                ],
                "preferred": null
            },
            "three_d_secure_usage": {
                "supported": true
            },
            "wallet": null
        },
        "created": 1638374294,
        "customer": null,
        "livemode": false,
        "type": "card"
    },
    "stripePublicKeyForUpdate": "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f"
    */
};

const newPaymentMethodDetailDD: NewPaymentMethodDetail = {
  apiUrlPart: "dd",
  name: "direct_debit",
  friendlyName: "direct debit",
  /*
  same goes for gocardless DD responses
    "ddDetail": {
        "accountName": "asfd",
        "accountNumber": "55779911",
        "sortCode": "200000"
    },
    */
  matchesResponse,
  subHasExpectedPaymentType,
  render: newPaymentMethodDetailRender,
  detailToPayloadObject,
  confirmButtonWrapper,
};

const tests = [
  {
    data: {
      subscription: guardianWeeklySubscriptionCard,
      newPaymentMethodDetail: newPaymentMethodDetailCard,
      previousProductDetail: guardianWeeklyCard,
    },
    expectations: [
      "Guardian Weekly",
      "ending 4242",
      "4 / 2024",
      "£135.00 / annual",
      "10 December 2021",
    ],
  },
  {
    data: {
      subscription: digitalSubscriptionDD,
      newPaymentMethodDetail: newPaymentMethodDetailDD,
      previousProductDetail: digitalDD,
    },
    expectations: [
      "Digital Subscription",
      "ending 911",
      "20-00-00",
      "£99.00 / annual",
      "18 December 2021",
    ],
  },
];

describe("ConfirmedNewPaymentDetailsRenderer component", () => {
  test.each(tests)(
    "Summary table shows correct data for %s",
    ({ data, expectations }) => {
      const { getByText } = render(
        <ConfirmedNewPaymentDetailsRenderer
          subscription={data.subscription}
          newPaymentMethodDetail={data.newPaymentMethodDetail}
          previousProductDetail={data.previousProductDetail}
        />
      );

      expectations.map((toTest) => getByText(toTest));
    }
  );
});

test("PaymentMethodUpdated component does not display failure message", () => {
  const { queryByText } = render(
    <PaymentMethodUpdated
      subs={[{ subscription: guardianWeeklySubscriptionCard }]}
      newPaymentMethodDetail={newPaymentMethodDetailCard}
      previousProductDetail={guardianWeeklyCard}
    />
  );

  expect(queryByText(failureMessage)).toBeNull();
});

test("PaymentMethodUpdated component displays failure message when necessary", () => {
  const { getByText } = render(
    <PaymentMethodUpdated
      subs={[{ subscription: guardianWeeklySubscriptionCard }]}
      newPaymentMethodDetail={newPaymentMethodDetailCard}
      previousProductDetail={guardianWeeklyExpiredCard}
    />
  );

  getByText(failureMessage);
});
