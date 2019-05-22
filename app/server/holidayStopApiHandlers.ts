import express from "express";
import fetch from "node-fetch";
import url from "url";
import { HolidayStopsApiProductNamePrefix } from "../shared/productTypes";
import { holidayStopApiConfigPromise } from "./holidayStopApiConfig";
import { log } from "./log";

export const getHolidayStopApiHandler = (
  holidayStopsApiProductNamePrefix?: HolidayStopsApiProductNamePrefix
) => (
  { params, method, body, query }: express.Request,
  res: express.Response
) =>
  holidayStopApiConfigPromise
    .then(hsrConfig => {
      if (hsrConfig && res.locals.identity && res.locals.identity.userId) {
        fetch(
          url.format({
            protocol: "https",
            host: hsrConfig.host,
            pathname:
              (params && params.subscriptionName
                ? params.subscriptionName === "potential"
                  ? "/potential"
                  : `/hsr/${params.subscriptionName}`
                : "/hsr") +
              (params && params.subscriptionName && params.sfId
                ? `/${params.sfId}`
                : ""),
            query
          }),
          {
            method,
            headers: {
              "x-api-key": hsrConfig.apiKey,
              "x-identity-id": res.locals.identity.userId,
              ...(holidayStopsApiProductNamePrefix
                ? { "x-product-name-prefix": holidayStopsApiProductNamePrefix }
                : {})
            },
            body: method !== "GET" ? body : undefined
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
