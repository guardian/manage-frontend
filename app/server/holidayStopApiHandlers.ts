import express from "express";
import fetch from "node-fetch";
import url from "url";
import { MDA_TEST_USER_HEADER } from "../shared/productResponse";
import { HolidayStopsApiProductNamePrefix } from "../shared/productTypes";
import { holidayStopApiConfigPromise } from "./holidayStopApiConfig";
import { log } from "./log";

export const getHolidayStopApiHandler = (
  holidayStopsApiProductNamePrefix?: HolidayStopsApiProductNamePrefix
) => (req: express.Request, res: express.Response) =>
  holidayStopApiConfigPromise
    .then(hsrConfig => {
      if (hsrConfig && res.locals.identity && res.locals.identity.userId) {
        const testUserHeader = req.header(MDA_TEST_USER_HEADER);
        const hsrEnvConfig =
          testUserHeader === "true" ? hsrConfig.testMode : hsrConfig.normalMode;
        fetch(
          url.format({
            protocol: "https",
            host: hsrEnvConfig.host,
            pathname:
              (req.params && req.params.subscriptionName
                ? req.params.subscriptionName === "potential"
                  ? "/potential"
                  : `/hsr/${req.params.subscriptionName}`
                : "/hsr") +
              (req.params && req.params.subscriptionName && req.params.sfId
                ? `/${req.params.sfId}`
                : ""),
            query: req.query
          }),
          {
            method: req.method,
            headers: {
              "x-api-key": hsrEnvConfig.apiKey,
              "x-identity-id": res.locals.identity.userId,
              ...(holidayStopsApiProductNamePrefix
                ? { "x-product-name-prefix": holidayStopsApiProductNamePrefix }
                : {})
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
        throw new Error("could not get holiday-stop-api config");
      }
    })
    .catch(e => {
      log.error(e);
      res.status(500).send();
    });
