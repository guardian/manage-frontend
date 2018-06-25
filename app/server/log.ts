import winston from "winston";
import { conf, Environments } from "./config";

const location =
  conf.ENVIRONMENT === Environments.PRODUCTION ? "/var/log/" : "./";

export const log = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `${location}/account-frontend.log`
    }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

export const audit = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `${location}/account-frontend-audit.log`
    }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});
