// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import testing-library like API
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("getIframeBody", (selector = "") => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return (
    cy
      .get(`iframe${selector}`)
      .its("0.contentDocument.body")
      .should("not.be.empty")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then(cy.wrap)
  );
});

Cypress.Commands.add("iframeLoaded", { prevSubject: "element" }, ($iframe) => {
  const contentWindow = $iframe.prop("contentWindow");
  return new Promise((resolve) => {
    if (contentWindow && contentWindow.document.readyState === "complete") {
      resolve(contentWindow);
    } else {
      $iframe.on("load", () => {
        resolve(contentWindow);
      });
    }
  });
});

Cypress.Commands.add(
  "getInDocument",
  { prevSubject: "document" },
  (document, selector) => Cypress.$(selector, document)
);

Cypress.Commands.add("getWithinIframe", (targetElement) =>
  cy
    .get("iframe", { timeout: 5000 })
    .iframeLoaded()
    .its("document")
    .getInDocument(targetElement)
);

const mockNext = (status, body = {}) => {
  const getMockOptions = (status, body) => ({
    headers: {
      "Content-Type": "application/json",
      "x-status": status,
    },
    method: "POST",
    body: JSON.stringify(body),
    url: "http://localhost:9233",
  });

  cy.request(getMockOptions(status, body));
};

Cypress.Commands.add("mockNext", mockNext);
