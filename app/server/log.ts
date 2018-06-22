import bunyan from "bunyan";
import { conf, Environments } from "./config";

const location =
  conf.ENVIRONMENT === Environments.PRODUCTION ? "/var/log/" : "./";

export const log = bunyan.createLogger({
  name: "account-frontend",
  streams: [
    {
      stream: process.stderr,
      level: "info"
    },
    {
      path: `${location}account-frontend.log`,
      level: "info",
      type: "rotating-file",
      period: "1d",
      count: 8 // auto redeploy should happen more frequently than this
    }
  ]
});
export const audit = bunyan.createLogger({
  name: "account-frontend-audit-log",
  streams: [
    {
      stream: process.stderr,
      level: "info"
    },
    {
      path: `${location}account-frontend-audit.log`,
      level: "info",
      type: "rotating-file",
      period: "1d",
      count: 8 // auto redeploy should happen more frequently than this
    }
  ]
});
