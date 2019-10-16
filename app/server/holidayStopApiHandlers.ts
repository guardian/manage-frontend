import express from "express";
import fetch from "node-fetch";
import url from "url";
import { MDA_TEST_USER_HEADER } from "../shared/productResponse";
import { holidayStopApiConfigPromise } from "./holidayStopApiConfig";
import { log } from "./log";

export const holidayStopApiHandler = (
  req: express.Request,
  res: express.Response
) =>
  holidayStopApiConfigPromise
    .then(hsrConfig => {
      if (hsrConfig && res.locals.identity && res.locals.identity.userId) {
        const testUserHeader = req.header(MDA_TEST_USER_HEADER);
        const hsrEnvConfig =
          testUserHeader === "true" ? hsrConfig.testMode : hsrConfig.normalMode;
        const isPotentialCall = req.params.sfId === "potential";
        const basePathPart = isPotentialCall ? "potential" : "hsr";
        const maybeActualExistingSfId = isPotentialCall
          ? undefined
          : req.params.sfId;
        fetch(
          url.format({
            protocol: "https",
            host: hsrEnvConfig.host,
            pathname:
              req.params && req.params.subscriptionName
                ? `/${basePathPart}/${
                    req.params.subscriptionName
                  }/${maybeActualExistingSfId || ""}`
                : "/hsr",
            query: req.query
          }),
          {
            method: req.method,
            headers: {
              "x-api-key": hsrEnvConfig.apiKey,
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
        throw new Error("could not get holiday-stop-api config");
      }
    })
    .catch(e => {
      log.error(e);
      res.status(500).send();
    });
