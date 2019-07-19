import { conf } from "../../../server/config";

const url = (subdomain: string, domain: string, path: string) =>
  `${subdomain}.${domain}/${path}`;

const getIdentityLocations = (domain: string) => ({
  CHANGE_EMAIL: url("profile", domain, "account/edit"),
  MANAGE_JOB_ALERTS: url("jobs", domain, "/your-jobs/?ActiveSection=JbeList")
});

export const IdentityLocations = getIdentityLocations(conf.DOMAIN);
