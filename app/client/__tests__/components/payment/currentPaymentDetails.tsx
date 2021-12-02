import React from "react";
import { render } from "@testing-library/react";
import { ProductDetail } from "../../../../shared/productResponse";
import CurrentPaymentDetails from "../../../components/payment/update/CurrentPaymentDetail";

const cardProductDetail: ProductDetail = {
  mmaCategory: "subscriptions",
  tier: "Guardian Weekly - Domestic",
  isPaidTier: true,
  selfServiceCancellation: {
    isAllowed: false,
    shouldDisplayEmail: false,
    phoneRegionsToDisplay: ["UK & ROW"]
  },
  joinDate: "2021-11-15",
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
    start: "2021-11-26",
    end: "2022-11-15",
    nextPaymentPrice: 1250,
    nextPaymentDate: "2021-11-26",
    lastPaymentDate: null,
    chargedThroughDate: null,
    renewalDate: "2022-11-15",
    anniversaryDate: "2022-11-26",
    cancelledAt: false,
    subscriptionId: "A-S00280026",
    trialLength: 11,
    autoRenew: true,
    currentPlans: [],
    futurePlans: [
      {
        name: null,
        start: "2021-11-26",
        shouldBeVisible: true
      }
    ],
    readerType: "Direct",
    deliveryAddressChangeEffectiveDate: "2021-11-26"
  },
  isTestUser: false
};

const directDebitProductDetail: ProductDetail = {
  mmaCategory: "subscriptions",
  tier: "Digital Pack",
  isPaidTier: true,
  selfServiceCancellation: {
    isAllowed: false,
    shouldDisplayEmail: false,
    phoneRegionsToDisplay: ["UK & ROW"]
  },
  joinDate: "2021-11-11",
  subscription: {
    paymentMethod: "DirectDebit",
    mandate: {
      accountName: "khjhk",
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
    start: "2021-11-27",
    end: "2022-11-11",
    nextPaymentPrice: 599,
    nextPaymentDate: "2021-11-27",
    lastPaymentDate: null,
    chargedThroughDate: null,
    renewalDate: "2022-11-11",
    anniversaryDate: "2022-11-27",
    cancelledAt: false,
    subscriptionId: "A-S00278175",
    trialLength: 12,
    autoRenew: true,
    currentPlans: [],
    futurePlans: [
      {
        name: null,
        start: "2021-11-27",
        shouldBeVisible: true
      }
    ],
    readerType: "Direct"
  },
  isTestUser: false
};

describe("currentPaymentDetails.tsx", () => {
  it("Shows product name", () => {
    const { getByText } = render(
      <CurrentPaymentDetails {...cardProductDetail} />
    );

    getByText("Guardian Weekly");
  });

  describe("For Card", () => {
    test("Shows last 4 digits on card and expiry date", () => {
      const { getByText } = render(
        <CurrentPaymentDetails {...cardProductDetail} />
      );

      getByText("ending 4242");
      getByText("4 / 2024");
    });
  });

  describe("For Direct Debit", () => {
    test("shows account number and sort code", () => {
      const { getByText } = render(
        <CurrentPaymentDetails {...directDebitProductDetail} />
      );

      getByText("ending 911");
      getByText("20-00-00");
    });
  });

  describe("For Paypal", () => {});
});
