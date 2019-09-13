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

      fetch(
        "https://api.stripe.com/v1/setup_intents", // using URL rather than stripe library due to missing type defs
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "usage=off_session"
        }
      )
        .then(stripeResponse => {
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
        .then((setupIntent: StripeSetupIntent) =>
          response.json({
            id: setupIntent.id,
            client_secret: setupIntent.client_secret
          })
        )
        .catch(handleTerminalError(response));
    })
    .catch(handleTerminalError(response));

const handleTerminalError = (response: express.Response) => (error: Error) => {
  Raven.captureException(error);
  log.error(`Failed to create SetupIntent`, error);
  response.status(500).send();
};
