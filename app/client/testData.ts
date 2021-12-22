import { Subscription, ProductDetail } from "../shared/productResponse";

/************* ProductDetails *************/
export const guardianWeeklyCard: ProductDetail = {
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
      addressLine1: "11 Valnay Street",
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

export const guardianWeeklyExpiredCard: ProductDetail = {
  mmaCategory: "subscriptions",
  tier: "Guardian Weekly - Domestic",
  isPaidTier: true,
  selfServiceCancellation: {
    isAllowed: false,
    shouldDisplayEmail: false,
    phoneRegionsToDisplay: ["UK & ROW"]
  },
  joinDate: "2021-11-15",
  alertText:
    "Our attempt to take payment for your Guardian Weekly subscription failed on 24/02/2016.",
  subscription: {
    paymentMethod: "Card",
    card: {
      last4: "4242",
      expiry: {
        month: 8,
        year: 2015
      },
      type: "Visa",
      stripePublicKeyForUpdate: "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f",
      email: "jon.flynn+code@guardian.co.uk"
    },
    contactId: "0039E00001KA26BQAT",
    deliveryAddress: {
      addressLine1: "11 Valnay Street",
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

export const digitalDD: ProductDetail = {
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
      addressLine1: "11 Valnay Street",
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

export const NewspaperVoucherPaypal: ProductDetail = {
  mmaCategory: "subscriptions",
  tier: "Newspaper Digital Voucher",
  isPaidTier: true,
  selfServiceCancellation: {
    isAllowed: false,
    shouldDisplayEmail: false,
    phoneRegionsToDisplay: ["UK & ROW"]
  },
  joinDate: "2021-11-26",
  optIn: true,
  subscription: {
    paymentMethod: "PayPal",
    payPalEmail: "sb-ltpuy8454870@personal.example.com",
    contactId: "0039E00001KA26BQAT",
    deliveryAddress: {
      addressLine1: "11 Valnay Street",
      addressLine2: "",
      town: "London",
      postcode: "SW17 8PS",
      country: "United Kingdom"
    },
    safeToUpdatePaymentMethod: true,
    start: "2021-12-06",
    end: "2022-11-26",
    nextPaymentPrice: 5299,
    nextPaymentDate: "2021-12-06",
    lastPaymentDate: null,
    chargedThroughDate: null,
    renewalDate: "2022-11-26",
    anniversaryDate: "2022-12-06",
    cancelledAt: false,
    subscriberId: "A-S00285104",
    subscriptionId: "A-S00285104",
    trialLength: -7,
    autoRenew: true,
    plan: {
      name: "Newspaper Digital Voucher",
      amount: 5299,
      currency: "£",
      currencyISO: "GBP",
      interval: "month"
    },
    currentPlans: [
      {
        name: "Everyday",
        start: "2021-12-06",
        end: "2022-11-26",
        shouldBeVisible: true,
        chargedThrough: null,
        amount: 5299,
        currency: "£",
        currencyISO: "GBP",
        interval: "month",
        daysOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ]
      }
    ],
    futurePlans: [],
    readerType: "Direct",
    accountId: "8ad0824e7d584341017d5bc38c0d52dc"
  },
  isTestUser: false,
  key: "1639394814906"
};

/************* Subscriptions *************/
export const guardianWeeklySubscriptionCard: Subscription = {
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
    addressLine1: "11 Valnay Street",
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

export const guardianWeeklySubscriptionAustralia: Subscription = {
  paymentMethod: "Card",
  card: {
    last4: "4242",
    expiry: {
      month: 3,
      year: 2033
    },
    type: "Visa",
    stripePublicKeyForUpdate: "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f",
    email: "jon.flynn+code@guardian.co.uk"
  },
  contactId: "0039E00001KA26BQAT",
  deliveryAddress: {
    addressLine1: "11 Valnay Street",
    addressLine2: "",
    town: "Canberra",
    region: "ACT",
    postcode: "2601",
    country: "Australia"
  },
  safeToUpdatePaymentMethod: true,
  start: "2021-12-24",
  end: "2022-12-15",
  nextPaymentPrice: 3250,
  nextPaymentDate: "2021-12-24",
  lastPaymentDate: null,
  chargedThroughDate: null,
  renewalDate: "2022-12-15",
  anniversaryDate: "2022-12-24",
  cancelledAt: false,
  subscriberId: "A-S00293857",
  subscriptionId: "A-S00293857",
  trialLength: 9,
  autoRenew: true,
  plan: {
    name: "Guardian Weekly - Domestic",
    amount: 3250,
    currency: "$",
    currencyISO: "AUD",
    interval: "month"
  },
  currentPlans: [],
  futurePlans: [
    {
      name: null,
      start: "2021-12-24",
      end: "2022-12-15",
      shouldBeVisible: true,
      chargedThrough: null,
      amount: 3250,
      currency: "$",
      currencyISO: "AUD",
      interval: "month"
    }
  ],
  readerType: "Direct",
  accountId: "8ad0965d7dbcc507017dbe20afd33ac4",
  deliveryAddressChangeEffectiveDate: "2021-12-24"
};

export const digitalSubscriptionDD: Subscription = {
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
    addressLine1: "11 Valnay Street",
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
