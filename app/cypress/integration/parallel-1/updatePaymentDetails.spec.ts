import { setLocalBaseUrl } from "../../lib/setLocalBaseUrl";
import * as fixtures from "../../fixtures/fixtures";
// import { PaymentMethod } from "../../../client/components/payment/update/updatePaymentFlow";

// 'No IAB consent management framework' exception is thrown from here: https://github.com/guardian/consent-management-platform/blob/405a4fee4c54c2bdabea3df0fd1bf187ae6d7927/src/onConsentChange.ts#L34
Cypress.on("uncaught:exception", () => {
  return false;
});

const iframeMessage = `[id^="sp_message_iframe_"]`;
const acceptCookiesButtonText = "Yes, I’m happy";

describe("E2E Page rendering", function () {
  beforeEach(function () {
    cy.session("auth", () => {
      setLocalBaseUrl();

      cy.intercept("GET", "/api/me/mma", {
        statusCode: 200,
        body: fixtures.mmaResponse,
      }).as("mma");

      cy.intercept("GET", "/api/cancelled/", {
        statusCode: 200,
        body: fixtures.cancelledResponse,
      }).as("cancelled");

      cy.wait(1000);
      cy.visit("/");

      cy.wait("@mma");
      cy.wait("@cancelled");

      // accept cookies
      cy.getIframeBody(iframeMessage)
        .find(`button[title="${acceptCookiesButtonText}"]`, { timeout: 10000 })
        .click();

      // wait for cookies to be set
      cy.wait(1000);
    });
  });

  it("Complete card payment update", function () {
    cy.intercept("GET", "/api/me/mma?productType=*", {
      statusCode: 200,
      body: fixtures.gwProductDetail,
    }).as("product_detail");

    cy.intercept("GET", "/api/me/mma/**", {
      statusCode: 200,
      body: fixtures.gwProductDetail,
    }).as("refetch_subscription");

    cy.intercept("POST", "/api/payment/card", {
      statusCode: 200,
      body: fixtures.stripeSetupIntent,
    }).as("createSetupIntent");

    cy.intercept("POST", "/api/payment/card/**", {
      statusCode: 200,
      body: fixtures.executePaymentUpdateResponse,
    }).as("scala_backend");

    cy.intercept("POST", "https://api.stripe.com/v1/setup_intents/**", {
      statusCode: 200,
      body: fixtures.confirmCardSetupResponse,
    }).as("confirmCardSetup");

    cy.intercept("POST", "https://api.stripe.com/v1/payment_methods", {
      statusCode: 200,
      body: fixtures.stripePaymentMethod,
    });

    cy.visit("/payment/subscriptioncard");

    cy.wait("@product_detail");

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
    cy.wait("@refetch_subscription");

    cy.findByText("Your payment details were updated successfully");

    cy.get("@createSetupIntent.all").should("have.length", 1);
    cy.get("@confirmCardSetup.all").should("have.length", 1);
    cy.get("@scala_backend.all").should("have.length", 1);
  });

  it("Completes adding holiday stop", function () {
    cy.intercept("GET", "/api/me/mma", {
      statusCode: 200,
      body: fixtures.gwProductDetail,
    }).as("mma");

    cy.intercept("GET", "/api/me/mma?productType=Weekly", {
      statusCode: 200,
      body: fixtures.gwProductDetail,
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

    cy.wait("@create_holiday_stop");
    cy.findByText("Your schedule has been set");
  });

  it("Shows correct error messages for direct debit form", function () {
    cy.intercept("GET", "/api/me/mma?productType=*", {
      statusCode: 200,
      body: fixtures.digitalDD,
    }).as("product_detail");

    cy.visit("/payment/digital");

    cy.wait("@product_detail");
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
    cy.findByText("You need to confirm that you are the account holder");

    cy.get('input[name="accountHolderConfirmation"').click();
    cy.findByText("Update payment method").click();
    cy.findByText(
      "Your bank details are invalid. Please check them and try again."
    );
  });

  it("Complete direct debit payment update", function () {
    cy.intercept("GET", "/api/me/mma?productType=*", {
      statusCode: 200,
      body: fixtures.digitalDD,
    }).as("product_detail");

    cy.intercept("GET", "/api/me/mma/**", {
      statusCode: 200,
      body: fixtures.digitalDD,
    }).as("refetch_subscription");

    cy.intercept("POST", "/api/payment/dd/**", {
      statusCode: 200,
      body: fixtures.ddPaymentMethod,
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

  it("Show recaptcha error", function () {
    cy.intercept("GET", "/api/me/mma?productType=*", {
      statusCode: 200,
      body: fixtures.gwProductDetail,
    }).as("product_detail");

    cy.visit("/payment/subscriptioncard");

    cy.wait("@product_detail");

    cy.findByText("Your current payment method");
    cy.findByText("Update your payment method");

    cy.fillElementsInput("cardNumber", "4242424242424242");
    cy.fillElementsInput("cardExpiry", "1025");
    cy.fillElementsInput("cardCvc", "123");

    cy.findByText("Update payment method").click();

    cy.findByText("Recaptcha has not been completed.");
  });
});
