import { conf } from "../../../server/config";

const url = (subdomain: string, domain: string, path?: string) =>
  `https://${subdomain}.${domain}${path ? path : ""}`;

const DOMAIN =
  typeof window !== "undefined" && window.guardian
    ? window.guardian.domain
    : conf.DOMAIN;

const IDAPI_URL =
  DOMAIN === "thegulocal.com" ? "/idapicodeproxy" : url("idapi", DOMAIN);

const getIdentityLocations = (domain: string) => ({
  CHANGE_EMAIL: url("profile", domain, "/account/edit"),
  MANAGE_JOB_ALERTS: url("jobs", domain, "/your-jobs/?ActiveSection=JbeList"),
  VERIFY_EMAIL: url("profile", domain, "/verify-email"),
  IDAPI: IDAPI_URL
});

export const IdentityLocations = getIdentityLocations(DOMAIN);
