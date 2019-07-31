import { conf } from "../../../server/config";

const url = (subdomain: string, domain: string, path?: string) =>
  `https://${subdomain}.${domain}${path ? path : ""}`;

const getIDAPIUrl = () => {
  let domain: string;
  if (typeof window !== "undefined" && window.guardian) {
    domain = window.guardian.domain;
  } else {
    domain = conf.DOMAIN;
  }
  if (domain === "thegulocal.com") {
    return "/idapicodeproxy";
  } else {
    return url("idapi", domain);
  }
};

const getIdentityLocations = (domain: string) => ({
  CHANGE_EMAIL: url("profile", domain, "/account/edit"),
  MANAGE_JOB_ALERTS: url("jobs", domain, "/your-jobs/?ActiveSection=JbeList"),
  VERIFY_EMAIL: url("profile", domain, "/verify-email"),
  IDAPI: getIDAPIUrl()
});

export const IdentityLocations = getIdentityLocations(conf.DOMAIN);
