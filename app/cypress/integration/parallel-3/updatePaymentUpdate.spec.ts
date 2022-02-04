import { setLocalBaseUrl } from "../../lib/setLocalBaseUrl";
import { StripeSetupIntent } from "../../../shared/stripeSetupIntent";
// import { PaymentMethod } from "../../../client/components/payment/update/updatePaymentFlow";

// 'No IAB consent management framework' exception is thrown from here: https://github.com/guardian/consent-management-platform/blob/405a4fee4c54c2bdabea3df0fd1bf187ae6d7927/src/onConsentChange.ts#L34
Cypress.on("uncaught:exception", () => {
  return false;
});

const iframeMessage = `[id^="sp_message_iframe_"]`;
const acceptCookiesButtonText = "Yes, I’m happy";

const stripePaymentMethod = {
  id: "pm_1J2RZI2eZvKYlo2CaP803dMY",
  object: "payment_method",
  billing_details: {
    address: {
      city: "Kuala Lumpur",
      country: null,
      line1: "Level 10, 1 Sentral, Jalan Rakyat, Kuala Lumpur Sentral",
      line2: null,
      postal_code: "50706",
      state: null,
    },
    email: "jenny@example.com",
    name: null,
    phone: "+15555555555",
  },
  card: {
    brand: "visa",
    checks: {
      address_line1_check: null,
      address_postal_code_check: null,
      cvc_check: "pass",
    },
    country: "US",
    exp_month: 8,
    exp_year: 2022,
    fingerprint: "Xt5EWLLDS7FJjR1c",
    funding: "credit",
    generated_from: null,
    last4: "4242",
    networks: {
      available: ["visa"],
      preferred: null,
    },
    three_d_secure_usage: {
      supported: true,
    },
    wallet: null,
  },
  created: 123456789,
  customer: null,
  livemode: false,
  metadata: {
    order_id: "123456789",
  },
  type: "card",
};

const ddPaymentMethod = {
  accountName: "JON R HEE",
  accountNumber: "****9911",
  sortCode: "200000",
};

const stripeSetupIntent: StripeSetupIntent = {
  id: "seti_0KLFtUItVxyc3M6nBXnYb2jO",
  client_secret:
    "seti_0KLFtUItVxyc3Q6nBXnYb2jO_secret_L1IUioSNMNThetlMQnVtbCJu0Gj2cq1M",
};

const confirmCardSetupResponse = {
  status: "succeeded",
};

const executePaymentUpdateResponse = {
  type: "visa",
  last4: "4242",
  expiryMonth: 4,
  expiryYear: 2024,
};

const digitalDD = [
  {
    mmaCategory: "subscriptions",
    tier: "Digital Pack",
    isPaidTier: true,
    selfServiceCancellation: {
      isAllowed: false,
      shouldDisplayEmail: false,
      phoneRegionsToDisplay: ["UK & ROW"],
    },
    joinDate: "2021-11-11",
    subscription: {
      paymentMethod: "DirectDebit",
      mandate: {
        accountName: "khjhk",
        accountNumber: "****9911",
        sortCode: "200000",
      },
      contactId: "0039E00001KA26BQAT",
      deliveryAddress: {
        addressLine1: "11 Valnay Street",
        addressLine2: "",
        town: "London",
        postcode: "SW17 8PS",
        country: "United Kingdom",
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
          shouldBeVisible: true,
        },
      ],
      readerType: "Direct",
    },
    isTestUser: false,
  },
];

const contribution = [
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    isPaidTier: true,
    selfServiceCancellation: {
      isAllowed: true,
      shouldDisplayEmail: true,
      phoneRegionsToDisplay: ["UK & ROW", "US", "AUS"],
    },
    joinDate: "2022-01-05",
    optIn: true,
    subscription: {
      paymentMethod: "PayPal",
      payPalEmail: "sb-ltpuy8454870@personal.example.com",
      contactId: "0039E00001KA26BQAT",
      deliveryAddress: {
        addressLine1: "11 Valnay Street",
        addressLine2: "",
        town: "Canberra",
        region: "ACT",
        postcode: "2601",
        country: "Australia",
      },
      safeToUpdatePaymentMethod: true,
      start: "2022-01-05",
      end: "2022-02-05",
      nextPaymentPrice: 300,
      nextPaymentDate: "2022-02-05",
      lastPaymentDate: "2022-01-05",
      chargedThroughDate: "2022-02-05",
      renewalDate: "2023-01-05",
      anniversaryDate: "2023-01-05",
      cancelledAt: false,
      subscriberId: "A-S00303370",
      subscriptionId: "A-S00303370",
      trialLength: -24,
      autoRenew: true,
      plan: {
        name: "Contributor",
        amount: 300,
        currency: "£",
        currencyISO: "GBP",
        interval: "month",
      },
      currentPlans: [
        {
          name: null,
          start: "2022-01-05",
          end: "2023-01-05",
          shouldBeVisible: true,
          chargedThrough: "2022-02-05",
          amount: 300,
          currency: "£",
          currencyISO: "GBP",
          interval: "month",
        },
      ],
      futurePlans: [],
      readerType: "Direct",
      accountId: "8ad09f8a7e25bda3017e296317464818",
      cancellationEffectiveDate: null,
    },
    isTestUser: false,
  },
];

const mmaResponse = [
  {
    mmaCategory: "subscriptions",
    tier: "Digital Pack",
    isPaidTier: true,
    selfServiceCancellation: {
      isAllowed: false,
      shouldDisplayEmail: false,
      phoneRegionsToDisplay: ["UK & ROW"],
    },
    joinDate: "2021-12-02",
    optIn: true,
    subscription: {
      paymentMethod: "DirectDebit",
      account: { accountName: "afsddfsa adfsdfsa" },
      mandate: {
        accountName: "afsddfsa adfsdfsa",
        accountNumber: "****9911",
        sortCode: "200000",
      },
      contactId: "0039E00001KA26BQAT",
      deliveryAddress: {
        addressLine1: "11 Valnay Street",
        addressLine2: "",
        town: "Canberra",
        region: "ACT",
        postcode: "2601",
        country: "Australia",
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
      trialLength: -42,
      autoRenew: true,
      plan: {
        name: "Digital Pack",
        amount: 11900,
        currency: "£",
        currencyISO: "GBP",
        interval: "year",
      },
      currentPlans: [
        {
          name: null,
          start: "2021-12-18",
          end: "2022-12-02",
          shouldBeVisible: true,
          chargedThrough: null,
          amount: 11900,
          currency: "£",
          currencyISO: "GBP",
          interval: "year",
        },
      ],
      futurePlans: [],
      readerType: "Direct",
      accountId: "8ad08c0f7d768472017d7bc3e5960b20",
      cancellationEffectiveDate: null,
    },
    isTestUser: false,
  },
  {
    mmaCategory: "subscriptions",
    tier: "Guardian Weekly - Domestic",
    isPaidTier: true,
    selfServiceCancellation: {
      isAllowed: false,
      shouldDisplayEmail: false,
      phoneRegionsToDisplay: ["UK & ROW"],
    },
    joinDate: "2021-12-15",
    optIn: true,
    subscription: {
      paymentMethod: "Card",
      card: {
        last4: "4242",
        expiry: { month: 4, year: 2024 },
        type: "Visa",
        stripePublicKeyForUpdate: "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f",
        email: "jon.flynn+code@guardian.co.uk",
      },
      contactId: "0039E00001KA26BQAT",
      deliveryAddress: {
        addressLine1: "11 Valnay Street",
        addressLine2: "",
        town: "Canberra",
        region: "ACT",
        postcode: "2601",
        country: "Australia",
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
      trialLength: -36,
      autoRenew: true,
      plan: {
        name: "Guardian Weekly - Domestic",
        amount: 3250,
        currency: "$",
        currencyISO: "AUD",
        interval: "month",
      },
      currentPlans: [
        {
          name: null,
          start: "2021-12-24",
          end: "2022-12-15",
          shouldBeVisible: true,
          chargedThrough: null,
          amount: 3250,
          currency: "$",
          currencyISO: "AUD",
          interval: "month",
        },
      ],
      futurePlans: [],
      readerType: "Direct",
      accountId: "8ad0965d7dbcc507017dbe20afd33ac4",
      cancellationEffectiveDate: null,
      deliveryAddressChangeEffectiveDate: "2022-02-11",
    },
    isTestUser: false,
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    isPaidTier: true,
    selfServiceCancellation: {
      isAllowed: true,
      shouldDisplayEmail: true,
      phoneRegionsToDisplay: ["UK & ROW", "US", "AUS"],
    },
    joinDate: "2022-01-29",
    optIn: true,
    subscription: {
      paymentMethod: "Card",
      card: {
        last4: "4242",
        expiry: { month: 4, year: 2024 },
        type: "Visa",
        stripePublicKeyForUpdate: "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f",
        email: "jon.flynn+code@guardian.co.uk",
      },
      contactId: "0039E00001KA26BQAT",
      deliveryAddress: {
        addressLine1: "11 Valnay Street",
        addressLine2: "",
        town: "Canberra",
        region: "ACT",
        postcode: "2601",
        country: "Australia",
      },
      safeToUpdatePaymentMethod: true,
      start: "2022-01-29",
      end: "2022-02-28",
      nextPaymentPrice: 900,
      nextPaymentDate: "2022-02-28",
      lastPaymentDate: "2022-01-29",
      chargedThroughDate: "2022-02-28",
      renewalDate: "2023-01-29",
      anniversaryDate: "2023-01-29",
      cancelledAt: false,
      subscriberId: "A-S00314561",
      subscriptionId: "A-S00314561",
      trialLength: 0,
      autoRenew: true,
      plan: {
        name: "Contributor",
        amount: 900,
        currency: "£",
        currencyISO: "GBP",
        interval: "month",
      },
      currentPlans: [
        {
          name: null,
          start: "2022-01-29",
          end: "2023-01-29",
          shouldBeVisible: true,
          chargedThrough: "2022-02-28",
          amount: 900,
          currency: "£",
          currencyISO: "GBP",
          interval: "month",
        },
      ],
      futurePlans: [],
      readerType: "Direct",
      accountId: "8ad0965d7ea28ecf017ea765ec9522d5",
      cancellationEffectiveDate: null,
    },
    isTestUser: false,
  },
  {
    mmaCategory: "subscriptions",
    tier: "Newspaper Digital Voucher",
    isPaidTier: true,
    selfServiceCancellation: {
      isAllowed: false,
      shouldDisplayEmail: false,
      phoneRegionsToDisplay: ["UK & ROW"],
    },
    joinDate: "2021-12-15",
    optIn: true,
    subscription: {
      paymentMethod: "Card",
      card: {
        last4: "4242",
        expiry: { month: 4, year: 2024 },
        type: "Visa",
        stripePublicKeyForUpdate: "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f",
        email: "jon.flynn+code@guardian.co.uk",
      },
      contactId: "0039E00001KA26BQAT",
      deliveryAddress: {
        addressLine1: "11 Valnay Street",
        addressLine2: "",
        town: "Canberra",
        region: "ACT",
        postcode: "2601",
        country: "Australia",
      },
      safeToUpdatePaymentMethod: true,
      start: "2021-12-23",
      end: "2022-01-23",
      nextPaymentPrice: 5299,
      nextPaymentDate: "2022-01-23",
      lastPaymentDate: "2021-12-23",
      chargedThroughDate: "2022-01-23",
      renewalDate: "2022-12-15",
      anniversaryDate: "2022-12-23",
      cancelledAt: false,
      subscriberId: "A-S00293815",
      subscriptionId: "A-S00293815",
      trialLength: -37,
      autoRenew: true,
      plan: {
        name: "Newspaper Digital Voucher",
        amount: 5299,
        currency: "£",
        currencyISO: "GBP",
        interval: "month",
      },
      currentPlans: [
        {
          name: "Everyday",
          start: "2021-12-23",
          end: "2022-12-15",
          shouldBeVisible: true,
          chargedThrough: "2022-01-23",
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
            "Sunday",
          ],
        },
      ],
      futurePlans: [],
      readerType: "Direct",
      accountId: "8ad09f8a7dbcc50c017dbda3bdc05f8d",
      cancellationEffectiveDate: null,
    },
    isTestUser: false,
  },
];

const cancelledResponse = [
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00268736",
      cancellationEffectiveDate: "2021-11-21",
      start: "2021-10-21",
      end: "2021-11-21",
      readerType: "Direct",
      accountId: "8ad084a67ca1d07c017ca463884c5c46",
    },
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00277393",
      cancellationEffectiveDate: "2021-12-09",
      start: "2021-11-09",
      end: "2021-12-09",
      readerType: "Direct",
      accountId: "8ad084a67cfec5bc017d0573d8da4641",
    },
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00271109",
      cancellationEffectiveDate: "2021-11-26",
      start: "2021-10-26",
      end: "2021-11-26",
      readerType: "Direct",
      accountId: "8ad08c0f7cbcc1b1017cbed982091a59",
    },
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00274043",
      cancellationEffectiveDate: "2021-12-02",
      start: "2021-11-02",
      end: "2021-12-02",
      readerType: "Direct",
      accountId: "8ad08c0f7cda94a9017ce0028fcb42d9",
    },
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00274524",
      cancellationEffectiveDate: "2021-12-03",
      start: "2021-11-03",
      end: "2021-12-03",
      readerType: "Direct",
      accountId: "8ad0965d7ce3ed3b017ce563a4e10f13",
    },
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00281897",
      cancellationEffectiveDate: "2021-12-19",
      start: "2021-11-19",
      end: "2021-12-19",
      readerType: "Direct",
      accountId: "8ad0965d7d323130017d37e7754379f4",
    },
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00273719",
      cancellationEffectiveDate: "2021-12-01",
      start: "2021-11-01",
      end: "2021-12-01",
      readerType: "Direct",
      accountId: "8ad098317cdaa22b017cdc6dd4d846fb",
    },
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00274063",
      cancellationEffectiveDate: "2021-12-02",
      start: "2021-11-02",
      end: "2021-12-02",
      readerType: "Direct",
      accountId: "8ad098317cdaa22b017ce01d1c634e11",
    },
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00293413",
      cancellationEffectiveDate: "2022-01-14",
      start: "2021-12-14",
      end: "2022-01-14",
      readerType: "Direct",
      accountId: "8ad098317db2e76b017db915c0677859",
    },
  },
  {
    mmaCategory: "contributions",
    tier: "Contributor",
    subscription: {
      subscriptionId: "A-S00294335",
      cancellationEffectiveDate: "2022-01-16",
      start: "2021-12-16",
      end: "2022-01-16",
      readerType: "Direct",
      accountId: "8ad098317dc2ae8f017dc37bc2c63f94",
    },
  },
];

const gwProductDetail = [
  {
    mmaCategory: "subscriptions",
    tier: "Guardian Weekly - Domestic",
    isPaidTier: true,
    selfServiceCancellation: {
      isAllowed: false,
      shouldDisplayEmail: false,
      phoneRegionsToDisplay: ["UK & ROW"],
    },
    joinDate: "2021-12-15",
    optIn: true,
    subscription: {
      paymentMethod: "Card",
      card: {
        last4: "4242",
        expiry: { month: 4, year: 2024 },
        type: "Visa",
        stripePublicKeyForUpdate: "pk_test_Qm3CGRdrV4WfGYCpm0sftR0f",
        email: "jon.flynn+code@guardian.co.uk",
      },
      contactId: "0039E00001KA26BQAT",
      deliveryAddress: {
        addressLine1: "11 Valnay Street",
        addressLine2: "",
        town: "Canberra",
        region: "ACT",
        postcode: "2601",
        country: "Australia",
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
      trialLength: -37,
      autoRenew: true,
      plan: {
        name: "Guardian Weekly - Domestic",
        amount: 3250,
        currency: "$",
        currencyISO: "AUD",
        interval: "month",
      },
      currentPlans: [
        {
          name: null,
          start: "2021-12-24",
          end: "2022-12-15",
          shouldBeVisible: true,
          chargedThrough: null,
          amount: 3250,
          currency: "$",
          currencyISO: "AUD",
          interval: "month",
        },
      ],
      futurePlans: [],
      readerType: "Direct",
      accountId: "8ad0965d7dbcc507017dbe20afd33ac4",
      cancellationEffectiveDate: null,
      deliveryAddressChangeEffectiveDate: "2022-02-11",
    },
    isTestUser: false,
  },
];

describe("E2E Page rendering", function () {
  beforeEach(function () {
    cy.session("auth", () => {
      setLocalBaseUrl();

      cy.intercept("GET", "/api/me/mma", {
        statusCode: 200,
        body: mmaResponse,
      }).as("mma");

      cy.intercept("GET", "/api/cancelled/", {
        statusCode: 200,
        body: cancelledResponse,
      }).as("cancelled");

      cy.createTestUser({ isUserEmailValidated: true }).then(({ cookies }) => {
        cookies.forEach((cookie) => cy.setCookie(cookie.key, cookie.value));
      });

      cy.visit("/");

      cy.wait("@mma");
      cy.wait("@cancelled");

      cy.getIframeBody(iframeMessage)
        .find(`button[title="${acceptCookiesButtonText}"]`, { timeout: 10000 })
        .click();

      // wait for cookies to be set
      cy.wait(1000);
      cy.url().should("contain", "manage.thegulocal.com");
    });
  });

  it("cancels contribution", function () {
    cy.intercept("GET", "/api/me/mma?productType=Contribution", {
      statusCode: 200,
      body: contribution,
    });

    cy.intercept("GET", "/api/me/mma", {
      statusCode: 200,
      body: mmaResponse,
    });

    cy.intercept("GET", "/api/me/mma/**", {
      statusCode: 200,
      body: { subscription: {} },
    }).as("new_product_detail");

    cy.intercept("GET", "/api/cancelled/", {
      statusCode: 200,
      body: cancelledResponse,
    }).as("cancelled");

    cy.intercept("GET", "api/cancellation-date/**", {
      statusCode: 200,
      body: { cancellationEffectiveDate: "2022-02-05" },
    });

    cy.intercept("POST", "api/cancel/**", {
      statusCode: 200,
    }).as("cancel_contribution");

    cy.intercept("POST", "/api/case", {
      statusCode: 200,
      body: {
        id: "caseId",
      },
    }).as("get_case");

    cy.intercept("PATCH", "/api/case/**", {
      statusCode: 200,
      body: { message: "success" },
    }).as("create_case_in_salesforce");

    cy.visit("/");
    cy.findByText("Manage recurring contribution").click();
    cy.wait("@cancelled");

    cy.get('[data-cy="Cancel recurring contribution"]').click();
    cy.get('[data-cy="cancellation_reasons"] label').first().click();
    cy.get('[data-cy="cta_container"] a').first().click();

    cy.wait("@get_case");

    cy.findByText("Confirm cancellation").click();

    cy.wait("@create_case_in_salesforce");
    cy.wait("@cancel_contribution");
    cy.wait("@new_product_detail");

    cy.get('[data-cy="cancellation_message"]');

    cy.get("@create_case_in_salesforce.all").should("have.length", 1);
    cy.get("@cancel_contribution.all").should("have.length", 1);
  });

  it("Completes adding holiday stop", function () {
    cy.intercept("GET", "/api/me/mma", {
      statusCode: 200,
      body: gwProductDetail,
    }).as("mma");

    cy.intercept("GET", "/api/me/mma?productType=Weekly", {
      statusCode: 200,
      body: gwProductDetail,
    }).as("product_detail");

    cy.intercept("GET", "/api/holidays/*/*", {
      statusCode: 200,
      body: {
        nextInvoiceDateAfterToday: "2022-02-24",
        potentials: [
          {
            publicationDate: "2022-03-25",
            credit: -8.13,
            invoiceDate: "2022-04-24",
          },
        ],
      },
    }).as("fetch_holidays");

    cy.intercept("GET", "/api/holidays/*", {
      statusCode: 200,
      body: {
        existing: [
          {
            id: "a2k9E000005NnbrQAC",
            startDate: "2022-03-11",
            endDate: "2022-03-12",
            subscriptionName: "A-S00293857",
            publicationsImpacted: [
              {
                publicationDate: "2022-03-11",
                estimatedPrice: -8.13,
                invoiceDate: "2022-03-24",
                isActioned: false,
              },
            ],
            mutabilityFlags: {
              isFullyMutable: true,
              isEndDateEditable: true,
            },
          },
        ],
        issueSpecifics: [
          {
            firstAvailableDate: "2022-02-05",
            issueDayOfWeek: 5,
          },
        ],
        annualIssueLimit: 6,
        firstAvailableDate: "2022-02-05",
      },
    }).as("fetch_holidays");

    cy.intercept("POST", "/api/holidays", {
      statusCode: 200,
      body: {
        message: "success",
      },
    }).as("create_holiday_stop");

    cy.visit("/suspend/guardianweekly");
    cy.wait("@fetch_holidays");
    cy.wait("@product_detail");
    cy.get('[data-cy="create_suspension_cta"] button').click();

    cy.findByText("Choose the dates you will be away");
    cy.get('[data-cy="date_picker"] div').eq(8).click();
    cy.get('[data-cy="date_picker"] div').eq(10).click();
    cy.findByText("Review details").click();

    cy.findByText("Confirm").click();
    cy.findByText("Review details before confirming");

    cy.wait("@create_holiday_stop");
    cy.findByText("Your schedule has been set");
  });

  it("Complete direct debit payment update", function () {
    cy.intercept("GET", "/api/me/mma?productType=*", {
      statusCode: 200,
      body: digitalDD,
    }).as("product_detail");

    cy.intercept("GET", "/api/me/mma/**", {
      statusCode: 200,
      body: digitalDD,
    }).as("refetch_subscription");

    cy.intercept("POST", "/api/payment/dd/**", {
      statusCode: 200,
      body: ddPaymentMethod,
    }).as("scala_backend");

    cy.visit("/payment/digital");

    cy.wait("@product_detail");
    cy.findByText("Your current payment method");

    cy.get(`[data-cy="Direct debit"] input`).click();

    cy.findByText("Update your payment method");

    cy.get('input[name="Account holder name"]').type("JON R HEE");
    cy.get('input[name="Sort Code"]').type("200000");
    cy.get('input[name="Account Number"]').type("55779911");

    cy.get('input[name="accountHolderConfirmation"').click();
    cy.findByText("Update payment method").click();

    cy.wait("@scala_backend");
    cy.wait("@refetch_subscription");

    cy.findByText("Your payment details were updated successfully");

    cy.get("@scala_backend.all").should("have.length", 1);
  });

  it("Shows correct error messages for direct debit form", function () {
    cy.intercept("GET", "/api/me/mma*").as("mma");
    cy.visit("/payment/digital");

    cy.wait("@mma");
    cy.findByText("Your current payment method");

    cy.get(`[data-cy="Direct debit"] input`).click();

    cy.findByText("Update your payment method");

    cy.findByText("Update payment method").click();
    cy.findByText("Please enter a valid account name");

    cy.get('input[name="Account holder name"]').type("JON R HEE");
    cy.findByText("Update payment method").click();
    cy.findByText("You need to confirm that you are the account holder");

    cy.get('input[name="Sort Code"]').type("SORTCODE");
    cy.get('input[name="Account Number"]').type("142313421234");

    cy.findByText("Update payment method").click();
    cy.findByText(
      "Your bank details are invalid. Please check them and try again."
    );
  });

  it("Complete card payment update", function () {
    cy.intercept("POST", "/api/payment/card", {
      statusCode: 200,
      body: stripeSetupIntent,
    }).as("createSetupIntent");

    cy.intercept("POST", "/api/payment/card/**", {
      statusCode: 200,
      body: executePaymentUpdateResponse,
    }).as("scala_backend");

    cy.intercept("POST", "https://api.stripe.com/v1/setup_intents/**", {
      statusCode: 200,
      body: confirmCardSetupResponse,
    }).as("confirmCardSetup");

    cy.intercept("POST", "https://api.stripe.com/v1/payment_methods", {
      statusCode: 200,
      body: stripePaymentMethod,
    });

    cy.visit("/payment/subscriptioncard");

    cy.wait("@mma");

    cy.fillElementsInput("cardNumber", "4242424242424242");
    cy.fillElementsInput("cardExpiry", "1025");
    cy.fillElementsInput("cardCvc", "123");

    cy.get("#recaptcha *> iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find(".recaptcha-checkbox-border")
        .should("be.visible")
        .click()
        .then(() => {
          // wait for recaptcha to resolve
          cy.wait(1000);

          cy.findByText("Update payment method").click();
        });
    });

    cy.wait("@scala_backend");
    cy.wait("@mma");

    cy.findByText("Your payment details were updated successfully");

    cy.get("@createSetupIntent.all").should("have.length", 1);
    cy.get("@confirmCardSetup.all").should("have.length", 1);
    cy.get("@scala_backend.all").should("have.length", 1);
  });

  it("Show recaptcha error", function () {
    cy.visit("/payment/subscriptioncard");

    cy.findByText("Your current payment method");
    cy.findByText("Update your payment method");

    // wait for stripe to load
    cy.wait(5000);

    cy.fillElementsInput("cardNumber", "4242424242424242");
    cy.fillElementsInput("cardExpiry", "1025");
    cy.fillElementsInput("cardCvc", "123");

    cy.findByText("Update payment method").click();

    cy.findByText("Recaptcha has not been completed.");
  });
});
