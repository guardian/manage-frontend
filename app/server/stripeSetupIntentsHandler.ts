import express from "express";
import fetch from "node-fetch";
import Raven from "raven";
import {
  STRIPE_PUBLIC_KEY_HEADER,
  StripeSetupIntent
} from "../shared/stripeSetupIntent";
import { log } from "./log";
import { stripeSetupIntentConfigPromise } from "./stripeSetupIntentConfig";

export const stripeSetupIntentHandler = (
  request: express.Request,
  response: express.Response
) =>
  stripeSetupIntentConfigPromise
    .then(stripePublicToSecretKeyMapping => {
      if (!stripePublicToSecretKeyMapping) {
        throw new Error("missing Stripe SetupIntent config");
      }
      const stripePublicKey = request.header(STRIPE_PUBLIC_KEY_HEADER);
      if (!stripePublicKey) {
        response
          .status(400)
          .send(`missing header '${STRIPE_PUBLIC_KEY_HEADER}'`);
        return;
      }
      const stripeSecretKey = stripePublicToSecretKeyMapping[stripePublicKey];
      if (!stripeSecretKey) {
        throw new Error(
          `no secret key mapping for Stripe public key '${stripePublicKey}'`
        );
      }

      const httpMethod = request.method;
      const outgoingURL = "https://api.stripe.com/v1/setup_intents";
      const requestBody = "usage=off_session";

      // tslint:disable-next-line:no-object-mutation
      response.locals.loggingDetail = {
        loggingCode: "STRIPE_SETUP_INTENT",
        stripePublicKey, // this will indicate 'test mode' vs 'live'
        httpMethod,
        identityID: response.locals.identity && response.locals.identity.userId,
        incomingURL: request.originalUrl,
        requestBody,
        outgoingURL
      };

      fetch(
        outgoingURL, // using URL rather than stripe library due to missing type defs
        {
          method: httpMethod,
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: requestBody
        }
      )
        .then(stripeResponse => {
          // tslint:disable-next-line:no-object-mutation
          response.locals.loggingDetail.status = stripeResponse.status;
          // tslint:disable-next-line:no-object-mutation
          response.locals.loggingDetail.isOK = stripeResponse.ok;

          if (stripeResponse.ok) {
            return stripeResponse.json();
          } else {
            throw new Error(
              `Failed to load SetupIntent : ${stripeResponse.status} ${
                stripeResponse.statusText
              } : ${stripeResponse.text()}`
            );
          }
        })
        .then((setupIntent: StripeSetupIntent) => {
          const suitableLog = response.locals.loggingDetail.isOK
            ? log.info
            : log.warning;
          suitableLog("fetching", response.locals.loggingDetail);

          response.json({
            id: setupIntent.id,
            client_secret: setupIntent.client_secret
          });
        })
        .catch(handleTerminalError(response));
    })
    .catch(handleTerminalError(response));

const handleTerminalError = (response: express.Response) => (error: Error) => {
  Raven.captureException(error);
  log.error("Failed to create SetupIntent", {
    ...response.locals.loggingDetail,
    exception: error || "undefined"
  });
  response.status(500).send();
};
