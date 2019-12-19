import express from "express";
import fetch from "node-fetch";
import url from "url";
import { MDA_TEST_USER_HEADER } from "../shared/productResponse";
import { apiConfigPromise } from "./apiConfig";
import { log } from "./log";

///{STAGE}/delivery-records/{SUBSCRIPTION_NAME}?startDate={yyyy-MM-dd}&endDate={yyyy-MM-dd}

export const deliveryRecordsApiHandler = (
  req: express.Request,
  res: express.Response
) =>
  apiConfigPromise("delivery-records-api")
    .then(drConfig => {
      if (drConfig && res.locals.identity && res.locals.identity.userId) {
        const testUserHeader = req.header(MDA_TEST_USER_HEADER);
        const drEnvConfig =
          testUserHeader === "true" ? drConfig.testMode : drConfig.normalMode;
        fetch(
          url.format({
            protocol: "https",
            host: drEnvConfig.host,
            pathname: `/delivery-records/${req.params.subscriptionName}`,
            query: req.query
          }),
          {
            method: req.method,
            headers: {
              "x-api-key": drEnvConfig.apiKey,
              "x-identity-id": res.locals.identity.userId
            },
            body: req.method !== "GET" ? req.body : undefined
          }
        )
          .then(intermediateResponse => {
            res.status(intermediateResponse.status);
            return intermediateResponse.json();
          })
          .then(responseBodyJSON => res.json(responseBodyJSON))
          .catch(e => {
            log.error(e);
            res.status(500).send();
          });
      } else {
        throw new Error("could not get delivery-records-api config");
      }
    })
    .catch(e => {
      log.error(e);
      res.status(500).send();
    });
