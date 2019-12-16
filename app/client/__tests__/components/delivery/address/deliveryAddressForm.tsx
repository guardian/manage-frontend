import { getValidDeliveryAddressChangeEffectiveDates } from "../../../../components/delivery/address/deliveryAddressForm";
import { ProductDetail } from "../../../../../shared/productResponse";

const guardianWeekly: ProductDetail = {
  joinDate: "2019-11-26",
  tier: "Guardian Weekly - Domestic",
  isPaidTier: true,
  subscription: {
    nextPaymentDate: "2019-12-06",
    contactId: "000000000000123ABC",
    cancelledAt: false,
    currentPlans: [
      {
        shouldBeVisible: true,
        name: null,
        start: "2019-12-06"
      }
    ],
    start: "2019-12-06",
    subscriptionId: "A-S00123456",
    renewalDate: "2020-11-26",
    safeToUpdatePaymentMethod: true,
    trialLength: -10,
    futurePlans: [],
    deliveryAddress: {
      addressLine1: "Kings place, 90 York way",
      addressLine2: "Kings cross",
      town: "London",
      postcode: "N1 9GU",
      country: "United Kingdom"
    },
    paymentMethod: "Card",
    autoRenew: true,
    end: "2020-11-26",
    nextPaymentPrice: 3750,
    card: {
      last4: "4242",
      type: "Visa",
      stripePublicKeyForUpdate: "pk_test_000123ABC",
      email: "hithere@guardian.co.uk"
    }
  },
  isTestUser: false
};
const homeDelivery: ProductDetail = {
  joinDate: "2019-11-26",
  tier: "Newspaper Delivery",
  isPaidTier: true,
  subscription: {
    nextPaymentDate: "2019-11-29",
    contactId: "000000000000123ABC",
    cancelledAt: false,
    currentPlans: [
      {
        shouldBeVisible: true,
        name: "Everyday",
        start: "2019-11-29"
      }
    ],
    start: "2019-11-29",
    subscriptionId: "A-S00012345",
    renewalDate: "2020-11-26",
    safeToUpdatePaymentMethod: true,
    trialLength: -17,
    futurePlans: [],
    deliveryAddress: {
      addressLine1: "Kings place, 90 York way",
      addressLine2: "Kings cross",
      town: "London",
      postcode: "N1 9GU",
      country: "United Kingdom"
    },
    paymentMethod: "Card",
    autoRenew: true,
    end: "2020-11-26",
    nextPaymentPrice: 4709,
    card: {
      last4: "4242",
      type: "Visa",
      stripePublicKeyForUpdate: "pk_test_000123ABC",
      email: "hithere@guardian.co.uk"
    }
  },
  isTestUser: false
};
const productDetailArray: ProductDetail[] = [guardianWeekly, homeDelivery];

describe("getValidDeliveryAddressChangeEffectiveDates", () => {
  test("returns the correct address change effective dates", () => {
    const input: ProductDetail[] = productDetailArray;
    const expected = {
      "000000000000123ABC": [guardianWeekly, homeDelivery]
    };
    const result = getValidDeliveryAddressChangeEffectiveDates(input);
    expect(result).toEqual(expected);
  });
});

/*
import {
  cleanup,
  fireEvent,
  render,
  waitForElement,
  waitForElementToBeRemoved
} from "@testing-library/react";
import React from "react";
import { create } from "react-test-renderer";
import { SubscriptionsAffectedList } from "../../../components/delivery/address/deliveryAddressForm";

const mockPropContent = {};

const element = ()
  */
