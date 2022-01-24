import { setLocalBaseUrl } from "../../lib/setLocalBaseUrl";
import { StripeSetupIntent } from "../../../shared/stripeSetupIntent";
// import { PaymentMethod } from "../../../client/components/payment/update/updatePaymentFlow";

// 'No IAB consent management framework' exception is thrown from here: https://github.com/guardian/consent-management-platform/blob/405a4fee4c54c2bdabea3df0fd1bf187ae6d7927/src/onConsentChange.ts#L34
Cypress.on("uncaught:exception", (err: any, runnable: any) => {
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

const stripeSetupIntent: StripeSetupIntent = {
  id: "seti_0KLFtUItVxyc3M6nBXnYb2jO",
  client_secret:
    "seti_0KLFtUItVxyc3Q6nBXnYb2jO_secret_L1IUioSNMNThetlMQnVtbCJu0Gj2cq1M",
};

const confirmCardSetupResponse = {
  setupIntent: {
    status: "succeeded",
  },
};

const executePaymentUpdateResponse = {
  type: "visa",
  last4: "4242",
  expiryMonth: 4,
  expiryYear: 2024,
};

describe("E2E Page rendering", function () {
  beforeEach(function () {
    cy.session("auth", () => {
      setLocalBaseUrl();

      cy.visit(
        "https://profile.thegulocal.com/signin?returnUrl=https%3A%2F%2Fmanage.thegulocal.com%2F"
      );

      cy.get('input[name="email"]').type("jon.flynn+code@guardian.co.uk");
      cy.get('input[name="password"]').type("");

      cy.mockNext(200, {
        cookies: {
          values: [{ key: "key", value: "value" }],
          expiresAt: "tomorrow",
        },
      });
      cy.get("[data-cy=sign-in-button]").click();

      cy.getIframeBody(iframeMessage)
        .find(`button[title="${acceptCookiesButtonText}"]`, { timeout: 10000 })
        .click();

      cy.url().should("contain", "manage.thegulocal.com");
      cy.intercept("GET", "/api/me/mma?productType=*").as("mma");
    });
  });

  it("Show card number error", function () {
    cy.intercept("POST", "/api/payment/card", {
      statusCode: 200,
      body: stripeSetupIntent,
    });

    // think this is createPaymentMethod
    cy.intercept("POST", "https://api.stripe.com/v1/payment_methods", {
      statusCode: 200,
      body: stripePaymentMethod,
    });

    // i think this is confirmCardSetup
    cy.intercept("POST", "https://api.stripe.com/v1/setup_intents/*", {
      statusCode: 200,
      body: confirmCardSetupResponse,
    });

    cy.intercept("POST", "/api/payment/card/S-*", {
      statusCode: 200,
      body: executePaymentUpdateResponse,
    });

    cy.visit("/payment/subscriptioncard");

    // wait for stripe to load
    cy.wait(12000);

    cy.fillElementsInput("cardNumber", "4242424242424242");
    cy.fillElementsInput("cardExpiry", "1025");
    cy.fillElementsInput("cardCvc", "123");

    cy.get("#recaptcha *> iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find(".recaptcha-checkbox-border")
        .should("be.visible")
        .click();
    });

    cy.wait(3000);
    cy.findByText("Update payment method").click();

    cy.wait(5000);

    cy.findByText("Your payment details were updated successfully");
  });

  it("Shows direct debit input", function () {
    cy.visit("/payment/digital");

    cy.intercept("GET", "/api/me/mma?productType=*").as("mma");
    cy.wait("@mma", { timeout: 10000 });
    cy.findByText("Your current payment method");

    // wait for stripe to load -> use cy.intercept on stripe Script
    cy.wait(5000);

    cy.get(`[data-cy="Direct Debit"] input`).click();

    cy.findByText("Update your payment method");

    cy.findByText("Update payment method").click();

    cy.findByText("You need to confirm that you are the account holder");
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
    cy.wait(10000);
  });
});
