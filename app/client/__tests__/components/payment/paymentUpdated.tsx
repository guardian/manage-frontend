import React from "react";
import { render } from "@testing-library/react";
import {
  ProductDetail,
  Subscription
} from "../../../../shared/productResponse";
import { ConfirmedNewPaymentDetailsRenderer } from "../../../components/payment/update/paymentUpdated";
import { NewPaymentMethodDetail } from "../../../components/payment/update/newPaymentMethodDetail";

// mock functions for NewPaymentMethodDetail type
const matchesResponse = (_: any) => true;
const detailToPayloadObject = () => {
  return {};
};
const newPaymentMethodDetailRender = () => <></>;
const confirmButtonWrapper = () => <></>;

const gwSubscription: Subscription = {
  paymentMethod: "Card",
  card: {
    last4: "4242",
    expiry: {
      month: 4,
      year: 2024
    },
    type: "Visa",
    stripePublicKeyForUpdate: "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f",
    email: "jon.flynn+code@guardian.co.uk"
  },
  contactId: "0039E00001KA26BQAT",
  deliveryAddress: {
    addressLine1: "71 Valnay Street",
    addressLine2: "",
    town: "London",
    postcode: "SW17 8PS",
    country: "United Kingdom"
  },
  safeToUpdatePaymentMethod: true,
  start: "2021-12-10",
  end: "2022-11-29",
  nextPaymentPrice: 13500,
  nextPaymentDate: "2021-12-10",
  lastPaymentDate: null,
  chargedThroughDate: null,
  renewalDate: "2022-11-29",
  anniversaryDate: "2022-12-10",
  cancelledAt: false,
  subscriptionId: "A-S00286635",
  subscriberId: "A-S00286635",
  trialLength: 9,
  autoRenew: true,
  plan: {
    name: "Guardian Weekly - Domestic",
    amount: 15000,
    currency: "£",
    currencyISO: "GBP",
    interval: "year"
  },
  currentPlans: [],
  futurePlans: [
    {
      name: null,
      start: "2021-12-10",
      end: "2022-11-29",
      shouldBeVisible: true,
      chargedThrough: null,
      amount: 15000,
      currency: "£",
      currencyISO: "GBP",
      interval: "year"
    }
  ],
  readerType: "Direct",
  accountId: "8ad0965d7d585497017d6ce786026089",
  deliveryAddressChangeEffectiveDate: "2021-12-10"
};

const newPaymentMethodDetailCard: NewPaymentMethodDetail = {
  apiUrlPart: "card",
  name: "card",
  friendlyName: "payment card",
  paymentFailureRecoveryMessage:
    "We will take the outstanding payment within 24 hours, using your new card details.",
  matchesResponse,
  subHasExpectedPaymentType: jest.fn((_?: Subscription) => true),
  render: newPaymentMethodDetailRender,
  detailToPayloadObject,
  confirmButtonWrapper
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

const gwCard: ProductDetail = {
  mmaCategory: "subscriptions",
  tier: "Guardian Weekly - Domestic",
  isPaidTier: true,
  selfServiceCancellation: {
    isAllowed: false,
    shouldDisplayEmail: false,
    phoneRegionsToDisplay: ["UK & ROW"]
  },
  joinDate: "2021-11-29",
  optIn: true,
  subscription: {
    paymentMethod: "Card",
    card: {
      last4: "4242",
      expiry: {
        month: 4,
        year: 2024
      },
      type: "Visa",
      stripePublicKeyForUpdate: "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f",
      email: "jon.flynn+code@guardian.co.uk"
    },
    contactId: "0039E00001KA26BQAT",
    deliveryAddress: {
      addressLine1: "71 Valnay Street",
      addressLine2: "",
      town: "London",
      postcode: "SW17 8PS",
      country: "United Kingdom"
    },
    safeToUpdatePaymentMethod: true,
    start: "2021-12-10",
    end: "2022-11-29",
    nextPaymentPrice: 13500,
    nextPaymentDate: "2021-12-10",
    lastPaymentDate: null,
    chargedThroughDate: null,
    renewalDate: "2022-11-29",
    anniversaryDate: "2022-12-10",
    cancelledAt: false,
    subscriberId: "A-S00286635",
    subscriptionId: "A-S00286635",
    trialLength: 9,
    autoRenew: true,
    plan: {
      name: "Guardian Weekly - Domestic",
      amount: 15000,
      currency: "£",
      currencyISO: "GBP",
      interval: "year"
    },
    currentPlans: [],
    futurePlans: [
      {
        name: null,
        start: "2021-12-10",
        end: "2022-11-29",
        shouldBeVisible: true,
        chargedThrough: null,
        amount: 15000,
        currency: "£",
        currencyISO: "GBP",
        interval: "year"
      }
    ],
    readerType: "Direct",
    accountId: "8ad0965d7d585497017d6ce786026089",
    deliveryAddressChangeEffectiveDate: "2021-12-10"
  },
  isTestUser: false,
  key: "1638374153759"
};

const digitalSubscription: Subscription = {
  paymentMethod: "DirectDebit",
  account: {
    accountName: "asfd"
  },
  mandate: {
    accountName: "asfd",
    accountNumber: "****9911",
    sortCode: "200000"
  },
  contactId: "0039E00001KA26BQAT",
  deliveryAddress: {
    addressLine1: "71 Valnay Street",
    addressLine2: "",
    town: "London",
    postcode: "SW17 8PS",
    country: "United Kingdom"
  },
  safeToUpdatePaymentMethod: true,
  start: "2021-12-18",
  end: "2022-12-02",
  nextPaymentPrice: 9900,
  nextPaymentDate: "2021-12-18",
  lastPaymentDate: null,
  chargedThroughDate: null,
  renewalDate: "2022-12-02",
  anniversaryDate: "2022-12-18",
  cancelledAt: false,
  subscriberId: "A-S00287957",
  subscriptionId: "A-S00287957",
  trialLength: 16,
  autoRenew: true,
  plan: {
    name: "Digital Pack",
    amount: 11900,
    currency: "£",
    currencyISO: "GBP",
    interval: "year"
  },
  currentPlans: [],
  futurePlans: [
    {
      name: null,
      start: "2021-12-18",
      end: "2022-12-02",
      shouldBeVisible: true,
      chargedThrough: null,
      amount: 11900,
      currency: "£",
      currencyISO: "GBP",
      interval: "year"
    }
  ],
  readerType: "Direct",
  accountId: "8ad08c0f7d768472017d7bc3e5960b20"
};

const newPaymentMethodDetailDD: NewPaymentMethodDetail = {
  apiUrlPart: "dd",
  name: "direct_debit",
  friendlyName: "direct debit",
  /*
    "ddDetail": {
        "accountName": "asfd",
        "accountNumber": "55779911",
        "sortCode": "200000"
    },
    */
  matchesResponse,
  subHasExpectedPaymentType: jest.fn((_?: Subscription) => true),
  render: newPaymentMethodDetailRender,
  detailToPayloadObject,
  confirmButtonWrapper
};

const digitalSubDD: ProductDetail = {
  mmaCategory: "subscriptions",
  tier: "Digital Pack",
  isPaidTier: true,
  selfServiceCancellation: {
    isAllowed: false,
    shouldDisplayEmail: false,
    phoneRegionsToDisplay: ["UK & ROW"]
  },
  joinDate: "2021-12-02",
  optIn: true,
  subscription: {
    paymentMethod: "DirectDebit",
    account: {
      accountName: "sdfa"
    },
    mandate: {
      accountName: "sdfa",
      accountNumber: "****9911",
      sortCode: "200000"
    },
    contactId: "0039E00001KA26BQAT",
    deliveryAddress: {
      addressLine1: "71 Valnay Street",
      addressLine2: "",
      town: "London",
      postcode: "SW17 8PS",
      country: "United Kingdom"
    },
    safeToUpdatePaymentMethod: true,
    start: "2021-12-18",
    end: "2022-12-02",
    nextPaymentPrice: 9900,
    nextPaymentDate: "2021-12-18",
    lastPaymentDate: null,
    chargedThroughDate: null,
    renewalDate: "2022-12-02",
    anniversaryDate: "2022-12-18",
    cancelledAt: false,
    subscriberId: "A-S00287957",
    subscriptionId: "A-S00287957",
    trialLength: 16,
    autoRenew: true,
    plan: {
      name: "Digital Pack",
      amount: 11900,
      currency: "£",
      currencyISO: "GBP",
      interval: "year"
    },
    currentPlans: [],
    futurePlans: [
      {
        name: null,
        start: "2021-12-18",
        end: "2022-12-02",
        shouldBeVisible: true,
        chargedThrough: null,
        amount: 11900,
        currency: "£",
        currencyISO: "GBP",
        interval: "year"
      }
    ],
    readerType: "Direct",
    accountId: "8ad08c0f7d768472017d7bc3e5960b20"
  },
  isTestUser: false,
  key: "1638458999023"
};

const tests = [
  {
    data: {
      subscription: gwSubscription,
      newPaymentMethodDetail: newPaymentMethodDetailCard,
      previousProductDetail: gwCard
    },
    expectations: [
      "Guardian Weekly",
      "ending 4242",
      "4 / 2024",
      "£135.00 / annual",
      "December 10, 2021"
    ]
  },
  {
    data: {
      subscription: digitalSubscription,
      newPaymentMethodDetail: newPaymentMethodDetailDD,
      previousProductDetail: digitalSubDD
    },
    expectations: [
      "Digital Subscription",
      "ending 911",
      "20-00-00",
      "£99.00 / annual",
      "December 18, 2021"
    ]
  }
];

describe("ConfirmedNewPaymentDetailsRenderer component in paymentMethodUpdated.tsx", () => {
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

      // @ts-ignore
      expect(
        // @ts-ignore
        data.newPaymentMethodDetail.subHasExpectedPaymentType.mock.calls.length
      ).toBe(1);

      expectations.forEach(toTest => getByText(toTest));
    }
  );
});
